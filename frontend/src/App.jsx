import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { 
  ToastContainer,
  // toast 
} from 'react-toastify'

import NavigationBar from './components/NavigationBar';

import Registration from './components/user/Registration'
import Login from './components/user/Login'
import UserProfile from './components/UserProfile'
import Home from './components/Home'

import { useUser } from './api_context/UserContext'

function App() {

    const {
    isLoggedIn
  } = useUser()

  return (
    <>
       <ToastContainer
        position="bottom-right"  
        autoClose={3000}          // how long toast stays visible (ms)
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"           // or 'light' | 'dark'
      />

{/* <button onClick={()=>{toast.success('Successful!')} 
      }>btn</button> */}

          <Router>

            <NavigationBar />  

            <hr className="border-t-2 border-gray-300" />


            {/* Always visible on every page */}
    
            {/* Route definitions */}
            <div className='bg-yellow-50 min-h-screen flex justify-center align-center'>

                <Routes>
                  {/* Home page */}
                  <Route path="/" element={<Home />} />
          
                    {/* All user routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  {/* isLoggedIn */}
                  <Route path="/user-profile" element={<UserProfile />} />
          
                    {/* Transcribe links */}
                  <Route path="/transcribe/audio/link" element={<h1>Transcribe audio link</h1>} />
                  <Route path="/transcribe/video/link" element={<h1>Transcribe video link</h1>} />
          
                    {/* Transcribe files */}
                  <Route path="/transcribe/audio/file" element={<h1>Transcribe audio file</h1>} />
                  <Route path="/transcribe/video/file" element={<h1>Transcribe video file</h1>} />
          
                    {/* Catch-all route */}
                  <Route path="*" element={<h1>Page not found</h1>} />
    
                </Routes>

              </div>

        </Router>

    </>
  );
}

export default App;
