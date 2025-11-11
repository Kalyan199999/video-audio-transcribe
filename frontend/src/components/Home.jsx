import React , { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

import VideoFile from './transcribe/VideoFile'
import VideoLink from './transcribe/VideoLink'
import AudioFile from './transcribe/AudioFile'
import AudioLink from './transcribe/AudioLink'

function Home() 
{
  const navigate = useNavigate();

  const [ param1 , setParam1 ] = useState( 'video' )
  const [ param2 , setParam2 ] = useState( 'file' )
  

  const handleNavigation = ()=>
  {
    // navigate(`/transcribe/${param1}/${param2}`)
    console.log(param1);
    console.log(param2);
    
    
  }

  return (
    <div className="min-h-screen w-full border border-red-400 m-2 p-4 md:p-10 flex flex-col items-center gap-4">

      {/* ✅ Button Panel */}
      <div className="w-full sm:w-2/3 md:w-1/3 flex flex-col gap-2">

        {/* Row 1 */}
        <div className="flex gap-2 bg-white p-1 rounded-xl border">
          <button 
          className={`flex-1 h-10 rounded-lg 
              ${param1 === 'video'
                ? 'bg-blue-200 text-blue-500'
                : 'text-black hover:hover:text-blue-700'
              }`}
          onClick={()=>{
            setParam1('video')
            handleNavigation()
          }}
          >
            Video
          </button>

          <button 
          className={`flex-1 h-10 rounded-lg 
              ${param1 === 'audio'
                ? 'bg-blue-200 text-blue-500'
                : 'text-black hover:hover:text-blue-700'
              }`}
          onClick={()=>{setParam1('audio')
            handleNavigation()
          }}
          >
            Audio
          </button>
        </div>

        {/* Row 2 */}
        <div className="flex gap-2 bg-white p-1 rounded-xl border">
          <button 
          className={`flex-1 h-10 rounded-lg 
              ${param2 === 'file'
                ? 'bg-blue-200 text-blue-500'
                : 'text-black hover:hover:text-blue-700'
              }`}
          onClick={()=>{setParam2('file')
            handleNavigation()
          }}
          >
            Upload
          </button>

          <button 
          className={`flex-1 h-10 rounded-lg 
              ${param2 === 'link'
                ? 'bg-blue-200 text-blue-500'
                : 'text-black hover:hover:text-blue-700'
              }`}
          onClick={()=>{setParam2('link')
            handleNavigation()
          }}
          >
            Link
          </button>
        </div>

      </div>

      {/* ✅ Main Content Box */}
      <div className="w-full sm:w-3/4 lg:w-2/3 flex-grow border border-gray-300 rounded-xl bg-white shadow-lg">
      
          {
            param1 === 'video' && param2 === 'file' && (
              <VideoFile param1 = {param1} param2={param2}/>
          )}
    
          {
            param1 === 'video' && param2 === 'link' && (
              <VideoLink />
          )}
    
          {
            param1 === 'audio' && param2 === 'file' && (
                <AudioFile />
          )}
        
          {
              param1 === 'audio' && param2 === 'link' && (
                  <AudioLink />
          )}
          
      </div>

    </div>
  )
}

export default Home
