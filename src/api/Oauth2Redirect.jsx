import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/member/AuthContext";
import apiAxios from '../api/apiAxios'; // apiAxios 경로 유지
import { jwtDecode } from "jwt-decode"; // JWT 디코딩 라이브러리

const OAuth2Redirect = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const {
        setIsLoggedIn,
        setLoginEmail,
        setLoginUser,
        setLoginStatus,
        setLoginAddress,
        setLoginPhone,
        setLoginProfile,
        setLoginNumber,
    } = useContext(AuthContext);

    useEffect(() => {
        const fetchOAuth2JwtHeader = async () => {
            try {
                const response = await apiAxios.post("/api/oauth2-jwt-header", null, {
                    withCredentials: true, // 쿠키를 포함한 요청
                });

                if (response.status === 200) { // 성공적인 응답 처리
                    const accessToken = response.headers['access'];
                    window.localStorage.setItem("access", accessToken);

                    if (!accessToken) {
                        throw new Error("Access token is missing from the response");
                    }

                    // JWT 디코딩
                    const decodedToken = jwtDecode(accessToken);
                    const {
                        name,
                        email,
                        memberStatus,
                        address,
                        phone,
                        profileImage,
                        memberNo,
                    } = decodedToken;

                    // 로컬 스토리지 저장
                    window.localStorage.setItem("username", name);
                    window.localStorage.setItem("useremail", email);
                    window.localStorage.setItem("memberStatus", memberStatus);
                    window.localStorage.setItem("useraddress", address);
                    window.localStorage.setItem("userphone", phone);
                    window.localStorage.setItem(
                        "userprofile",
                        profileImage && profileImage.startsWith("https://")
                            ? profileImage // https://로 시작하면 그대로 사용
                            : profileImage
                                ? "https://kr.object.ncloudstorage.com/moeego/profile/" + profileImage // 아니면 경로 추가
                                : '/image/default.svg' // profileImage가 없으면 기본 이미지 사용
                    );
                    window.localStorage.setItem("userno", memberNo);
                    window.localStorage.setItem("login", true);

                    // 전역 상태 업데이트
                    setIsLoggedIn(true);
                    setLoginUser(name);
                    setLoginEmail(email);
                    setLoginStatus(memberStatus);
                    setLoginAddress(address);
                    setLoginPhone(phone);
                    setLoginProfile(
                        profileImage && profileImage.startsWith("https://")
                            ? profileImage // https://로 시작하면 그대로 사용
                            : profileImage
                                ? "https://kr.object.ncloudstorage.com/moeego/profile/" + profileImage // 아니면 경로 추가
                                : '/image/default.svg' // profileImage가 없으면 기본 이미지 사용
                    );
                    setLoginNumber(memberNo);
                } else {
                    console.error("OAuth2 인증 실패: ", response);
                    alert('접근할 수 없는 페이지입니다.');
                }
            } catch (error) {
                console.error("OAuth2 인증 중 에러 발생: ", error);
                alert('로그인 과정에서 문제가 발생했습니다.');
            } finally {
                // 인증 후 메인 페이지 또는 이전 페이지로 이동
                navigate('/', { replace: true });
            }
        };

        fetchOAuth2JwtHeader();
    }, [
        queryParams,
        setIsLoggedIn,
        setLoginEmail,
        setLoginUser,
        setLoginStatus,
        setLoginAddress,
        setLoginPhone,
        setLoginProfile,
        setLoginNumber,
        navigate,
    ]);

    return null; // 리다이렉트 페이지는 UI가 필요하지 않음
};

export default OAuth2Redirect;
