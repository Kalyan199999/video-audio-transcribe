import  { useState } from 'react';

import { useTranscribe } from '../../api_context/TranscribeContext';
import { useUser } from '../../api_context/UserContext'

function VideoFile( { param1, param2 } ) 
{
  // console.log({ param1, param2 });
  
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const { 
    transcribe,
    loading,
   } = useTranscribe();

   const { user,token } = useUser();

  //  console.log(user.id);
   
  const handleFileChange = (event) => 
  {
    const selected = event.target.files[0];

    if (selected && selected.type.startsWith("video/")) 
    {
      setFile(selected);

      // Create downloadable URL
      const url = URL.createObjectURL(selected);
      setDownloadURL(url);

      console.log("Selected video:", selected);
    } 
    else 
    {
      alert("Please upload a valid video file.");
      setFile(null);
      setDownloadURL(null);
    }
  };

  const handleSubmit = async ()=>
  {
    try 
    {
      const formData = new FormData();
      formData.append("video", file); 
      formData.append("id", user.id); 

      for (const pair of formData.entries()) 
      {
        console.log(pair[0] + ": ", pair[1]);
      }

      const res = await transcribe(param1,param2,token,formData);

      console.log("Response inside the video file:",res);
      
    } 
    catch (error) 
    {
      console.log("Error inside the videofile",error);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 p-4 sm:p-6">

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center">
        Transcribe Your Video into Text
      </h1>

      {/* Upload Box */}
      {
        !file &&
        <label
        className="
          flex flex-col items-center justify-center 
          w-full max-w-2xl h-40 sm:h-48 
          border-2 border-dashed border-blue-300 
          rounded-xl cursor-pointer 
          hover:bg-blue-50 transition
        "
      >
        <span className="text-blue-500 font-semibold text-center">
          Click to upload video
        </span>

        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleFileChange}
        />
      </label>
      }

      {/* File Name */}
      {file && (
        <p className="text-gray-600 text-sm sm:text-base text-center">
          Selected File: <span className="font-medium">{file.name}</span>
        </p>
      )}

      {/* ✅ Download Video Button */}
      {downloadURL && (
        <a
          href={downloadURL}
          download={file.name}
          className="
            px-6 py-2 
            bg-green-500 text-white rounded-lg 
            hover:bg-green-600 transition 
            w-full max-w-xs text-center
          "
        >
          Download Video
        </a>
      )}

      {/* Submit Button */}
      <button
          disabled={!file}
          className={`
            px-6 py-2 rounded-lg w-full max-w-xs text-white transition
            ${
              file
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
          onClick={handleSubmit}
      >
        Transcribe
      </button>


    </div>
  );
}

export default VideoFile;
