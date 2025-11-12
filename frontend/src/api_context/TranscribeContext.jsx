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

    const getTranscript = async ( params1,params2,id ) =>
    {
        setLoading(true);
        try{
            const response = await axios.get(baseurl + 'transcribe', {params: {params1,params2,id}});
            setTranscript(response.data);
            setLoading(false);
        }
        catch(err)
        {
            setError(err.message);
            setLoading(false);
        }
    }

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
                error,
                loading,
            }
        }>
            {children}
        </TranscribeContext.Provider>
    )
}

export const useTranscribe = () => useContext(TranscribeContext);