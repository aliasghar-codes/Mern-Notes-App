import axios from "axios";
import { baseUrl } from "./constants.js";

const axiosInstance = axios.create({

    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }

});

axiosInstance.interceptors.request.use(

    config => {

        const accessToken = document.cookie;
        console.log(accessToken);
        
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },

    error => {

        return Promise.reject(error);
    }
)

export default axiosInstance;
