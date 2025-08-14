import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

// Configure base URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create axios instance
export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage - check 'token', 'authToken', and 'access_token' for compatibility
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('access_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`[Axios] ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data,
      params: config.params
    });
    
    return config;
  },
  (error) => {
    console.error('[Axios] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log(`[Axios] Response ${response.config.url}:`, response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log error details
    console.error(`[Axios] Error ${error.config?.url}:`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      headers: error.config?.headers
    });
    
    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      toast({
        title: "Sesión expirada",
        description: "Por favor, inicia sesión nuevamente",
        variant: "destructive"
      });
      
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // Handle other errors
    if (error.response?.status === 404) {
      console.error('[Axios] Resource not found:', error.config?.url);
    } else if (error.response?.status === 500) {
      toast({
        title: "Error del servidor",
        description: "Ha ocurrido un error interno. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    }
    
    return Promise.reject(error);
  }
);

// Export default instance
export default api; 