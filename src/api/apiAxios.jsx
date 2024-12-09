import axios from "axios";
import fetchReissue from "./fetchReissue"; // 토큰 재발급 로직 가져오기

// Axios 인스턴스 생성
const apiAxios = axios.create({
    baseURL: "/", // API 기본 경로
    withCredentials: true, // 쿠키 자동 포함
});

// 요청 인터셉터: 엑세스 토큰 추가
apiAxios.interceptors.request.use(
    (config) => {
        const accessToken = window.localStorage.getItem("access");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`; // 권장 방식
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 처리
apiAxios.interceptors.response.use(
    (response) => response, // 성공 시 그대로 반환
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // 401 Unauthorized && 첫 재시도일 경우
            originalRequest._retry = true; // 재시도 방지 플래그

            const reissueSuccess = await fetchReissue(); // 리프레시 토큰으로 재발급
            if (reissueSuccess) {
                const newAccessToken = window.localStorage.getItem("access");
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return apiAxios(originalRequest); // 원래 요청 재시도
            }
        }
        return Promise.reject(error); // 실패 처리
    }
);

export default apiAxios;
