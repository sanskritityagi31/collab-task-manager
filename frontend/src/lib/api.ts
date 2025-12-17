import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // 🔥 REQUIRED for JWT cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
