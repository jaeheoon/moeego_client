import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios";
import Cookies from "js-cookie";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalType, setModalType] = useState(null);
    const [login, setLogin] = useState(null);
    const navigate = useNavigate();

    const openModal = (type) => {
        setModalType((prevType) => (prevType === type ? null : type));
        document.body.style.overflow = type ? "hidden" : "auto";
    };

    const closeModal = () => {
        setModalType(null);
        document.body.style.overflow = "auto";
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await apiAxios.post("/api/login", { email, password });

            if (response.data.success) {
                const { user } = response.data; // 서버에서 쿠키 설정
                setLogin(user); // 사용자 정보 저장
                navigate("/"); // 로그인 후 홈으로 이동
            } else {
                setError("이메일 또는 비밀번호가 틀렸습니다.");
            }
        } catch (err) {
            console.error("로그인 실패:", err);
            setError("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const handleLogout = async () => {
        try {
            await apiAxios.post("/api/logout"); // 서버에서 쿠키 삭제
            setLogin(null); // 로그인 상태 초기화
            navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
        } catch (err) {
            console.error("로그아웃 실패:", err);
        }
    };

    return (
        <LoginContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                error,
                setError,
                modalType,
                setModalType,
                login,
                setLogin,
                openModal,
                closeModal,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export { LoginProvider, LoginContext };
