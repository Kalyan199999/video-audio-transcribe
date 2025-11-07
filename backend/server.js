const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const connect_db = require('./connect_db.js');

const video_link_route = require('./routes/video/video-link-route.js')
const video_file_route = require('./routes/video/video-file-route.js')

const audio_file_route = require('./routes/audio/audio-file-route.js')
const audio_link_route = require('./routes/audio/audio-link-route.js')

const user_route = require('./routes/user/user-route.js')

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

port = process.env.PORT || 5000;

// handles videos 
app.use( '/api/video/file' , video_file_route );
app.use('/api/video/link',video_link_route);

// handles audios
app.use('/api/audio/file', audio_file_route );
app.use( '/api/audio/link' , audio_link_route );

// hendles users
app.use('/api/user' , user_route );

app.listen( port , ()=>{
    try 
    {
        console.log(`Server running on the port ${port}`);
        connect_db()
        
    } 
    catch (error) 
    {
        console.log(`Server is not running! ${error}`);
    }
})