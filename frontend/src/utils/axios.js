import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.1.2:5000"
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token; // match your backend header
      // or use Authorization if you switched middleware
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response.data.message;

      if (message === "Token expired") {
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
      } else if (message === "Invalid token") {
        localStorage.removeItem("token");
        alert("Invalid session. Please log in again.");
      } else if (message.includes("No token")) {
        localStorage.removeItem("token");
        alert("You need to log in first.");
      } 
    }
    return Promise.reject(error);
  }
);

export default instance;