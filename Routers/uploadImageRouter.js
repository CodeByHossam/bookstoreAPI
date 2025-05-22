const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/image"), // Absolute path to image folder
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Initialize Multer
const upload = multer({ storage });

// Upload Route (Single File)
router.post("/", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

module.exports = router;
