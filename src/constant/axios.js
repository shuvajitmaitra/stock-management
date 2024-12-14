import axios from "axios";

const axiosInstance = axios.create({
  baseURL: true ? "http://localhost:5001" : "https://stock-management-server-khaki.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
