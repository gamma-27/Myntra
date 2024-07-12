import axios from 'axios';

const API_AUTH_URL = 'http://localhost:5000/api/auth';
const API_USER_URL = 'http://localhost:5000/api/auth/user';

const authService = {
  signup: async (email, password) => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/signup`, { email, password });
      //console.log('Signup response:', response.data); // Log response
      return response.data;
    } catch (error) {
      console.error('Signup error:', error); // Log error
      throw new Error(error.response ? error.response.data.message : 'Server error');
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/login`, { email, password });
      console.log('Login response:', response.data); // Log response
  
      const { token } = response.data; // Extract token from response
  
      // Use the token to fetch user details, including userId
      const userResponse = await axios.get(`${API_USER_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const { userId } = userResponse.data; // Extract userId from user profile response
      console.log('UserId:', userId);
  
      localStorage.setItem('userId', userId); // Store userId in localStorage
      localStorage.setItem('token', token); // Store token in localStorage

      return { userId }; // Return userId for further handling if needed
    } catch (error) {
      console.error('Login error:', error); // Log error
      throw new Error(error.response ? error.response.data.message : 'Server error');
    }
  },
};

export default authService;
