const {  model } = require('./gen-ai');
const fs = require('fs')
const { getMediaMimeType } = require('../utils/util')

const genAIAudioTranscribe = async (filePath) => 
{
  try 
  {
    // Read the file
    const audioBytes = fs.readFileSync(filePath).toString("base64");

    // Detect file MIME type (adjust if needed)
    let mimeType = getMediaMimeType(filePath)
    
    // Send audio to Gemini model for transcription
    const result = await model.generateContent([
      { text: 'Transcribe this audio to text accurately!' },
      {
        inlineData: {
          mimeType,
          data: audioBytes,
        },
      },
    ]);

    // Extract text output
    const transcript = result.response.text();

    return {
        ok:true,
        text:transcript
    };
  } 
  catch (error) 
  {
    return {
        ok:false,
        text:error.message
    }
  }
};


const genAIAudioLinkTranscribe = async (url) => 
{
    try 
    {
      
        // transcrie the video link ito text
        const result = await model.generateContent([
             "Transcribe this Audio to text accurately",
             {
               fileData: {
                 fileUri: url,
               },
             },
            ]);

            // get the text
        const transcript = result.response.text();

        console.log( transcript );

            return {
                ok : true,
                data: transcript
            }
    } 
    catch (error) 
    {
        return {
            ok : false,
            error: error
        }
    }
}

module.exports = { genAIAudioTranscribe,genAIAudioLinkTranscribe };