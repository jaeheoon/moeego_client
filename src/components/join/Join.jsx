import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignUpContext } from '../../context/member/SignUpContext';
import "../../css/join/Join.css";

const Join = () => {
    const {
        signup,
        errors,
        isReadonly,
        updateSignUpData,
        handleAddressSearch,
        submitSignupForm,
        checkEmailDuplication,
        isEmailChecked,
    } = useContext(SignUpContext);

    useEffect(() => {
        const scriptSrc = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
            const script = document.createElement("script");
            script.src = scriptSrc;
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const handleJoinClick = async () => {
        await submitSignupForm();
    };

    return (
        <div className="JoinPage">
            <div id="join_container">
                <h1>모이고에 오신 것을 환영합니다.</h1>
                <form id="joinForm" className="joinbox">
                    {/* 이름 입력 */}
                    <div className="join-align">
                        <label>이름</label>
                        <input
                            className="namebox"
                            type="text"
                            placeholder="이름(실명)을 입력해주세요"
                            value={signup.name}
                            maxLength={6}
                            onChange={(e) => updateSignUpData('name', e.target.value)}
                        />
                    </div>
                    <div className='errorWrap'>
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    {/* 이메일 입력 */}
                    <div className="join-align">
                        <label>이메일</label>
                        <input
                            className="emailbox"
                            type="email"
                            placeholder="moeego@example.com"
                            value={signup.email}
                            onChange={(e) => updateSignUpData('email', e.target.value)}
                            onBlur={checkEmailDuplication} // blur 이벤트로 중복 체크 실행
                        />
                    </div>
                    <div className='errorWrap'>
                        {errors.email && <span className={isEmailChecked ? "success" : "error"}>{errors.email}</span>}
                    </div>
                    {/* 비밀번호 입력 */}
                    <div className="join-align">
                        <label>비밀번호</label>
                        <input
                            className="pwdbox"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            autoComplete="off"
                            value={signup.pwd}
                            maxLength={20}
                            onChange={(e) => updateSignUpData('pwd', e.target.value)}
                        />
                    </div>

                    <div className='errorWrap'>
                        {errors.pwd && <span className="error">{errors.pwd}</span>}
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="join-align">
                        <label>비밀번호 확인</label>
                        <input
                            className="repwdbox"
                            type="password"
                            placeholder="비밀번호를 한번 더 입력해주세요"
                            autoComplete="off"
                            value={signup.confirmpwd}
                            onChange={(e) => updateSignUpData('confirmpwd', e.target.value)}
                        />
                    </div>

                    <div className='errorWrap'>
                        {errors.confirmpwd && <span className="error">{errors.confirmpwd}</span>}
                    </div>
                    {/* 성별 선택 */}
                    <div className="join-align">
                        <label>성별</label>
                        <div className="select">
                            <input
                                type="radio"
                                value="M"
                                id="m"
                                name="gender"
                                checked={signup.gender === 'M'}
                                onChange={(e) => updateSignUpData('gender', e.target.value)}
                            />
                            <label htmlFor="m">남자</label>
                            <input
                                type="radio"
                                value="F"
                                id="w"
                                name="gender"
                                checked={signup.gender === 'F'}
                                onChange={(e) => updateSignUpData('gender', e.target.value)}
                            />
                            <label htmlFor="w">여자</label>
                        </div>
                    </div>

                    <div className='errorWrap'>
                        {errors.gender && <span className="error">{errors.gender}</span>}
                    </div>

                    {/* 휴대전화 번호 */}
                    <div className="join-align">
                        <label>휴대전화 번호</label>
                        <input
                            className="phonebox"
                            type="text"
                            placeholder="010-0000-0000"
                            value={signup.phone}
                            onChange={(e) => updateSignUpData('phone', e.target.value)}
                        />
                    </div>
                    <div className='errorWrap'>
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className='join-align'>
                        <input
                            type="button"
                            className="checkBtn"
                            value="인증번호 발송"
                            onClick={() => { /* 인증번호 발송 처리 로직 */ }}
                        />
                    </div>

                    {/* 우편번호 입력 */}
                    <div className="join-align">
                        <label>우편번호</label>
                    </div>
                    <div className='zip-box'>
                        <input
                            className="zipcodebox"
                            id="zipcode"
                            name="zipcode"
                            type="text"
                            placeholder="우편번호"
                            value={signup.zipcode}
                            readOnly={isReadonly.zipcode}
                            onChange={(e) => updateSignUpData("zipcode", e.target.value)}
                        />
                        <input
                            type="button"
                            className="zipcheckBtn"
                            value="우편번호"
                            onClick={handleAddressSearch}
                        />
                    </div>

                    <div className='errorWrap'>
                        {errors.zipcode && <span className="error">{errors.zipcode}</span>}
                    </div>

                    {/* 주소 입력 */}
                    <div className="join-align">
                        <label>주소</label>
                        <input
                            className="addrbox"
                            id="addr1"
                            name="addr1"
                            type="text"
                            placeholder="주소"
                            value={signup.address1}
                            readOnly={isReadonly.address1}
                            onChange={(e) => updateSignUpData('address1', e.target.value)}
                        />
                    </div>

                    <div className='errorWrap'>
                        {errors.address1 && <span className="error">{errors.address1}</span>}
                    </div>

                    <div className="join-align">
                        <label>상세주소</label>
                        <input
                            className="detailaddrbox"
                            id="addr2"
                            name="addr2"
                            type="text"
                            placeholder="상세주소"
                            value={signup.address2}
                            onChange={(e) => updateSignUpData('address2', e.target.value)}
                        />
                    </div>

                    <div className='errorWrap'>
                        {errors.address2 && <span className="error">{errors.address2}</span>}
                    </div>

                    {/* 회원가입 버튼 */}
                    <input
                        type="button"
                        className="joinBtn"
                        value="회원가입"
                        onClick={handleJoinClick}
                    />
                    <div className="dalin">
                        <Link to="/pro/signup/main">달인으로 가입하시나요?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Join;
