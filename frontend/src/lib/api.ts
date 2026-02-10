import axios from 'axios';

/**
 * API Client Configuration
 * 
 * Sử dụng '/api' làm baseURL để proxy qua:
 * - Development: Vite proxy '/api' -> 'http://localhost:3000' (xem vite.config.ts)
 * - Production: Nginx proxy '/api' -> 'http://backend:3000' (xem nginx.conf)
 * 
 * Điều này giúp:
 * - Giấu backend URL khỏi client
 * - Tránh CORS issues
 * - Dễ dàng thay đổi backend URL mà không cần rebuild frontend
 */
const api = axios.create({
  baseURL: '/api',
  //baseURL: import.meta.env.VITE_API_URL || '/api',
  //baseURL: process.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor - có thể thêm auth token ở đây
api.interceptors.request.use(
  (config) => {
    // Future: Add auth token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      switch (status) {
        case 401:
          console.error('Unauthorized - Please login');
          // Future: Redirect to login
          break;
        case 403:
          console.error('Forbidden - Access denied');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error:', message);
          break;
        default:
          console.error('API Error:', message);
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network error - Backend không phản hồi');
      console.error('Kiểm tra: Backend có đang chạy? (http://localhost:3000)');
    } else {
      // Something else happened
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Forms API
export const formsApi = {
  getAll: () => api.get('/forms'),
  getByCode: (code: string) => api.get(`/forms/${code}`),
  getSchema: (code: string) => api.get(`/forms/${code}/schema`),
  create: (data: any) => api.post('/forms', data),
  update: (code: string, data: any) => api.put(`/forms/${code}`, data),
};

// Products API
export const productsApi = {
  getAll: () => api.get('/products'),
  getByCode: (code: string) => api.get(`/products/${code}`),
  getVersion: (code: string, versionNo: number) => 
    api.get(`/products/${code}/versions/${versionNo}`),
  create: (data: any) => api.post('/products', data),
  update: (code: string, data: any) => api.put(`/products/${code}`, data),
  delete: (code: string) => api.delete(`/products/${code}`),
};

// Scoring API
export const scoringApi = {
  calculate: (productCode: string, versionNo?: number) => 
    api.post(`/scoring/calculate/${productCode}`, { versionNo }),
  getScores: (productCode: string) => api.get(`/scoring/${productCode}`),
  getFrameworks: () => api.get('/scoring/frameworks'),
};

// Workflow API
export const workflowApi = {
  get: (productCode: string) => api.get(`/workflows/${productCode}`),
  start: (productCode: string, data: any) => 
    api.post(`/workflows/${productCode}/start`, data),
  addAction: (productCode: string, data: any) => 
    api.post(`/workflows/${productCode}/action`, data),
};

export default api;

