const Audio = require('../../model/audio_model')

const get_audio = async (req, res) => 
{
    try 
    {
        console.log("Get  all the audio files and links!");

        // user id
        const { id } =  req.body;

        const data = await Audio.find(
            {user:id},
            {_id:1,url:1,audio:1,text:1}
        ).sort({createdAt:-1});

        return res.status(200).json({
            ok:true,
            data:data,
            message:"Fetched Videos successfully!"
        });
        
    } 
    catch (error) 
    {
        return res.status(404).json({
            ok:false,
            error:error,
            message:"Error in fetching the records!"
        });
    }
    
}

const get_audio_id = async (req, res) => 
{
    try 
    {
        console.log("Get Video files by Id!");

        // Id of the document of video
        const { id } = req.params;

        const data = await Audio.find(
            {_id:id},
            {_id:1,url:1,audio:1,text:1}
        ).sort({createdAt:-1});

        return res.status(200).json({
            ok:true,
            data:data,
            message:"Fetched Video files successfully!"
        });
        
    } 
    catch (error) 
    {
        return res.status(404).json({
            ok:false,
            error:error,
            message:"Error in fetching the records!"
        });
    }
    
}

module.exports = {
    get_audio,
    get_audio_id
}