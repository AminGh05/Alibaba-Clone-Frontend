import axios from "axios";
import { useAuthStore } from "@/shared/store/authStore";

const agent = axios.create({
  baseURL: "https://localhost:7131/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// add a request interceptor to include JWT token if available
agent.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// add a response interceptor to handle 401 Unauthorized
agent.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default agent;
