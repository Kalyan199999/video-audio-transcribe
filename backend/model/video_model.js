const mongoose = require('mongoose');
const file = require('./file')

const schema = mongoose.Schema({
    url:
    {
        type:String
    },
    video:
    {
        type:file,
    },
    text:
    {
        type:String,
        required:true
    },
    video_audio:
    {
        type:String,
        default:"video"
    },
    user: 
    {
        // user reference
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true  
    }
    
} , {timestamps: true});

const video = mongoose.model('Video',schema);

module.exports = video;