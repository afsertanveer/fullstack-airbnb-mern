import axios from 'axios';

// Retrieve the token from sessionStorage
const token = sessionStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `${token}`;
}

// Create and export an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use Vite's environment variable
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Properly placed outside of the headers object
});

export default axiosInstance;
