import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://4eab-41-79-67-56.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;