import axios from "axios";
import fetchReissue from "./fetchReissue";

const apiAxios = axios.create({
    baseURL: "/",
    withCredentials: true,
});

apiAxios.interceptors.request.use(
    (config) => {
        const accessToken = window.localStorage.getItem("access");
        if (accessToken) {
            config.headers["authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const reissueSuccess = await fetchReissue();
            if (reissueSuccess) {
                const newAccessToken = window.localStorage.getItem("access");
                originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
                return apiAxios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default apiAxios;
