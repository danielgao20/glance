// backend/app.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const screenshotRoutes = require("./routes/screenshots");
const profileRoutes = require("./routes/profile"); // Add profile routes
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // Add profile routes
app.use(
  "/api/screenshots",
  (req, res, next) => {
    req.io = io;
    next();
  },
  screenshotRoutes
);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});