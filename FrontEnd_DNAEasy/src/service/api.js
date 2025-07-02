// api.js (file cấu hình Axios)
import axios from 'axios';

import { IsTokenAboutToExpire } from './jwtDecode';
import { RefreshTokenExprie } from './refreshtoken';

// Create API instance with detailed logging
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000, // 10 seconds timeout
});

// Add request logging
api.interceptors.request.use(request => {
  // Log token status for debugging
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token found for request:', request.url);
    request.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No token found for request:', request.url);
  }

  console.log('API Request:', {
    url: request.url,
    method: request.method,
    data: request.data,
    headers: request.headers
  });
  return request;
});

// Add response logging
api.interceptors.response.use(
  response => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    
    // Add detailed logging for statistics endpoint
    if (response.config.url.includes('/statistics')) {
      console.log('STATISTICS ENDPOINT DETAILS:');
      console.log('Response data type:', typeof response.data);
      console.log('Response data full:', JSON.stringify(response.data));
      console.log('Response headers:', response.headers);
      console.log('Response status text:', response.statusText);
      
      // Try to handle various response formats
      if (typeof response.data === 'string') {
        try {
          const parsedData = JSON.parse(response.data);
          console.log('Parsed response data:', parsedData);
          return {
            ...response,
            data: parsedData
          };
        } catch (e) {
          console.error('Failed to parse response data:', e);
        }
      }
      
      // If data is an empty object or missing expected fields, log details
      if (response.data && typeof response.data === 'object') {
        if (Object.keys(response.data).length === 0) {
          console.warn('WARNING: Statistics response data is an empty object');
        } else if (!response.data.revenue && !response.data.totalExpense && !response.data.remain) {
          console.warn('WARNING: Statistics response missing expected fields (revenue, totalExpense, remain)');
          console.log('Available keys:', Object.keys(response.data));
        }
      }
    }
    
    return response;
  },
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Tự động thêm token vào mỗi request
let flag = true;
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('token');

    if (flag && token && IsTokenAboutToExpire(token)) {
      flag = false;
      try {
        console.log("Token is about to expire, refreshing...");
        const response = await RefreshTokenExprie({ token: token });
        
        localStorage.setItem('token', response.data.token);
        console.log("Token refreshed successfully");
        flag = true;
      } catch (error) {
        console.error("Error refreshing token:", error);
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized, redirecting to login");
          localStorage.clear();
          window.location.href = '/user/login';
        }
      }
    }
    
    token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);  

// Export cả default và named export
export { api };
export default api;
