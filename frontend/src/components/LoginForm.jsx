import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import authService from '../services/authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your Tailwind CSS enhanced component// Adjust this path based on your file structure


const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userId } = await authService.login(email, password); // Destructure userId from authService response
      console.log('Logged in with userId:', userId);
  
      onLoginSuccess(); // Call parent function to handle login success
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      setError(error.message); // Update to display error message
      toast.error(error.message); // Display error toast
    }
  };
  
  
  return (
    <section className="h-screen flex justify-center items-center bg-white">
      <div className="flex flex-wrap items-center justify-center lg:justify-between w-full">
        <div className="shrink-1 mb-12 md:w-9/12 lg:w-6/12 xl:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample image"
          />
        </div>

        <div className="mb-12 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <form onSubmit={handleSubmit}>
            {/* Social Login Buttons */}

            {/* Separator */}
            

            {/* Email Input */}
            <div className="mb-6  ">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
                required
              />
            </div>

            {/* Remember me and Forgot password */}
            <div className="mb-6 flex items-center justify-between">
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="input-checkbox"
                  type="checkbox"
                  value=""
                  id="exampleCheck2"
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="exampleCheck2"
                >
                  Remember me
                </label>
              </div>
              <a href="#!" className="forgot-password">Forgot password?</a>
            </div>

            {/* Login Button */}
            <div className="text-center lg:text-left">
              <button
                type="submit"
                className="button-primary"
              >
                Login
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>
          </form>

          {/* Register Link */}
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Don't have an account?{' '}
            <Link to="/signup" className="register-link">Register</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
