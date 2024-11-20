import React from 'react';
import "../../css/login/Login.css";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="LoginPage">
            <div id="login_container">
                <h1>로그인</h1>
                <form className="loginbox">
                    <div className="login-align">
                        <label htmlFor="email">이메일</label>
                    </div>
                    <div className='box'>
                        <input className="emailbox" type="email" id="email" placeholder="moeego@example.com"
                        />
                    </div>
                    <div className="login-align">
                        <label htmlFor="password">비밀번호</label>
                    </div>
                    <div className='box'>
                        <input className="pwdbox" type="password" id="password" placeholder="비밀번호를 입력해 주세요."
                        />
                    </div>
                    <div className='box'>
                        <button type="submit" className="emailLoginBtn">
                            이메일 로그인
                        </button>
                    </div>
                    <div className="login-fuction">
                        <div className="find">
                            <Link to="#">이메일 찾기</Link>
                        </div>
                        <div className="find">
                            <Link to="#">비밀번호 찾기</Link>
                        </div>
                        <div className="find">
                            <Link to="/signup">회원가입</Link>
                        </div>
                    </div>
                    <br />
                    {/* 이전에 로그인한 기록이 있으면 아래 문구 출력 시킴 
                    <span>
                        이전에 이메일로 로그인했어요
                    </span>
                    */}
                    <div>
                        <button type="button" className="kakaoLoginBtn">
                            <img className="kakaoImg" src="../../src/image/kakao_white.svg" alt="카카오" width="18" height="16" />
                            카카오로 시작
                        </button>
                    </div>
                    <br />
                    <div>
                        <button type="button" className="naverLoginBtn">
                            <img className="naverImg" src="../../src/image/naver_white.svg" alt="네이버" width="18" height="16" />
                            네이버로 시작
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
