import { Cookies } from "react-cookie";
import apiAxios from '../api/apiAxios';

const fetchReissue = async () => {
    const cookies = new Cookies();

    try {
        const response = await apiAxios.post("/api/reissue", null, {
            withCredentials: true,
        });

        console.log(response);

        if (response.status === 200) {
            const accessToken = response.headers["access"];
            if (accessToken) {
                window.localStorage.setItem("access", accessToken);
            }
            return true;
        } else {
            console.error("Reissue failed: Invalid response");
        }
    } catch (error) {
        console.error("Error during token reissue: ", error);
    }
    window.localStorage.removeItem("access");
    cookies.remove("refresh", { path: "/" });
    console.log("Access 토큰이 만료되었습니다. 다시 로그인해주세요.");

    return false;
};

export default fetchReissue;
