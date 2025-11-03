const {
  createUserContent,
  createPartFromUri,
} = require("@google/generative-ai");

const { genAI, model } = require('./gen-ai');
const { getMediaMimeType } = require('../utils/util');
const { getFileToGenerativePart } = require('../utils/util')

const genAIVideoLinkTranscribe = async (url) => 
{
    try 
    {
        // transcrie the video link ito text
        const result = await model.generateContent([
             "Transcribe this video to text accurately",
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


const genAIVideoTranscribe = async (filePath) =>
{
    try 
    {
        const fileData = getFileToGenerativePart(filePath)
    
        // Send video to Gemini model for transcription
        const result = await model.generateContent([
          { text: 'Transcribe this video to text accurately!' },
          fileData
        ]);

    const transcript = result.response.text();

        console.log( transcript );

        return {
            ok : true,
            data: transcript
        }
    }
    catch (error) 
    {
        console.error("Transcription error:", error);

        return (
            {
            ok : false,
            error: error
           } 
        )
    }
}

module.exports = { genAIVideoLinkTranscribe , genAIVideoTranscribe };