import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/member/LoginContext";
import SearchPwd from "./SearchPwd";
import SearchEmail from "./SearchEmail";
import "../../css/login/Login.css";

const Login = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleLogin,
        handleSocialLogin,
        openModal,
        modalType,
        closeModal,
    } = useContext(LoginContext);

    const navigate = useNavigate();

    // 로그인 상태 확인 후 리다이렉트 처리
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("login");
        if (isLoggedIn) {
            alert("이미 로그인 상태입니다.");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="LoginPage">
            <div id="login_container">
                <h1>로그인</h1>
                <form className="loginbox" onSubmit={handleLogin}>
                    <div className="login-align">
                        <label htmlFor="email">이메일</label>
                    </div>
                    <div className="box">
                        <input
                            className="emailbox"
                            type="email"
                            id="email"
                            placeholder="moeego@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login-align">
                        <label htmlFor="password">비밀번호</label>
                    </div>
                    <div className="box">
                        <input
                            className="pwdbox"
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해 주세요."
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="errorBox">
                        {error && <span className="error">{error}</span>}
                    </div>

                    <div className="box">
                        <button type="submit" className="emailLoginBtn">
                            이메일 로그인
                        </button>
                    </div>

                    <div className="snsWrap">
                        <button
                            type="button"
                            className="kakaoLoginBtn"
                            onClick={() => handleSocialLogin("kakao")}
                        >
                            <img
                                className="kakaoImg"
                                src="/image/kakao_white.svg"
                                alt="카카오"
                                width="18"
                                height="16"
                            />
                            카카오로 시작
                        </button>
                    </div>
                    <br />
                    <div className="snsWrap">
                        <button
                            type="button"
                            className="naverLoginBtn"
                            onClick={() => handleSocialLogin("naver")}
                        >
                            <img
                                className="naverImg"
                                src="/image/naver_white.svg"
                                alt="네이버"
                                width="18"
                                height="16"
                            />
                            네이버로 시작
                        </button>
                    </div>
                    <br />
                    {/* <div className="snsWrap">
                        <button
                            type="button"
                            className="googleLoginBtn"
                            onClick={() => handleSocialLogin("google")}
                        >
                            <img
                                className="googleImg"
                                src="/image/google_white.svg"
                                alt="구글"
                                width="18"
                                height="16"
                            />
                            지메일로 시작
                        </button>
                    </div>
                    <br /> */}
                    <div className="login-function">
                        <div className="find">
                            <Link to="/signup">회원가입</Link>
                        </div>
                    </div>
                    <br />
                </form>
                <div
                    className={`ModalWrap ${modalType ? "show" : ""}`}
                    onClick={() => closeModal()}
                >
                    {modalType === "email" && (
                        <SearchEmail closeModal={closeModal} />
                    )}
                    {modalType === "password" && (
                        <SearchPwd closeModal={closeModal} />
                    )}
                </div>
                <br />
            </div>
        </div>
    );
};

export default Login;
