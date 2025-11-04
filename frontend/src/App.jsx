import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      {/* Always visible on every page */}
      <NavigationBar />  

      {/* Route definitions */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<h1>Home</h1>} />

        {/* All user routes */}
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/user/:id" element={<h1>Specific user</h1>} />

        {/* Transcribe links */}
        <Route path="/transcribe/audio/link" element={<h1>Transcribe audio link</h1>} />
        <Route path="/transcribe/video/link" element={<h1>Transcribe video link</h1>} />

        {/* Transcribe files */}
        <Route path="/transcribe/audio/file" element={<h1>Transcribe audio file</h1>} />
        <Route path="/transcribe/video/file" element={<h1>Transcribe video file</h1>} />

        {/* Catch-all route */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
