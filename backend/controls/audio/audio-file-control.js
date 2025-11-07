const Audio = require('../../model/audio_model')
const { genAIAudioTranscribe } = require('../../gemini-api-models/gen-ai-audio-transcribe');

const get_audio = async (req,res)=>{
    try 
    {
        const data = await Audio.find();

        return res.status(200).json(
            {
                data:data,
                message:"Fetched audio data successfully!",
                ok:true
            }
        )
    } 
    catch (error) 
    {
        return res.status(500).json(
            {
                ok:false,
                message:"Error while fetching data!",
                data:error.message
            }
        )
    }
}


const post_audio = async (req,res)=>{
    try 
    {
        console.log("Post method of audio file!");
        
        const file = req.file
        const { id } = req.body;

        // console.log(id);
        // console.log(file);
        
        const response = await genAIAudioTranscribe( file.path );
        
        if( response.ok )
        {
            const data = await Audio({
                audio:file,
                text:response.text,
                user:id
            })

            await data.save();

            return res.status(200).json(
                {
                    ok:true,
                    data:data,
                    message:"Audio added successfully!"
                }
            )
        }
        
        
        return res.status(400).json(
            {
                ok:false,
                message:"Error while transcribing the audio!",
                error:response
            }
        )
    } 
    catch (error) 
    {
        console.log(error);
        
        return res.status(404).json(
        {
            ok:false,
            message:"Error while adding audio!",
            data:error
        }
        )
    }
}

module.exports = { get_audio , post_audio };