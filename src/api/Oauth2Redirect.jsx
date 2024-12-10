import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLogin } from "../contexts/AuthContext";
import apiAxios from './apiAxios';

const OAuth2Redirect = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const { setIsLoggedIn, setLoginEmail, setLoginUser, setLoginStatus, setLoginAddress, setLoginPhone, setLoginProfile, setLoginNumber } = useContext(AuthContext);

    useEffect(() => {
        const fetchOAuth2JwtHeader = async () => {
            try {
                const response = await apiAxios.post("/api/oauth2-jwt-header", null, {
                    withCredentials: true,
                });

                if (response.status === 200) { // 성공적으로 처리된 경우
                    const accessToken = response.headers['access'];

                    if (!accessToken) {
                        throw new Error("Access token is missing from the response");
                    }

                    const decodedToken = jwtDecode(accessToken);
                    const { name, email, memberStatus, address, phone, profileImage, memberNo } = decodedToken;

                    window.localStorage.setItem("username", name);
                    window.localStorage.setItem("useremail", email);
                    window.localStorage.setItem("memberStatus", memberStatus);
                    window.localStorage.setItem("useraddress", address);
                    window.localStorage.setItem("userphone", phone);
                    window.localStorage.setItem("userprofile", profileImage);
                    window.localStorage.setItem("userno", memberNo);
                    window.localStorage.setItem("login", true);

                    setIsLoggedIn(true);
                    setLoginUser(name);
                    setLoginEmail(email);
                    setLoginStatus(memberStatus);
                    setLoginAddress(address);
                    setLoginPhone(phone);
                    setLoginProfile(profileImage);
                    setLoginNumber(memberNo);

                } else {
                    alert('접근할 수 없는 페이지입니다.');
                }
            } catch (error) {
                console.error("OAuth2 인증 중 에러 발생: ", error);
                alert('로그인 과정에서 문제가 발생했습니다.');
            } finally {
                navigate('/', { replace: true }); // 인증 후 메인 페이지로 이동
            }
        };

        fetchOAuth2JwtHeader();
    }, [queryParams, setIsLoggedIn, setLoginUser, navigate]);

    return null; // UI가 필요 없는 컴포넌트이므로 null 반환
};

export default OAuth2Redirect;
