import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Reel from './components/Reel'; // Assuming Reel component exists

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  const handleSignupClick = () => {
    setShowSignUp(true);
    navigate('/signup');
  };

  const handleLoginClick = () => {
    setShowSignUp(false);
    navigate('/login');
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    navigate('/reel'); // Navigate to /reel after successful login
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login'); // Navigate to /login after logout
  };

  return (
    
    
    <div className="App min-h-screen flex items-center justify-center " style={{ backgroundImage: "url('https://img.freepik.com/free-photo/fast-fashion-vs-slow-sustainable-fashion_23-2149133987.jpg?t=st=1720633085~exp=1720636685~hmac=d7b69771dbb039dc1054f82bbd2e2a2da5442d4fcc98acac5270a889ffe092c6&w=360') " }}>
      
      <ToastContainer />
      
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/reel" element={<Reel />} />
        <Route
          path="/"
          element={
            !loggedIn && !showSignUp ? (
              <header className="App-header">
                <div className='font-semibold text-4xl mb-[4rem]'> Welcome to StyleHive</div>
                <div className='m-[6rem]'>
                  <button onClick={handleSignupClick} className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md mr-4 hover:bg-amber-400">Sign Up</button>
                  <button onClick={handleLoginClick} className="bg-amber-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-500">Login</button>
                </div>
              </header>
            ) : loggedIn ? (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello, welcome!</h1>
                <button onClick={handleLogout} className="bg-white px-4 py-2 rounded-lg shadow-md">Logout</button>
              </div>
            ) : null
          }
        />
      </Routes>
    
    </div>
  );
}

export default App;
