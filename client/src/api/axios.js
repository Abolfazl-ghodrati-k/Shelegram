import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5050",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from local storage, cookie, or wherever it's stored
        const token = localStorage.getItem("token");
        if (token) {
            // Set Authorization header with the token
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;