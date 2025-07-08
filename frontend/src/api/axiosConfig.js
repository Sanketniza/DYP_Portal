import axios from 'axios';
import { toast } from 'sonner'; // Adjust import according to your toast library

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor for common error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle network errors gracefully
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
