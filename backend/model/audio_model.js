const mongoose = require("mongoose");
const file = require('./file')

const schema = mongoose.Schema({
    url:
    {
        type:String
    },
    audio:
    {
        type:file
    },
    text:
    {
        type:String,
        required:true
    },
    video_audio:
    {
        type:String,
        default:"audio"
    },
    user: 
    {
        // user reference
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
    }
} , {timestamps:true})

const audio = mongoose.model( "Audio" , schema );

module.exports = audio