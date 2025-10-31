const path = require("path");

function getMediaMimeType(filePath) 
{
  const ext = path.extname(filePath).toLowerCase();

  // Common audio MIME types
  const audioTypes = {
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
    ".m4a": "audio/mp4",
    ".flac": "audio/flac",
    ".aac": "audio/aac",
    ".webm": "audio/webm",
  };

  // Common video MIME types
  const videoTypes = {
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".avi": "video/x-msvideo",
    ".mkv": "video/x-matroska",
    ".webm": "video/webm",
    ".flv": "video/x-flv",
    ".wmv": "video/x-ms-wmv",
  };

  if (audioTypes[ext]) return audioTypes[ext];

  if (videoTypes[ext]) return videoTypes[ext];

  return null; // Return null if the file extension is not recognized
}

module.exports = {
  getMediaMimeType,
}