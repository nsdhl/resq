import axios from "axios";


export const url = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
});

url.interceptors.request.use(function(config) {
  try {
    let token: any = JSON.parse(localStorage.getItem("user") as string)
    if (!token) return config;
    config.headers.Authorization = `Bearer ${token.token}`;
  } catch (error) {
    console.error("Failed to parse token:", error);
  }
  return config;
});
