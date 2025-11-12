const Video = require('../../model/video_model')

const { genAIVideoLinkTranscribe } = require('../../gemini-api-models/gen-ai-video-transcribe')

const get_link_video = async (req, res) => 
{
  try 
  {
    
    const data = await Video.find().sort({ createdAt: -1 });
    
    return res.status(200).json({ 
      message: "Fetched all the records!",
      data,
      ok:true
    });
  } 
  catch (error) 
  {
    return res.status(400).json({ message: "Failed",ok:false });
  }
}

const get_link_video_id = async (req, res) => 
{
  try 
  {
    const id = req.params.id
    
    const data = await Video.find({
      _id:id
    });
    
    return res.status(200).json({ message: "Fetched all the records!",data,ok:true });
  } 
  catch (error) 
  {
    return res.status(400).json({ message: "Failed",ok:false });
  }
}


const post_link_video = async (req, res) =>
{
    try 
    { 
      console.log("Post method of video link!");

      console.log(req.body);
      

      const {url,id} = req.body;
      
      const transcription = await genAIVideoLinkTranscribe(url);

      console.log(transcription);
      
      if(transcription.ok)
      {
        const video = new Video({
          url: url,
          text: transcription.data,
          user:id
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
        data:transcription
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

module.exports = { get_link_video,get_link_video_id , post_link_video };