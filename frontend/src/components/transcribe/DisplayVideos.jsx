import  { useEffect } from 'react'
import { useTranscribe } from '../../api_context/TranscribeContext'
import { useUser } from '../../api_context/UserContext';

function DisplayVideos() {

  const {
          getAll_Audio_video,
          allVideos,
        } = useTranscribe();

  const {
    token,
    user  
  } = useUser();
  
  

    useEffect(() => {
      const fetchAudios = async () => {
        try {
          await getAll_Audio_video(token, { id: user.id }, 'video');
        } catch (err) {
          console.error("Error fetching audios:", err);
        }
      };
    
      fetchAudios()

    }, [token,user]);
    


  console.log(`All videos:`);
  console.log(allVideos);

  return (
    <div>
      <h1>All videos</h1>
      {
        allVideos && (
          allVideos.map((video) => {
            return (
              <div key={video._id}>
                <video src={video.audio_file} controls />
                <p>{video.url}</p>
                {/* <p>{video.audio_file}</p> */}
              </div>
            )
          })
        )
      }
    </div>
  )
}

export default DisplayVideos
