import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-hot-toast';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api/v1';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/* ---------------- Request Interceptor ---------------- */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- Response Interceptor ---------------- */

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<{ message?: string }>) => {
    console.error('API Error:', error);

    // Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      toast.error('Session expired. Please login again.');

      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }

    // Backend message
    else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    // Network / server error
    else if (error.message) {
      toast.error(error.message);
    }

    // Unknown error
    else {
      toast.error('Something went wrong');
    }

    return Promise.reject(error);
  }
);

export default api;