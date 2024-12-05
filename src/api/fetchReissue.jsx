import { Cookies } from "react-cookie";
import apiAxios from '../api/apiAxios';

const fetchReissue = async () => {
    try {
        const response = await apiAxios.post("/reissue", null, {
            withCredentials: true,
        });

        if (response.status === 200) {
            const accessToken = response.headers["access"];
            if (accessToken) {
                window.localStorage.setItem("access", accessToken);
            }
            return true;
        } else {
            window.localStorage.removeItem("access");
            const cookies = new Cookies();
            cookies.remove("refresh", { path: "/" });
        }
    } catch (error) {
        console.error("Error during token reissue: ", error);
    }
    return false;
};

export default fetchReissue;
