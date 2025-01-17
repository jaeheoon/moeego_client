import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import fetchReissue from "../../api/fetchReissue"; // 토큰 재발급 함수

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginUser, setLoginUser] = useState(null);
    const [loginEmail, setLoginEmail] = useState(null);
    const [loginStatus, setLoginStatus] = useState(null);
    const [loginAddress, setLoginAddress] = useState(null);
    const [loginPhone, setLoginPhone] = useState(null);
    const [loginProfile, setLoginProfile] = useState(null);
    const [loginNumber, setLoginNumber] = useState(null);

    // 로그아웃 처리
    const handleLogout = () => {
        window.localStorage.clear(); // 모든 로컬 스토리지 항목 삭제
        setIsLoggedIn(false);
        setLoginUser(null);
        setLoginEmail(null);
        setLoginStatus(null);
        setLoginAddress(null);
        setLoginPhone(null);
        setLoginProfile(null);
        setLoginNumber(null);
    };

    // 엑세스 토큰 확인 및 초기화
    const checkTokenValidity = async () => {
        const accessToken = window.localStorage.getItem("access");
        if (!accessToken) {
            handleLogout(); // 엑세스 토큰 없으면 로그아웃
            return;
        }

        try {
            const decodedToken = jwtDecode(accessToken);
            const { name, email, memberStatus, address, phone, profileImage, memberNo } = decodedToken;
            const exp = decodedToken.exp; // 만료 시간 확인

            if (!exp) {
                console.error("Token does not contain 'exp' field.");
                handleLogout();
                return;
            }

            if (Date.now() >= exp * 1000) {
                console.warn("Access token expired. Attempting reissue...");
                const reissueSuccess = await fetchReissue();

                if (!reissueSuccess) {
                    handleLogout(); // 재발급 실패 시 로그아웃
                } else {
                    console.log("Access token successfully reissued.");
                    await checkTokenValidity(); // 재발급 후 다시 확인
                }
            } else {
                // 유효한 토큰
                setIsLoggedIn(true);
                setLoginUser(name);
                setLoginEmail(email);
                setLoginStatus(memberStatus);
                setLoginPhone(phone);
                setLoginAddress(address);
                setLoginProfile(profileImage);
                setLoginNumber(memberNo);
            }
        } catch (error) {
            console.error("Failed to decode token: ", error);
            handleLogout(); // 토큰 파싱 실패 시 로그아웃
        }
    };

    useEffect(() => {
        checkTokenValidity(); // 컴포넌트 마운트 시 토큰 검증 및 초기화
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                loginUser,
                setLoginUser,
                loginEmail,
                setLoginEmail,
                loginStatus,
                setLoginStatus,
                loginAddress,
                setLoginAddress,
                loginPhone,
                setLoginPhone,
                loginProfile,
                setLoginProfile,
                loginNumber,
                setLoginNumber,
                handleLogout, // 로그아웃 함수
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
