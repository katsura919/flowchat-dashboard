import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the Bearer token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            // Retrieve the token from localStorage (or your preferred storage mechanism)
            const token = localStorage.getItem('token');

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Add a response interceptor to handle common global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors, such as clearing the token or redirecting to the login page
            // if (typeof window !== 'undefined') {
            //   localStorage.removeItem('token');
            //   window.location.href = '/login';
            // }
        }
        return Promise.reject(error);
    }
);

export default api;
