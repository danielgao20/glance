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
const auth = require('../middleware/auth');
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

// Add to your existing screenshots.js router
router.post("/generate-summary", async (req, res) => {
  try {
    const { progressUpdates } = req.body;

    const prompt = `
    You are writing a Slack update to summarize a team member's progress based on raw input logs.

    Instructions:
    - Read the user’s progress updates.
    - Summarize their work using clear, concise first-person language ("I" statements).
    - The output should be 3–5 sentences, suitable to post as a quick daily update in a team Slack channel.
    - Focus on what was done, what’s in progress, and any key outcomes or blockers (if mentioned).
    - Group related tasks into one sentence where possible for brevity and clarity.

    <SAMPLE INPUT>
    David: working on Stripe dashboard and creating a new item
    David: integrating the Stripe payment wall into the application on VSCode
    David: paying for an item in a Stripe payment user interface

    <SAMPLE OUTPUT>
    Today I worked on integrating Stripe payments into the app. I created a new dashboard item, set up the payment wall, and tested the user interface for purchasing items. Everything is wired up and ready for backend validation.
    </SAMPLE OUTPUT>
    `;

    const input = progressUpdates
      .map((update) => `${update.userName}: ${update.progressText}`)
      .join("\n");
    console.log(input);
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: prompt },
          {
            role: "user",
            content: `Progress of the team: ${input}`,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiAPIKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices[0].message.content.trim();
    console.log(summary);
    res.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// POST route for saving screenshots
router.post("/", auth, upload.single("screenshot"), async (req, res) => {
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
          username: req.user.username,
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
router.get("/", auth, async (req, res) => {
  try {
    const conn = mongoose.connection;
    const gfs = new GridFSBucket(conn.db, { bucketName: "screenshots" });

    const files = await gfs.find({ 'metadata.username': req.user.username }).toArray();
    res.status(200).json(
      files.map((file) => ({
        username: file.metadata?.username || "Unknown",
        carouselText: file.metadata?.carouselText || "No description available",
        progressText: file.metadata?.progressText || "No description available",
        fileId: file._id,
        // Include the timestamp (uploadDate from GridFS or use metadata.created_at if available)
        timestamp: file.metadata?.created_at || file.uploadDate.toISOString(),
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

// DELETE route for deleting a screenshot by fileId
router.delete('/:id', auth, async (req, res) => {
  try {
    const fileId = req.params.id;
    const conn = mongoose.connection;
    const gfs = new GridFSBucket(conn.db, { bucketName: 'screenshots' });
    const objectId = new mongoose.Types.ObjectId(fileId);

    // Delete file from GridFS
    await gfs.delete(objectId);

    // Remove associated Screenshot document if it exists
    try {
      const Screenshot = require('../models/Screenshot');
      await Screenshot.deleteOne({ fileId: objectId });
    } catch (err) {
      // If Screenshot model or document doesn't exist, ignore
    }

    res.status(200).json({ message: 'Screenshot deleted successfully' });
  } catch (error) {
    console.error('Error deleting screenshot:', error.message);
    res.status(500).json({ error: 'Failed to delete screenshot' });
  }
});

module.exports = router;
