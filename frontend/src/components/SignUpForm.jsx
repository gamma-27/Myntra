import React, { useState } from 'react';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(email, password);
      toast.success('Signup successful!');
      navigate('/reel');
    } catch (error) {
      setError(error.message); // Ensure error message is set properly
    }
  };

  return (
    <div className='flex '>
       <div className="shrink-1 mb-12 md:w-9/12 lg:w-8/12 xl:w-2/12">
          <img
            src="https://img.freepik.com/free-photo/sign-up-register-online-internet-web-concept_53876-133557.jpg?t=st=1720636073~exp=1720639673~hmac=3ffa99775099a522670d88af7d0f99f229d7c901c9653b9866aa83ab1f8147b9&w=740"
            className="w-full"
            alt="Sample image"
          />
        </div>
    <div className="signup-form max-w-md mx-auto my-10 p-6 lg:w-8/12 bg-white rounded shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
          Sign Up
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default SignUpForm;
