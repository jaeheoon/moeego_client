import React from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    return (
        <div>
            <div id="join_container">
                <div>
                    <h1>MoeeGo에 오신 것을 환영합니다.</h1>
                </div>
                <form>
                    <div>
                        <label>이름</label>
                        <input type="text" placeholder='이름(실명)을 입력해주세요.'></input>
                    </div>
                    {/* 유효성검사
                    <div>
                        <p>이름을 입력해주세요.</p>
                    </div>
                     */}
                    <div>
                        <div>
                            <span>타인 명의로 가입 시 계정이 정지되고 재가입이 불가능합니다.</span>
                        </div>
                    </div>
                    <div>
                        <lable>이메일</lable>
                    </div>
                    <div>
                        <input type='text' placeholder='MoeeGo@example.com' />
                    </div>
                    {/* 유효성검사
                    <div>
                        <p>이메일 주소를 입력해주세요.</p>
                    </div>
                     */}
                    <div>
                        <lable>비밀번호</lable>
                    </div>
                    <div>
                        <input type='password' placeholder='비밀번호를 입력해 주세요.' />
                    </div>
                    {/* 유효성검사
                    <div>
                        <p>비밀번호를 입력해 주세요.</p>
                    </div>
                     */}
                    <div>
                        <lable>비밀번호 확인</lable>
                    </div>
                    <div>
                        <input type='password' />
                        {/* <div>
                            <p>비밀번호가 일치하지 않습니다.</p>
                        </div> */}
                    </div>
                    <div>
                        <label>성별</label>
                        <div>
                            <span><div class="radio">남자</div></span>
                            <span><div class="radio">여자</div></span>
                        </div>
                    </div>
                    <div>
                        <label>휴대전화 번호</label>
                    </div>
                    <div>
                        <input type='text' placeholder='예)010-1234-5678' />
                    </div>
                    <div>
                        <button>인증번호 발송</button>
                    </div>
                    <div>
                        <label>인증번호 입력</label>
                    </div>
                    <div>
                        <input type='text' />
                        <button>확인</button>
                    </div>
                    <div>
                        <label>우편번호</label>
                    </div>
                    <div>
                        <input type='text' />
                        <button>우편번호 검색</button>
                    </div>
                    <div>
                        <label>주소</label>
                    </div>
                    <div>
                        <input type='text' />
                    </div>
                    <div>
                        <label>상세주소</label>
                    </div>
                    <div>
                        <input type='text' />
                    </div>
                    <button>회원가입</button>
                </form>
                <Link to='/pro/signup/main'><p>고수로 가입하시나요 ?</p></Link>
            </div>
        </div>
    );
};

export default Join;