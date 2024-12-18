import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/mypage/Private.css';
import { MyPageContext } from '../../context/mypage/MyPageContext';

const Private = () => {
    const {
        nickname,
        setNickname,
        introduction,
        setIntroduction,
        isToggleWrap1Visible,
        setIsToggleWrap1Visible,
        isToggleWrap2Visible,
        toggleWrap1,
        toggleWrap2,
        loading,
        handleNicknameCancel,
        handleIntroductionCancel,
        setIsToggleWrap2Visible,
        handleNicknameSave,
        handleIntroductionSave,
        handleProfileImageChange,
        setProfileImage,
        profileImage,
        isProfileImageChanged,
        handleProfileBtnClick
    } = useContext(MyPageContext);

    const [email, setEmail] = useState(localStorage.getItem('useremail'));
    const [phone, setPhone] = useState(localStorage.getItem('userphone'));
    const [address, setAddress] = useState(localStorage.getItem('useraddress'));
    const [userno, setUserno] = useState(localStorage.getItem('userno'));

    useEffect(() => {
        const handleStorageChange = () => {
            setEmail(localStorage.getItem('useremail'));
            setPhone(localStorage.getItem('userphone'));
            setAddress(localStorage.getItem('useraddress'));
            setUserno(localStorage.getItem('userno'));
        };

        // storage 이벤트 리스너 등록
        window.addEventListener('storage', handleStorageChange);

        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // 빈 배열로 한 번만 실행되게 설정

    // SNS 이메일에 맞춰 이메일 출력 수정
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

    return (
        <div className='UserPrivateInfoPage'>
            <div className="UserPrivateInfoWrap">
                <div className='PageTitle'>
                    <Link className="prev" to="/mypage/account">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>개인 정보 관리</h1>
                </div>
                {phone !== "" ? (
                    <Link className='LinkTag' to="/mypage/account/private/phone">
                        <div className='EmailContainer'>
                            <h3 className="SubTitle">휴대전화 번호</h3>
                            <div className='MainContainer'>
                                <div className='Text'>
                                    {phone}
                                </div>
                                <div className="Link">
                                    <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <Link className='LinkTag' to="/mypage/account/private/phone">
                        <div className='EmailContainer'>
                            <h3 className="SubTitle">휴대전화 번호</h3>
                            <div className='MainContainer'>
                                <div className='Text'>
                                    번호를 입력해주세요
                                </div>
                                <div className="Link">
                                    <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
                <hr />
                <div className='LinkTag'>
                    <div className='EmailContainer'>
                        <h3 className="SubTitle">이메일</h3>
                        <div className='MainContainer'>
                            <div>{formatEmail(email)}</div> {/* 이메일 형식 처리 */}
                        </div>
                    </div>
                </div>

                <hr />
                <Link className='LinkTag' to="/mypage/account/private/password">
                    <div className='PasswordContainer'>
                        <h3 className="SubTitle">비밀번호</h3>
                        <div className='MainContainer'>
                            <div>•••••••</div>
                            <div className="Link">
                                <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                            </div>
                        </div>
                    </div>
                </Link>
                <hr />
                <Link className='LinkTag' to="/mypage/account/private/address">
                    <div className='AddressContainer'>
                        <h3 className="SubTitle">주소</h3>
                        <div className='MainContainer'>
                            <div>
                                {address ? (
                                    address === 'OAuth2-address' ? (
                                        <span style={{ color: "#727272" }}>새로운 주소를 입력해주세요</span>
                                    ) : (
                                        <span>{address}</span>
                                    )
                                ) : (
                                    <span style={{ color: "#727272" }}>주소를 입력해주세요</span>
                                )}
                            </div>
                            <div className="Link">
                                <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                            </div>
                        </div>
                    </div>
                </Link>
                <hr />
                <div className='functionContainer'>
                    <Link className='LinkTag2' to="/logout">로그아웃</Link>
                    <Link className='LinkTag2' to="/mypage/account/private/signout">회원탈퇴</Link>
                </div>
            </div>
        </div>
    );
};

export default Private;