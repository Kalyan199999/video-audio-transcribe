import { Link } from "react-router-dom";

function NavigationBar() {
  return (

    <nav className="flex flex-col sm:flex-row justify-between items-center p-3 bg-yellow-50 shadow-md">
      
      <Link
        to="/"
        className="px-4 py-2 mb-2 sm:mb-0 sm:ml-10 text-3xl text-blue-500 hover:text-blue-600 transition-colors duration-200"
      >
        Transcribe
      </Link>



      <Link
        to="/login"
        className="px-4 py-2 sm:mr-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Login
      </Link>

    </nav>
    
  );
}

export default NavigationBar;