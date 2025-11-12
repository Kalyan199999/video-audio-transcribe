import  { useState } from "react";
import { toast } from 'react-toastify';
import { isValidYouTubeUrl } from '../../utils/util'
import { useTranscribe } from '../../api_context/TranscribeContext';
import { useUser } from '../../api_context/UserContext'

function VideoLink( { param1, param2 } ) {
  const [url, setUrl] = useState("");

  // console.log({ param1, param2 });
  

  const { 
    transcribe,
    loading,
   } = useTranscribe();

   const { user,token } = useUser();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

   const handleSubmit = async ()=>
  {
    try 
    {
      if (!isValidYouTubeUrl(url)) 
      {
        toast.error("Invalid YouTube URL");
        return;
      }

      const payload = {
        id:user.id,
        url:url
      }

      const res = await transcribe(param1,param2,token,payload,'json');

      console.log("Response inside the video Link:",res);
      
    } 
    catch (error) 
    {
      console.log("Error inside the video Link",error);
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 p-6">

      <h1 className="text-lg md:text-xl font-semibold text-center">
        Please provide the YouTube URL to transcribe into text
      </h1>

      <div className="w-full max-w-md p-6 rounded-xl shadow-md border bg-violet-100">
        
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter Video URL
        </h2>

        <input
          type="text"
          placeholder="https://youtube.com/..."
          value={url}
          onChange={handleChange}
          className="
            w-full p-3 border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        />

        <button
          disabled={!url}
          className={`
            w-full mt-4 py-3 rounded-lg font-medium transition
            ${url
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
          onClick={handleSubmit}
        >
          Transcribe
          
        </button>
      </div>
    </div>
  );
}

export default VideoLink;
