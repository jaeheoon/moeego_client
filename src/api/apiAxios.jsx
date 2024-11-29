import axios from "axios";

// Axios 인스턴스 생성
const apiAxios = axios.create({
    baseURL: "/", // API 기본 경로
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 자동 포함
});

// 요청 인터셉터
apiAxios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiAxios;
