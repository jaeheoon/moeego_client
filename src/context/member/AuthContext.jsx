import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginUser, setLoginUser] = useState(null);
    const [loginEmail, setLoginEmail] = useState(null);
    const [loginStatus, setLoginStatus] = useState(null);

    // 초기화: 로컬 스토리지에서 토큰 유효성 검사
    useEffect(() => {
        const accessToken = window.localStorage.getItem('access');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const { name, email, memberStatus, exp } = decodedToken;

                if (Date.now() >= exp * 1000) {
                    // 만료된 토큰 처리
                    console.warn("Access token has expired");
                    handleLogout();
                } else {
                    // 유효한 토큰
                    setIsLoggedIn(true);
                    setLoginUser(name);
                    setLoginEmail(email);
                    setLoginStatus(memberStatus);
                }
            } catch (error) {
                console.error("Failed to decode token: ", error);
                handleLogout(); // 토큰 파싱 실패 시 로그아웃
            }
        }
    }, []);

    // 로그아웃 처리
    const handleLogout = () => {
        window.localStorage.clear(); // 모든 로컬 스토리지 항목 삭제
        setIsLoggedIn(false);
        setLoginUser(null);
        setLoginEmail(null);
        setLoginStatus(null);
        alert('로그아웃되었습니다.');
    };

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
                handleLogout, // 로그아웃 함수 추가
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
