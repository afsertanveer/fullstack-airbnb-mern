import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use Vite's import.meta.env
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Place this property correctly outside headers
});
