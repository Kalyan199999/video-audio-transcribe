# 📄 Audio/Video Transcription Platform (MERN + Gemini API)

A full-stack web application that allows users to upload audio and video files and generate accurate transcripts using the **Gemini Speech-to-Text API**. Built with the **MERN stack**, this platform provides a clean UI, secure backend, real-time status updates, and downloadable transcripts.

---

## 🚀 Features

- 🎤 Upload audio/video files in multiple formats  
- 🤖 Automated transcription using **Gemini API**  
- ⚡ Real-time transcription progress   
- 🔐 JWT-based user authentication  
- ☁️ Secure file uploads (Multer)  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Tailwind CSS  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Multer  
- Gemini API (Speech-to-Text)  
- JWT Authentication  

---

### 1️⃣ Clone the repository

- git clone https://github.com/Kalyan199999/video-audio-transcribe.git
- cd video-audio-transcribe

---

### Environment Variables

#### Create a .env file inside /server:

- PORT=5000
- MONGO_URI=your_mongo_uri
- JWT_SECRET=your_jwt_secret
- GEMINI_API_KEY=your_gemini_api_key

---

## 🎥 Demo Video

<video width="100%" controls>
  <source src="./sample_files/recording.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
