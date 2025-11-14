import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranscribe } from '../../api_context/TranscribeContext';
import { useUser } from '../../api_context/UserContext';

function DisplayVideos() {
  const navigate = useNavigate();
  const { getAll_Audio_video, allVideos } = useTranscribe();
  const { token, user } = useUser();

  // Track which cards are expanded
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        await getAll_Audio_video(token, { id: user.id }, 'video');
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };
    fetchVideos();
  }, [token, user]);

  // Toggle Read More / Read Less
  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  
  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-6">
      {allVideos && allVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allVideos.map((item) => {
            const isExpanded = expandedCards[item._id];

            return (
              <div
                key={item._id}
                onClick={()=>navigate(`/transcribe/display/video/${item._id}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col items-center p-4 cursor-pointer"
              >
                {item.video && (
                  // <video
                  //   src={item.video.path}
                  //   controls
                  //   className="w-full rounded-md mb-4 bg-black"
                  // />
                  <p 
                    className="text-sm text-blue-600 break-all text-center mb-2 hover:underline"
                  >
                      {item.video.originalname}
                  </p>
                )}

                { 
                  item.url && (
                    <a
                      href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 break-all text-center mb-2 hover:underline"
                    >
                      {item.url}
                    </a>
                )}


                {/* Text section with expandable behavior */}
                <div
                  className={`text-gray-700 text-center transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px]' : 'max-h-32'} overflow-hidden`}
                >
                  {item.text}
                </div>

                {/* 👇 Read More / Read Less button */}
                {item.text && item.text.length > 200 && (
                  <button
                    onClick={() => toggleExpand(item._id)}
                    className="mt-2 text-sm font-medium text-blue-600 hover:underline focus:outline-none"
                  >
                    {isExpanded ? 'Read less' : 'Read more'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No videos data found.
        </p>
      )}
    </div>
  );
}

export default DisplayVideos;