import axios from "axios";
import { refreshTokenApi } from "./api";


const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});



// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) {
                localStorage.clear();
                window.location.href = "/login";
                return;
            }

            try {
                const res = await refreshTokenApi(refreshToken);
                const newAccessToken = res.data?.tokens?.access_token;
                const newRefreshToken = res.data?.tokens?.refresh_token;

                if (newAccessToken && newRefreshToken) {
                    localStorage.setItem("access_token", newAccessToken);
                    localStorage.setItem("refresh_token", newRefreshToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                } else {
                    throw new Error("No tokens returned");
                }
            } catch (err) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        // other error
        if (error.response?.data) return Promise.reject(error.response.data);
        return Promise.reject(error);
    }
);

export default instance;