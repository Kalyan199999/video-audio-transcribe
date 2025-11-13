import  { useEffect } from 'react'
import { useTranscribe } from '../../api_context/TranscribeContext'
import { useUser } from '../../api_context/UserContext';

function DisplayAudios() {

  const {
          getAll_Audio_video,
          allAudios,
        } = useTranscribe();

  const {
    token,
    user  
  } = useUser();
  
  

    useEffect(() => {
      const fetchVideos = async () => {
        try {
          await getAll_Audio_video(token, { id: user.id }, 'audio');
        } catch (err) {
          console.error("Error fetching audios:", err);
        }
      };
    
      fetchVideos()

    }, []);
    


  console.log(`All Audios:`);
  console.log(allAudios);
  
  

  return (
    <div>
      {
        allAudios &&
        (
          allAudios.map((audio,idx) => {
            return (
              <div key={audio._id}>
                {/* <audio controls src={audio.audio_file} /> */}
                <p>{audio._id}</p>
              </div>
            )
          })
        )
      }
    </div>
  )
}

export default DisplayAudios
