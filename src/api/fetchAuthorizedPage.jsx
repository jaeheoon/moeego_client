import { Cookies } from "react-cookie";
import apiAxios from "./apiAxios";

const fetchReissue = async () => {
    const cookies = new Cookies();

    try {
        const response = await apiAxios.post("/api/reissue", null, { withCredentials: true });

        if (response.status === 200) {
            const accessToken = response.headers["access"];
            if (accessToken) {
                window.localStorage.setItem("access", accessToken);
                return true;
            }
        }
    } catch (error) {
        console.error("Error during token reissue: ", error);
    }

    window.localStorage.removeItem("access");
    cookies.remove("refresh", { path: "/" });
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    return false;
};

export default fetchReissue;
