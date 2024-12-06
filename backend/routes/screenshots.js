const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { GridFSBucket } = require("mongodb");
const Tesseract = require("tesseract.js"); // OCR library
const axios = require("axios");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const router = express.Router();
const upload = multer({ dest: "temp/" }); // Temporary storage for incoming files

const mongoURI = process.env.MONGO_URI;
const openaiAPIKey = process.env.OPENAI_API_KEY;

if (!mongoURI || !openaiAPIKey) {
  console.error(
    "Environment variables MONGO_URI and OPENAI_API_KEY must be defined."
  );
  process.exit(1);
}

// POST route for saving screenshots
router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const conn = mongoose.connection;
    const gfs = new GridFSBucket(conn.db, { bucketName: "screenshots" });

    const filename = `${Date.now()}-${req.file.originalname}`;
    const filePath = path.resolve(req.file.path);

    // Perform OCR on the saved file
    console.log("Starting OCR process...");
    const ocrResult = await Tesseract.recognize(filePath, "eng");
    const extractedText = ocrResult.data.text;

    console.log("Extracted Text:", extractedText);

    // Generate description using OpenAI API
    const description = await generateDescription(extractedText);

    // description is a json object with carouselText and progressText
    // parse the description and print the carouselText and progressText
    const descriptionObj = JSON.parse(description);
    console.log("Carousel Text:", descriptionObj.carouselText);
    console.log("Progress Text:", descriptionObj.progressText);

    const uploadStream = gfs.openUploadStream(filename, {
      metadata: {
        username: req.body.username,
        carouselText: descriptionObj.carouselText,
        progressText: descriptionObj.progressText,
      }, // Include carousel and progress text in metadata
    });

    // Pipe the file to GridFS
    fs.createReadStream(filePath)
      .pipe(uploadStream)
      .on("error", (err) => {
        console.error("Error during upload to GridFS:", err);
        res.status(500).json({ error: "Failed to upload screenshot" });
      })
      .on("finish", () => {
        console.log("File uploaded successfully:", uploadStream.id);
        fs.unlinkSync(filePath);

        res.status(201).json({
          username: req.body.username,
          fileId: uploadStream.id,
          carouselText: descriptionObj.carouselText,
          progressText: descriptionObj.progressText,
        });
      });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route for fetching screenshots metadata
router.get("/", async (req, res) => {
  try {
    const conn = mongoose.connection;
    const gfs = new GridFSBucket(conn.db, { bucketName: "screenshots" });

    const files = await gfs.find().toArray();
    res.status(200).json(
      files.map((file) => ({
        username: file.metadata?.username || "Unknown",
        carouselText: file.metadata?.carouselText || "No description available",
        progressText: file.metadata?.progressText || "No description available",
        fileId: file._id,
      }))
    );
  } catch (error) {
    console.error("Error fetching screenshots:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET route for fetching image by file ID
router.get("/image/:id", (req, res) => {
  const conn = mongoose.connection;
  const gfs = new GridFSBucket(conn.db, { bucketName: "screenshots" });

  const fileId = new mongoose.Types.ObjectId(req.params.id);

  gfs
    .openDownloadStream(fileId)
    .pipe(res)
    .on("error", (err) => {
      console.error("Error streaming image:", err.message);
      res.status(404).json({ error: "Image not found" });
    });
});

// Function to generate description using OpenAI API
async function generateDescription(extractedText) {
  try {
    const prompt = `
      Provided an extracted texts from a screenshot, analyze it and generate a JSON object with the following format about the content:
      {
        "carouselText": <LESS THAN 5 WORD SUMMARY OF THE SCREENSHOT>,
        "progressText": <MORE THAN 10 WORD, LESS THAN 20 WORD SUMMARY OF THE SCREENSHOT>
      }
      In the content, please try to avoid using the words "screenshot", "image", or quotation marks.
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: extractedText },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiAPIKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const description = response.data.choices[0].message.content.trim();
    console.log("Generated description:", description);
    return description || "Description could not be generated.";
  } catch (error) {
    console.error("Error generating description:", error.message);
    return "Description generation failed.";
  }
}

module.exports = router;
