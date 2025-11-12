import { Link , useNavigate } from "react-router-dom";
import { useUser } from '../api_context/UserContext'
import { toast } from "react-toastify";

function NavigationBar() {

  const {
    user,
    logout,
    isLoggedIn
  } = useUser()

  const navigate = useNavigate()
  
  return (

    <nav className="flex flex-col sm:flex-row justify-between items-center p-3 bg-yellow-50 shadow-md">
      
      <Link
        to="/"
        className="px-4 py-2 mb-2 sm:mb-0 sm:ml-10 text-3xl text-blue-500 hover:text-blue-600 transition-colors duration-200"
      >
        Transcribe
      </Link>


      <div className={`flex flex-row items-center justify-end gap-4 sm:gap-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm`}>
        
        {/* Display user */}
        {isLoggedIn && (
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={()=>navigate(`/user-profile`)}
            >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {user.email}
            </h1>
          </div>
        )}
      
        {/* Login / Logout button */}
        {
            isLoggedIn ? 
            (
              <div className="flex flex-row gap-2">

                <button
                  onClick={()=>{
                    navigate('/transcribe/display')
                  }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                  Last transcribe 
                </button>

                <button
                  onClick={()=>{
                    navigate('/')
                    logout()
                    toast.success('Logged out successfully')
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>

              </div>
            ) : 
            (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )
        }
        
      </div>


    </nav>
    
  );
}

export default NavigationBar;