import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranscribe } from '../../api_context/TranscribeContext';
import { useUser } from '../../api_context/UserContext';
import { handleDownloadDocument } from '../../utils/util'

function DisplayVideoId() {
  const { id } = useParams();

  const { loading, get_Audio_video_id, videodata } = useTranscribe();
  const { token } = useUser();

  const fetchData = async () => {
    try {
      await get_Audio_video_id(token, id, "video");
    } catch (error) {
      console.log("error");
    }
  };

  
  

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 ">
      {videodata && videodata.map((item) => (
        <div
          key={item._id}
          className=" rounded-xl p-6 mb-6 shadow-md hover:shadow-xl transition-shadow duration-200 bg-gray-100"
        >
          {item.video && (
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {item.video.originalname}
            </p>
          )}

          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700 transition-colors duration-150"
            >
              View Video
            </a>
          )}

          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mt-3">
            {item.text}
          </p>

          <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                onClick={() => handleDownloadDocument(item.text, "video_transcribe")}
              >
                Download
              </button>
          </div>


        </div>
      ))}
    </div>
  );
}

export default DisplayVideoId;