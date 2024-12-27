import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignOutContext } from '../../context/mypage/SignOutContext';
import "../../css/mypage/SignOut.css";

const SignOut = () => {
    const {
        reason,
        setReason,
        pwd,
        setPwd,
        errorMessage,
        setErrorMessage,
        handleSignOut
    } = useContext(SignOutContext);

    const [email, setEmail] = useState(localStorage.getItem('useremail')); // 사용자 이메일
    const [userno, setUserno] = useState(localStorage.getItem('userno'));
    const [isSocialUser, setIsSocialUser] = useState(false); // SNS 사용자인지 확인

    // 이메일 형식 포맷팅 함수
    const formatEmail = (email) => {
        if (!email) return "이메일 정보 없음";

        const platform = email.split(" ")[0]; // 이메일 앞부분 (SNS 플랫폼 정보)

        switch (platform) {
            case 'naver':
                return `naver_user${userno}`;
            case 'kakao':
                return `kakao_user${userno}`;
            case 'google':
                return `google_user${userno}`;
            default:
                return email; // SNS 계정이 아닐 경우, 원래 이메일 그대로 표시
        }
    };

    // 페이지 로딩 시 실행
    useEffect(() => {
        const formattedEmail = formatEmail(email); // 이메일 포맷팅

        // SNS 계정 여부 확인
        if (
            formattedEmail.startsWith("naver") ||
            formattedEmail.startsWith("kakao") ||
            formattedEmail.startsWith("google")
        ) {
            setIsSocialUser(true); // SNS 사용자인 경우 상태를 true로 설정
            setPwd("OAuth2"); // SNS 사용자는 비밀번호를 "OAuth2"로 고정
        } else {
            setIsSocialUser(false); // 일반 계정
        }
    }, [email]); // email이 변경될 때마다 실행

    return (
        <div className='DeleteUserInfoPage'>
            <div className='DeleteUserWrap'>
                <div className='PageTitle'>
                    <Link className='prev' to="/mypage/account/private">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>회원탈퇴</h1>
                </div>
                <form className='DeleteUserInfoForm'>
                    <div className='DeleteUserInfoContainer'>
                        <h3 className="SubTitle">탈퇴사유</h3>
                        <div>
                            <textarea
                                value={reason} onChange={(e) => setReason(e.target.value)}
                                type="textarea" maxLength='50' placeholder='탈퇴사유를 입력해주세요(50자이내)' />
                        </div>
                        {errorMessage.reason && (
                            <div className="error-message">
                                <span>{errorMessage.reason}</span>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className='DeleteUserInfoContainer'>
                        <h3 className="SubTitle">비밀번호</h3>
                        <div>
                            <input
                                value={pwd} onChange={(e) => setPwd(e.target.value)}
                                type="password" placeholder='비밀번호를 입력해주세요'
                                readOnly={isSocialUser} // SNS 사용자인 경우 읽기 전용
                                style={{
                                    backgroundColor: isSocialUser ? '#f5f5f5' : 'white',
                                    cursor: isSocialUser ? 'not-allowed' : 'text'
                                }} // 읽기 전용 스타일 추가
                            />
                        </div>
                        {errorMessage.pwd && (
                            <div className="error-message">
                                <span>{errorMessage.pwd}</span>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className='ButtonContainer'>
                        <input type="button" value="취소"
                            onClick={() => {
                                setReason('');
                                setPwd('');
                                setErrorMessage({ reason: '', pwd: '' });
                            }} />
                        <input type="button" value="탈퇴하기"
                            onClick={handleSignOut} />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignOut;

