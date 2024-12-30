import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import apiAxios from '../../api/apiAxios';
import jwtDecode from "jwt-decode";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalType, setModalType] = useState(null);
    const { setIsLoggedIn, setLoginEmail, setLoginUser, setLoginStatus, setLoginAddress, setLoginPhone, setLoginProfile, setLoginNumber } = useContext(AuthContext);

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
                const accessToken = response.data.accessToken || response.headers["access"];
                window.localStorage.setItem("access", accessToken);

                const decodedToken = jwtDecode(accessToken); // 디코딩된 토큰
                const { name, email, memberStatus, address, phone, profileImage, memberNo } = decodedToken; // name과 email 추출

                if (memberStatus === 'ROLE_CANCEL') {
                    alert("탈퇴한 계정입니다.");
                    navigate('/logout');
                } else {

                    console.log('███╗   ███╗ ██████╗ ███████╗███████╗ ██████╗  ██████╗ ');
                    console.log('████╗ ████║██╔═══██╗██╔════╝██╔════╝██╔════╝ ██╔═══██╗');
                    console.log('██╔████╔██║██║   ██║█████╗  █████╗  ██║  ███╗██║   ██║');
                    console.log('██║╚██╔╝██║██║   ██║██╔══╝  ██╔══╝  ██║   ██║██║   ██║');
                    console.log('██║ ╚═╝ ██║╚██████╔╝███████╗███████╗╚██████╔╝╚██████╔╝');
                    console.log('╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ');

                    console.log(response.data.name + '님 환영합니다.');

                    // 로컬 스토리지에 저장
                    window.localStorage.setItem("username", name);
                    window.localStorage.setItem("useremail", email);
                    window.localStorage.setItem("memberStatus", memberStatus);
                    window.localStorage.setItem("useraddress", address);
                    window.localStorage.setItem("userphone", phone);
                    if (profileImage) {
                        const imageUrl = profileImage.startsWith("https://") || profileImage.startsWith("http://")
                            ? profileImage // https://로 시작하면 그대로 사용
                            : "https://kr.object.ncloudstorage.com/moeego/profile/" + profileImage; // 아니면 경로 추가

                        window.localStorage.setItem("userprofile", imageUrl);
                    } else {
                        window.localStorage.setItem("userprofile", '/image/default.svg'); // profileImage가 없으면 기본 이미지 사용
                    }

                    window.localStorage.setItem("userno", memberNo);
                    window.localStorage.setItem("login", true);

                    setIsLoggedIn(true);
                    setLoginUser(name);
                    setLoginEmail(email);
                    setLoginStatus(memberStatus);
                    setLoginAddress(address);
                    setLoginPhone(phone);
                    const DEFAULT_PROFILE_IMAGE = '/image/default.svg';

                    if (profileImage && typeof profileImage === "string") {
                        const imageUrl = profileImage.startsWith("https://") || profileImage.startsWith("http://")
                            ? profileImage
                            : "https://kr.object.ncloudstorage.com/moeego/profile/" + profileImage;

                        setLoginProfile(imageUrl);
                    } else {
                        setLoginProfile(DEFAULT_PROFILE_IMAGE);
                    }

                    setLoginNumber(memberNo);

                    navigate(prevUrl, { replace: true });
                }
            } else {
                alert(`Login failed: ${response.data.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            if (error.response.data.code === 400) {
                setError("탈퇴한 회원입니다.");
            } else {
                setError("아이디 또는 비밀번호를 확인해주세요");
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email: email, pwd: password };
        fetchLogin(credentials);
    }

    // 소셜 로그인
    const handleSocialLogin = (provider) => {
        window.location.href = `/api/oauth2/authorization/${provider}`;
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
