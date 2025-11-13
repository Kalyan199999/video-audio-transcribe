import { useUser } from "../api_context/UserContext";
import DisplayAudios from "./transcribe/DisplayAudios";
import DisplayVideos from "./transcribe/DisplayVideos";

function UserProfile() {
  const { user, isLoggedIn } = useUser();

  // console.log(user);
  

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <h2 className="text-lg font-medium">Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Profile Card */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 mb-10 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{user.email}</h1>
            <p className="text-gray-500">Member since 2025</p>
          </div>
        </div>
      </div>

      {/* Audio and Video Sections */}
      <div className="w-full max-w-5xl space-y-10">
        {/* Audio Section */}
        <section className="bg-white shadow rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🎧 Your Audios</h2>
          <DisplayAudios />
        </section>

        {/* Video Section */}
        <section className="bg-white shadow rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🎥 Your Videos</h2>
          <DisplayVideos />
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
