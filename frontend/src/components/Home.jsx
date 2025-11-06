import React from 'react'

function Home() {
  return (
    <div className="min-h-screen w-full border border-red-400 m-2 p-4 md:p-10 flex flex-col items-center gap-4">

      {/* ✅ Button Panel */}
      <div className="w-full sm:w-2/3 md:w-1/3 flex flex-col gap-2">

        {/* Row 1 */}
        <div className="flex gap-2 bg-white p-1 rounded-xl border">
          <button className="flex-1 h-10 text-black hover:bg-blue-200 hover:text-blue-700 rounded-lg">
            Video
          </button>

          <button className="flex-1 h-10 text-black hover:bg-blue-200 hover:text-blue-700 rounded-lg">
            Audio
          </button>
        </div>

        {/* Row 2 */}
        <div className="flex gap-2 bg-white p-1 rounded-xl border">
          <button className="flex-1 h-10 text-black hover:bg-blue-200 hover:text-blue-700 rounded-lg">
            Upload
          </button>

          <button className="flex-1 h-10 text-black hover:bg-blue-200 hover:text-blue-700 rounded-lg">
            Link
          </button>
        </div>

      </div>

      {/* ✅ Main Content Box */}
      <div className="w-full sm:w-3/4 lg:w-2/3 flex-grow border border-gray-300 rounded-xl bg-white shadow-lg">
      </div>

    </div>
  )
}

export default Home
