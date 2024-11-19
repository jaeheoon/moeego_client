import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <div id="login_container">
                <h1>로그인</h1>
                <form>
                    <div>
                        <div>
                            <label htmlFor="email">이메일</label>
                        </div>
                            <div>
                                <input
                                type="email"
                                id="email"
                                placeholder="example@soomgo.com"
                                />
                            </div>
                        <div>
                            <p>이메일 주소를 입력해 주세요.</p>
                        </div>
                
                        <div>
                            <label htmlFor="password">비밀번호</label>
                        </div>
                        <div>
                            <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해 주세요."
                            />
                        </div>
                        <div>
                            <button type="submit">
                            이메일 로그인
                            </button>
                        </div>
                    </div>

                <div>
                    <a href="#">이메일 찾기</a>
                    <div></div>
                    <a href="#">비밀번호 찾기</a>
                    <div></div>
                    <Link to="/signup">
                        <a href='#'>회원가입</a>
                    </Link>
                    
                </div>
        
                {/* 이전에 로그인한 기록이 있으면 아래 문구 출력 시킴 
                <span>
                    이전에 이메일로 로그인했어요
                </span>
                */} 
                <div>
                    <button type="button">
                    카카오로 시작하기
                    </button>
                    <button type="button">
                    네이버로 시작하기
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
  };
  
  export default Login;