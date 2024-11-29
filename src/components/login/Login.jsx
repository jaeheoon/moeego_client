import React, { useContext } from "react";
import "../../css/login/Login.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/member/LoginContext";
import SearchPwd from "./SearchPwd";
import SearchEmail from "./SearchEmail";

const Login = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleLogin,
        openModal,
        modalType,
        closeModal,
    } = useContext(LoginContext);

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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <span className="error">{error}</span>}

                    <div className="box">
                        <button type="submit" className="emailLoginBtn">
                            이메일 로그인
                        </button>
                    </div>

                    <div className="login-function">
                        <div className="find">
                            <input type="button" value="이메일 찾기" onClick={() => openModal("email")} />
                        </div>
                        <div className="find">
                            <input type="button" value="비밀번호 찾기" onClick={() => openModal("password")} />
                        </div>
                        <div className="find">
                            <Link to="/signup">회원가입</Link>
                        </div>
                    </div>

                    <div
                        className={`ModalWrap ${modalType ? "show" : ""}`}
                        onClick={() => closeModal()}
                    >
                        {modalType === "email" && <SearchEmail closeModal={closeModal} />}
                        {modalType === "password" && <SearchPwd closeModal={closeModal} />}
                    </div>
                    <br />
                    <div>
                        <button type="button" className="kakaoLoginBtn">
                            <img className="kakaoImg" src="/image/kakao_white.svg" alt="카카오" width="18" height="16" />
                            카카오로 시작
                        </button>
                    </div>
                    <br />
                    <div>
                        <button type="button" className="naverLoginBtn">
                            <img className="naverImg" src="/image/naver_white.svg" alt="네이버" width="18" height="16" />
                            네이버로 시작
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
