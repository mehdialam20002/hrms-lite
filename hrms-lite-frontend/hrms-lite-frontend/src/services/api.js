import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-backendd.onrender.com/api/v1",
});

export default api;
