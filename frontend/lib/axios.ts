import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/", // Replace with your backend API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;