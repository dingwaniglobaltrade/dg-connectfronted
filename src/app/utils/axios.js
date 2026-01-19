import axios from "axios";

const instance = axios.create({
  //baseURL: "https://dingwanifoods-backned-code.onrender.com/api/v1",
   //baseURL: "http://localhost:8080/api/v1/",
   baseURL: process.env.Backned_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
