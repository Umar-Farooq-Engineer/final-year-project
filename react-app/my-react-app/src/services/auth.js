import { nodeApi } from "./api";

const TOKEN_KEY = "fyp_token";
const USER_KEY = "fyp_user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const isLoggedIn = () => Boolean(getToken());
export const getCurrentUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};
export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const loginRequest = (credentials) => nodeApi.post("/auth/login", credentials);
export const signupRequest = (data) => nodeApi.post("/auth/register", data);
export const fetchHistory = () => nodeApi.get("/history");
export const saveHistory = (record) => nodeApi.post("/history", record);
