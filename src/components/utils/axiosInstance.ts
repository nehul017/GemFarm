import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";



const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for Error Handling (401 Logout)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      // Clear auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      // Dispatch logout action
      store.dispatch(logout());

      // Redirect to login
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
