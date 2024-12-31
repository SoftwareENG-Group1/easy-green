import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://b219-2c0f-f5c0-620-44a6-dd01-12f4-c682-f23a.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;