const Audio = require('../../model/audio_model')
const { genAIAudioLinkTranscribe } = require('../../gemini-api-models/gen-ai-audio-transcribe')

const get_link_audio = async (req,res) => {

    try 
    {
        const audio = await Audio.find().sort({createdAt:-1})

        return res.status(200).json({
            ok:true,
            data:audio,
            message:"Audios fetched successfully"
        })
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok:false,
            data:null,
            message:"Error while fetching audio"
        })
    }
}

const post_link_audio = async (req,res) => {
    
    try 
    {
       const {url,id} = req.body;

        const audio = await genAIAudioLinkTranscribe(url)

        if( !audio.ok  )
        {
            return res.status(500).json({
                ok:false,
                data:null,
                message:"Error while transcribing audio!",
                audio
            })
        }

        const data = new Audio({
            url:url,
            text:audio.data,
            user:id
        })

        await data.save()

        return res.status(200).json({
            ok:true,
            data:data,
            message:"Audio added successfully"
        })
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok:false,
            data:null,
            message:"Error while adding audio!"
        })
    }
}

module.exports = {
    get_link_audio,
    post_link_audio
}