const {
  createUserContent,
  createPartFromUri,
} = require("@google/generative-ai");

const { genAI, model } = require('./gen-ai');
const { getMediaMimeType } = require('../utils/util');

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
        // get the memetype of the file
        const memetype = getMediaMimeType(filePath);

        // check for valid mimetype
        if( !memetype )
        {
            return{
                ok:false,
                error: "Invalid file type. Only audio or video files are supported."
            }
        }

        // upload the file to the API
        const myfile = await genAI.files.upload({
                    file: filePath,
                    config: { mimeType: memetype },
                });

        // transcibe the video
        const response = await model.generateContent({
                    contents: createUserContent([
                      createPartFromUri(myfile.uri, myfile.mimeType),
                      "Transcribe this Video to text accurately",
                    ]),
                });

        // get the text
        const transcript = response.text();

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