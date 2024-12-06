import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import apiAxios from '../../api/apiAxios';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalType, setModalType] = useState(null);

    const { setIsLoggedIn, setLoginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const prevUrl = location.state || "/";

    // 모달 열기/닫기
    const openModal = (type) => {
        setModalType(type);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalType(null);
        document.body.style.overflow = "auto";
    };

    const fetchLogin = async (credentials) => {
        try {
            const response = await apiAxios.post("/api/login", new URLSearchParams(credentials), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log('로그인 성공 : ' + response.data.name);
                const { name } = response.data; // JSON 데이터에서 `name` 가져오기

                window.localStorage.setItem("access", response.headers["access"]);
                window.localStorage.setItem("name", name);

                setIsLoggedIn(true);
                setLoginUser(name);

                navigate(prevUrl, { replace: true });
            } else {
                alert(`Login failed: ${response.data.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            console.error('Error during login: ', error);
            setError("아이디 또는 비밀번호를 확인해주세요");
            console.log('로그인 중 오류가 발생했습니다.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email: email, pwd: password };
        console.log(credentials);
        fetchLogin(credentials);
    }

    // 소셜 로그인
    const handleSocialLogin = (provider) => {
        apiAxios.get(`/api/oauth2/authorization/${provider}`);
    };

    return (
        <LoginContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                error,
                modalType,
                openModal,
                closeModal,
                handleLogin,
                handleSocialLogin,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export { LoginProvider, LoginContext };
