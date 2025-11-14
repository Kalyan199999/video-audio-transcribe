import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranscribe } from '../../api_context/TranscribeContext';
import { useUser } from '../../api_context/UserContext';

function DisplayAudios() {
  const navigate = useNavigate();

  const { getAll_Audio_video, allAudios } = useTranscribe();
  const { token, user } = useUser();

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        await getAll_Audio_video(token, { id: user.id }, 'audio');
      } catch (err) {
        console.error('Error fetching audios:', err);
      }
    };
    fetchAudios();
  }, [token, user]);

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-6">
      {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        🎵 Your Uploaded Audios
      </h2> */}

      {allAudios && allAudios.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {allAudios.map((item) => (
            <div
              key={item._id}
              onClick={()=>navigate(`/transcribe/display/audio/${item._id}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col items-center p-4 cursor-pointer"
            >
              {/* 🎧 Audio Player */}
              {item.audio?.path && (
                // <audio
                //   controls
                //   src={
                //     item.audio.path.startsWith('http')
                //       ? item.audio.path
                //       : `https://your-server-domain.com${item.audio.path}`
                //   }
                //   className="w-full mb-4"
                // />

                <p 
                  className="text-lg text-blue-600 break-all text-center mb-2 hover:underline"
                >
                    {item.audio.originalname} 
                </p>
                
              )}

              {/* 🔗 Audio URL */}
              {item.url && (
                <a
                  href={
                    item.url.startsWith('http')
                      ? item.url
                      : `https://${item.url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 break-all text-center mb-2 hover:underline"
                >
                  {item.url}
                </a>
              )}

              {/* 📝 Truncated text preview */}
              <p className="text-gray-700 text-center line-clamp-6">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No audio files found.
        </p>
      )}
    </div>
  );
}

export default DisplayAudios;
