const Video = require('../../model/video_model')

const { genAIVideoTranscribe } = require('../../gemini-api-models/gen-ai-video-transcribe')

const get_file_video = async (req, res) => 
{
    try 
    {
        console.log("Get Video files!");

        const data = await Video.find().sort({createdAt:-1});

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

const get_file_video_id = async (req, res) => 
{
    try 
    {
        console.log("Get Video files by Id!");

        const {id} = req.params;

        const data = await Video.find({_id:id}).sort({createdAt:-1});

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



const post_file_video = async (req, res) =>
{
    try 
    { 
      console.log("Post method of file!");

      const file = req.file
      
      const transcription = await genAIVideoTranscribe( file.path );

      console.log(transcription);
      
      if(transcription.ok)
      {
        const video = new Video({
          video:file,
          text: transcription.data,
        });

        await video.save();

        return res.status(200).json({ 
          ok:true,
          message: "Generated successfully!!",
          data:video 
        });
      }

      return res.status(400).json({ 
        ok:false,
        message: "Failed to generate it!" ,
        error:transcription
      });

    } 
    catch (error) 
    {
        return res.status(400).json({
          ok:false, 
          message: "Failed",
          data:error.message,
        });
    }
}

module.exports = {
    get_file_video,
    get_file_video_id,
    post_file_video

}