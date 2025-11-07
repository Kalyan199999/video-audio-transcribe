import React , { useState } from 'react'
import { toast } from 'react-toastify';
import { isValidYouTubeUrl } from '../../utils/util'


function AudioLink() {
  const [url, setUrl] = useState("");
  
    const handleChange = (e) => {
      setUrl(e.target.value);
    };

    const handleSubmit = (e) => {
      
      if( isValidYouTubeUrl( url ) )
      {
        toast.success("URL is valid");
      }
      else
      {
        toast.error("URL is not valid");
      }
    }
  
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-6 p-6">
  
        <h1 className="text-lg md:text-xl font-semibold text-center">
          Please provide the Audio YouTube URL to transcribe into text
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

export default AudioLink
