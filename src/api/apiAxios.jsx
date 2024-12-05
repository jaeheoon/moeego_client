import axios from "axios";

// Axios 인스턴스 생성
const apiAxios = axios.create({
    baseURL: "/", // API 기본 경로
    withCredentials: true, // 쿠키 자동 포함
});

// 요청 인터셉터에서 access 토큰 추가
apiAxios.interceptors.request.use(
    (config) => {
        const accessToken = window.localStorage.getItem("access");
        if (accessToken) {
            config.headers["access"] = accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiAxios;
