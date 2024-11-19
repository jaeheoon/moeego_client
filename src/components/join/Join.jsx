import React from 'react';
import "../../css/join/Join.css";
import { Link } from 'react-router-dom';

const Join = () => {
    return (
        <div className="JoinPage">
            <div id="join_container">
                    <h1>MoeeGo에 오신 것을 환영합니다.</h1>
                <form className="joinbox">
                    <br/>
                    <div className="join-align">
                        <label>이름</label>
                    </div>
                    <div>
                        <input className="namebox" type="text" placeholder='이름(실명)을 입력해주세요.'/>
                    </div>
                    {/* 유효성검사
                    <div>
                        <p>이름을 입력해주세요.</p>
                    </div>
                     */}
                    <div className="join-align">
                        <span id="warn">타인 명의로 가입 시 계정이 정지되고 재가입이 불가능합니다.</span> 
                    </div>
                    <div id="nameDiv"></div>
                    <br/>

                    <div className="join-align">
                        <lable>이메일</lable>
                    </div>
                    <div>
                        <input className="emailbox" type='email' placeholder='MoeeGo@example.com' />
                    </div>
                    <div id="emailDiv"></div>
                    {/* 유효성검사
                    <div>
                        <p>이메일 주소를 입력해주세요.</p>
                    </div>
                     */}
                    <br/>

                    <div className="join-align">
                        <lable>비밀번호</lable>
                    </div>
                    <div>
                        <input className="pwdbox"type='password' placeholder='비밀번호를 입력해 주세요.' />
                    </div>
                    <div id="pwdDiv"></div>
                    {/* 유효성검사
                    <div>
                        <p>비밀번호를 입력해 주세요.</p>
                    </div>
                     */}
                     <br/>
                    <div className="join-align">
                        <lable>비밀번호 확인</lable>
                    </div>
                    <div>
                        <input className="repwdbox" type='password' />
                        {/* <div>
                            <p>비밀번호가 일치하지 않습니다.</p>
                        </div> */}
                    </div>
                    <div id="repwdDiv"></div>
                    <br/>

                    <div className="join-align">
                        <label>성별</label>
                        <div className="select">
                            <input type="radio" value="M" id="m" name="gender"/><label for="m">남자</label>
                            <input type="radio" value="F" id="w" name="gender"/><label for="w">여자</label>
                        </div>
                    </div>

                    <br/>
                    <div className="join-align">
                        <label>휴대전화 번호</label>
                    </div>
                    <div>
                        <input className="phonebox" type='text' placeholder='예) 010-1234-5678' />
                    </div>
                    <div>
                        <button className="checkBtn">
                        인증번호 발송</button>
                    </div>
                    <div className="join-align">
                        <label>인증번호 입력</label>
                        <input className="checknumbox" type='text' />
                        <button className="checknumBtn">
                            확인</button>
                    </div>
                    <br/>

                    <div className="join-align">
                        <label>우편번호</label>
                    </div>
                    <div>
                        <input className="zipcodebox" type='text' />
                        <button className="zipcheckBtn">
                            우편번호 검색</button>
                    </div>
                    <br/>

                    <div className="join-align">
                        <label>주소</label>
                    </div>
                    <div>
                        <input className="addrbox" type='text' />
                    </div>
                    <br/>

                    <div className="join-align">
                        <label>상세주소</label>
                    </div>
                    <div>
                        <input className="detailaddrbox" type='text' />
                    </div>
                    <button className="joinBtn">회원가입</button>
                    <br/>
                    <div className="dalin">
                    <Link to='/pro/signup/main'>
                    <a href="#">달인으로 가입하시나요 ?</a>
                    </Link>
                    </div>
                </form>
                <br/>
            </div>
        </div>
    );
};

export default Join;