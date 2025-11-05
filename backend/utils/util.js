const path = require("path");
const fs = require('fs')

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

const getFileToGenerativePart = (filePath) => {

  // Read the file
  const fileBytes = Buffer.from( fs.readFileSync(filePath) ).toString("base64");

  // Detect file MIME type (adjust if needed)
  let mimeType = getMediaMimeType(filePath)

  return (
    {
      inlineData: 
      {
          mimeType,
          data: fileBytes,
        }
    }
  )

}

// console.log( getFileToGenerativePart("C:\\Users\\hp\\OneDrive\\Desktop\\transcribers\\backend\\uploads\\audios\\audio-1761897463585-427041730.mp3") );


const validateEmail = (email) => 
{
    
     if (!email) 
    {
      return "Email is required";
    } 
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.trim())) 
    {
      
      return "Enter a valid email address";
    }
    return null;
}

const validatePassword = (password) => 
{
    if (!password) {
      return "Password is required";
    }

  // Check length
   if (password.length < 8) 
   {
     return "Password must be at least 8 characters long";
   }

  // Regex for lowercase, uppercase, number, and special character
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

    if (!regex.test(password)) 
    {
        return "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }

  return null;
};



module.exports = {
  getMediaMimeType,
  getFileToGenerativePart,
  validateEmail,
  validatePassword
}