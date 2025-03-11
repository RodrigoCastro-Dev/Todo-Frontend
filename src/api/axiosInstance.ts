import axios from "axios";
import { API_URL, AUTH_EMAIL, AUTH_PASSWORD } from ".";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = async () => {
  let token = localStorage.getItem("access_token");

  if (!token) {
    const newToken = await authApi.post('/login', { user: { email: AUTH_EMAIL, password: AUTH_PASSWORD } });
    localStorage.setItem("access_token", newToken.data.token);
    return newToken.data.token;
  }

  return token;
};

api.interceptors.request.use(async (config) => {
  if (!config.headers.Authorization) {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;