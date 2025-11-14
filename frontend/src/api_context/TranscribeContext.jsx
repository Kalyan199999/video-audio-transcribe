import { createContext,useContext,useState } from "react";
import axios from "axios";

const TranscribeContext = createContext();

export const TranscribeProvider = ({children}) => 
{
    const baseurl = 'http://localhost:5050/api'
    
    const [transcript,setTranscript] = useState('');
    const [error , setError] = useState('');
    const [loading , setLoading] = useState(false);
    const [data,setData] = useState(() => 
      {
          const savedUser = localStorage.getItem("transcribe");
          return savedUser ? JSON.parse(savedUser) : null;
      });

    const [allAudios , setAudio ] = useState(null);

    const [allVideos , setVideo ] = useState(null);

    const [videodata , setVideoData] = useState(null);

    const [audiodata , setAudioData] = useState(null);

    
    const getAll_Audio_video = async (token, payload, type = "video") => 
    {
        try {
          setLoading(true);
        
          const endpoint = type === "audio" ? "audio" : "video";
        
          // use POST to send body payload
          const response = await axios.post(
                `${baseurl}/get/${endpoint}/`,
                payload,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
            );
         
            if (type === "audio") 
            {
                setAudio(response.data.data);
            } 
            else    
            {
                setVideo(response.data.data);
            }
         
        //   console.log(response.data);
          
        } 
        catch (error) 
        {
          console.error("Audio/video fetch error:", error);
        //   return error;
        } 
        finally 
        {
          setLoading(false);
        }
    };

    const get_Audio_video_id = async (token,id, type = "video") => 
    {
        try 
        {
            setLoading(true);
            
            const endpoint = type === "audio" ? "audio" : "video";
        
          // use POST to send body payload
            const response = await axios.get(
                `${baseurl}/get/${endpoint}/${id}`,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
            );

            console.log(response.data);
            

            if (type === "audio") 
            {
                setAudioData(response.data.data);
            } 
            else    
            {
                setVideoData(response.data.data);
            }


        } 
        catch (error) 
        {
            console.error("Audio/video by id fetch error:", error);
            // return error;
        }
        finally
        {
            setLoading(false);
        }
    }



    // const getAllVideos = async ( token , payload ) =>
    // {
    //     try 
    //     {
    //         setLoading(true);

    //         const response = await axios.get( 
    //             `${baseurl}/get/video/`,
    //             payload,
    //             {
    //                 headers: {
    //                     'authorization': `Bearer ${token}`
    //                 }
    //             }
    //         )

    //         setVideo(response.data);
            
    //         console.log(response.data);

    //         setLoading(false)

    //         return response.data;
    //     } 
    //     catch (error) 
    //     {
    //         console.log("Audio error:",error);
            
    //     }
    // }

   const transcribe = async (params1, params2, token, formData,type = "form") => 
    {
        try {
            setLoading(true);

            let headers = {
                authorization: `Bearer ${token}`,
            };
            
            let payload = formData;

            if (type === "json") 
            {
                headers["Content-Type"] = "application/json";
                payload = JSON.stringify( formData );
            }           
            else 
            {
                headers["Content-Type"] = "multipart/form-data";
            }
    
            const response = await axios.post(
                `${baseurl}/${params1}/${params2}`,
                payload,
                { headers }
            );
    
            console.log(response);

            localStorage.setItem( "transcribe", JSON.stringify( response.data ) );

            setData(response.data);

            return response.data;
            
        } 
        catch (error) 
        {
            console.error("Error occurred:", error);
            return error
        } 
        finally 
        {
            setLoading(false);
        }
    }


    return(
        <TranscribeContext.Provider 
        value={
            {
                transcribe,
                transcript,
                // getAllVideos,
                getAll_Audio_video,
                allAudios,
                allVideos,
                get_Audio_video_id,
                videodata,
                audiodata,
                error,
                loading,
                data
            }
        }>
            {children}
        </TranscribeContext.Provider>
    )
}

export const useTranscribe = () => useContext(TranscribeContext);