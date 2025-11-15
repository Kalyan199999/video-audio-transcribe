import React, { useState, useEffect } from "react";
import { useTranscribe } from "../../api_context/TranscribeContext";
import { handleDownloadDocument } from '../../utils/util'

function DisplayTranscribe() {
  const { loading, data } = useTranscribe();
  const [transcribeData, setTranscribeData] = useState(data?.data);

  useEffect(() => {
    setTranscribeData(data?.data);
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!transcribeData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
        <p>No transcription data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-yellow-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
            Transcription
        </h2>

        <div className="space-y-6">
          {transcribeData?.url && (
            <div className="p-4 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">
                    URL:
              </p>
              <a
                href={transcribeData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline break-all"
              >
                {transcribeData.url}
              </a>
            </div>
          )}

          {transcribeData?.text && (
            <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
                Transcribed Text:
              </p>
              <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap leading-relaxed">
                {transcribeData.text}
              </p>
            </div>
          )}

          {
            transcribeData?.text && 

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                onClick={() => handleDownloadDocument(transcribeData.text, "transcribe")}
              >
                Download
              </button>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default DisplayTranscribe;
