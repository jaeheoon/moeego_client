import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from "../../context/member/AuthContext";
import apiAxios from '../../api/apiAxios';

const Logout = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setLoginEmail, setLoginUser, setLoginStatus, setLoginAddress, setLoginPhone, setLoginProfile, setLoginNumber } = useContext(AuthContext);

    useEffect(() => {
        const fetchLogout = async () => {
            try {
                // 로그아웃 요청 시 백엔드에서 refresh token 블랙리스트 처리 (혹은 refresh 토큰 DB에서 삭제)
                const response = await apiAxios.post("/api/logout");

                if (response.status === 200) {
                    // access token 삭제 (로컬 스토리지)
                    window.localStorage.clear();

                    setIsLoggedIn(false);
                    setLoginUser(null);
                    setLoginEmail(null);
                    setLoginStatus(null);
                    setLoginAddress(null);
                    setLoginPhone(null);
                    setLoginProfile(null);
                    setLoginNumber(null);
                } else {
                    alert("logout failed");
                }

                navigate("/", { replace: true });
                window.location.reload()
            } catch (error) {
                console.log("로그인이 필요합니다.");
                navigate("/");
            }
        };

        fetchLogout();
    }, [navigate, setIsLoggedIn, setLoginUser]);

    return null; // 컴포넌트 UI가 필요 없다면 null 반환
}

export default Logout;
