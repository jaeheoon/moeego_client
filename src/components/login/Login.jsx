import React from 'react';
import "../../css/login/Login.css";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div id="login_container">
            <h1>로그인</h1>
            <form class="loginbox">
                    <br/>
                    <div class="login-align">
                        <label htmlFor="email">이메일</label>
                    </div>
                    <div class="login-align">
                        <input
                        class="emailbox"
                        type="email"
                        id="email"
                        placeholder="example@MoeeGo.com"
                        />
                    </div>
                    <div id="emailDiv"></div>
                    <br/>
                    <div class="login-align">
                        <label htmlFor="password">비밀번호</label>
                    </div>
                    
                    <div class="login-align">
                        <input
                        class="pwdbox"
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력해 주세요."
                        />
                    </div>
                    <div id="pwdDiv"></div>
                    <br/>
                    <div class="login-align">
                        <button type="submit" class="emailLoginBtn">
                        이메일 로그인
                        </button>
                    </div>
                <br/>
            <div class="login-fuction">
                <div class="find">
                <a href="#">이메일 찾기</a>
                </div>
                <div class="find">
                <a href="#">비밀번호 찾기</a>
                </div>
                <div class="find">
                <Link to="/signup">
                    <a href='#'>회원가입</a>
                </Link>
                </div>
            </div>
            <br/>
            {/* 이전에 로그인한 기록이 있으면 아래 문구 출력 시킴 
            <span>
                이전에 이메일로 로그인했어요
            </span>
            */} 
            <div class="login-align">
                <button type="button" class="kakaoLoginBtn">
                <img src="../../src/image/kaka.png" alt="카카오" width="18" height="16"/>
                    카카오로 시작
                </button>
            </div>
            <br/>
            <div class="login-align">
                <button type="button" class="naverLoginBtn">
                <img src="../../src/image/n.png" alt="네이버" width="18" height="16"/>
                네이버로 시작
                </button>
            </div>
            </form>
            <br/>
            <br/>
        </div>
    );
  };
  
  export default Login;