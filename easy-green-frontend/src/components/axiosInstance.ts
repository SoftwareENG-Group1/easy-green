import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ba1e-105-113-56-151.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;