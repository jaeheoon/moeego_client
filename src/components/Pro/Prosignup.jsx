import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import checkPost from '../../js/daumpost';
import "../../css/join/Join.css";

const Projoin = () => {

    useEffect(() => {
        const scriptSrc = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            document.body.appendChild(script);

            // Cleanup: 스크립트 제거
            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    return (
        <div className="JoinPage">
            <div id="join_container">
                <h1>MoeeGo에 오신 것을 환영합니다.</h1>
                <form id="joinForm" className="joinbox">
                    <div className="join-align">
                        <label>이름</label>
                    </div>
                    <div>
                        <input className="namebox" type="text" placeholder='이름(실명)을 입력해주세요' />
                    </div>
                    <div className="join-align">
                        <span id="warn">타인 명의로 가입 시 계정이 정지되고 재가입이 불가능합니다.</span>
                    </div>
                    <div id="nameDiv"></div>

                    <div className="join-align">
                        <label>이메일</label>
                    </div>
                    <div>
                        <input className="emailbox" type='email' placeholder='moeego@example.com' />
                    </div>
                    <div id="emailDiv"></div>

                    <div className="join-align">
                        <label>비밀번호</label>
                    </div>
                    <div>
                        <input className="pwdbox" type='password' placeholder='비밀번호를 입력해주세요' />
                    </div>
                    <div id="pwdDiv"></div>

                    <div className="join-align">
                        <label>비밀번호 확인</label>
                    </div>
                    <div>
                        <input className="repwdbox" type='password' placeholder='비밀번호를 한번 더 입력해주세요' />
                    </div>
                    <div id="repwdDiv"></div>

                    <div className="join-align">
                        <label>성별</label>
                        <div className="select">
                            <input type="radio" value="M" id="m" name="gender" /><label htmlFor="m">남자</label>
                            <input type="radio" value="F" id="w" name="gender" /><label htmlFor="w">여자</label>
                        </div>
                    </div>

                    <div className="join-align">
                        <label>휴대전화 번호</label>
                    </div>
                    <div>
                        <input className="phonebox" type='text' placeholder='010-1234-5678' />
                    </div>
                    <div>
                        <input type="button" className="checkBtn" value='인증번호 발송' />
                    </div>

                    <div className="join-align">
                        <label>인증번호 입력</label>
                        <div className='join-align-inside'>
                            <input className="checknumbox" type='text' placeholder='인증번호' />
                            <input type="button" className="checknumBtn" value="확인" />
                        </div>
                    </div>

                    <div className="join-align"><label>우편번호</label></div>
                    <div>
                        <input className="zipcodebox" id="zipcode" name="zipcode" type='text' placeholder='우편번호' readOnly />
                        <input type="button" className="zipcheckBtn" value="우편번호 검색" onClick={() => checkPost("zipcode", "addr1", "addr2")} />
                    </div>

                    <div className="join-align">
                        <label>주소</label>
                    </div>
                    <div>
                        <input className="addrbox" id="addr1" name="addr1" type='text' placeholder='주소' readOnly />
                    </div>

                    <div className="join-align">
                        <label>상세주소</label>
                    </div>
                    <div>
                        <input className="detailaddrbox" id="addr2" name="addr2" type='text' placeholder='상세주소' />
                    </div>

                    <input type="button" className="joinBtn" value="회원가입" />
                </form>
            </div >
        </div >
    );
};

export default Projoin;