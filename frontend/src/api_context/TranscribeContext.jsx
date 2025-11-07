import { createContext,useContext,useState } from "react";
import axios from "axios";

const TranscribeContext = createContext();

export const TranscribeProvider = ({children}) => 
{
    const baseurl = 'http://localhost:5050/api/'
    
    const [transcript,setTranscript] = useState('');
    const [error , setError] = useState('');
    const [loading , setLoading] = useState(false);
    const [data,setData] = useState()

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

    return(
        <TranscribeContext.Provider 
        value={{
            transcript,
            error,loading
            }}>
            {children}
        </TranscribeContext.Provider>
    )
}

const useTranscribe = () => useContext(TranscribeContext);