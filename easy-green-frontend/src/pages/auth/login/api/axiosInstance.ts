import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://b219-2c0f-f5c0-620-44a6-dd01-12f4-c682-f23a.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;