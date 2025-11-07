import axios from "axios";

const instance = axios.create({
  baseURL: "http://Dg-connect-backned-env.eba-7rzcknvs.ap-south-1.elasticbeanstalk.com/api/v1",
    // baseURL: "http://localhost:8080/api/v1/",
    withCredentials: true
})


instance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default instance ; 

