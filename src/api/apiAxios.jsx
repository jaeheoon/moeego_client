import axios from "axios";

const apiAxios = axios.create({
    baseURL: "/", // Vite 프록시를 사용하므로 기본 경로는 "/"로 설정
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 인증이 필요하다면 설정
});

export default apiAxios;