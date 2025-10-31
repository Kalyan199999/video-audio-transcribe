const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define base upload directory
const baseUploadPath = path.join(__dirname, "../uploads");

// Ensure subdirectories exist
const subFolders = [ "videos", "audios","others"];

subFolders.forEach((folder) => 
{
  const fullPath = path.join(baseUploadPath, folder);
  if (!fs.existsSync(fullPath)) 
  {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage(
{
  destination: function (req, file, cb) {
    let folder = "others";

    // Determine folder based on file mimetype
    if (file.mimetype.startsWith("video/")) 
    {
      folder = "videos";
    } 
    else if (file.mimetype.startsWith("audio/")) 
    {
      folder = "audios";
    }

    const uploadPath = path.join(baseUploadPath, folder);
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Initialize upload middleware
const upload = multer({ storage });

module.exports = upload;