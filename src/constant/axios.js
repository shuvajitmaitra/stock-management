import axios from "axios";

const prod = true;

const axiosInstance = axios.create({
  baseURL: prod ? "https://stock-management-server-khaki.vercel.app" : "http://localhost:5001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
