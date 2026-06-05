import axios from "axios";

export const nodeApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

nodeApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("fyp_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

