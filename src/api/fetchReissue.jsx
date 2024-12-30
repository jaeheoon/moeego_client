import { Cookies } from "react-cookie";
import apiAxios from '../api/apiAxios';

// 중복 호출 방지 플래그
let isRefreshing = false;
let failedQueue = []; // 대기 중인 요청을 저장

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const fetchReissue = async () => {
    const cookies = new Cookies();

    if (isRefreshing) {
        // 기존 요청은 Promise로 대기 상태 유지
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        });
    }

    try {
        isRefreshing = true;
        const response = await apiAxios.post("/api/reissue", null, {
            withCredentials: true,
        });

        if (response.status === 200) {
            const accessToken = response.headers["access"];
            if (accessToken) {
                window.localStorage.setItem("access", accessToken);
                apiAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                processQueue(null, accessToken); // 대기 중인 요청 재처리
            }
            return true;
        } else {
            console.error("Reissue failed: Invalid response");
            processQueue(new Error("Reissue failed"));
        }
    } catch (error) {
        processQueue(error);
        console.error("Reissue failed:", error);
    } finally {
        isRefreshing = false;
    }

    // 재발급 실패 시 처리
    window.localStorage.removeItem("access");
    cookies.remove("refresh", { path: "/" });
    console.log("Access 토큰이 만료되었습니다. 다시 로그인해주세요.");

    return false;
};

export default fetchReissue;