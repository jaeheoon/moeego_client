import React, { useContext, useEffect, useState } from 'react';
import { MyPageContext } from '../../context/mypage/MyPageContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/member/AuthContext';
import apiAxios from '../../api/apiAxios';
import '../../css/mypage/Account.css';

const Account = () => {
    const { loginStatus } = useContext(AuthContext); // 필요한 데이터만 destructuring
    const {
        nickname,
        setNickname,
        isToggleWrap1Visible,
        setIsToggleWrap1Visible,
        setIsToggleWrap2Visible,
        toggleWrap1,
        isToggleWrap2Visible,
        toggleWrap2,
        handleNicknameCancel,
        introduction,
        setIntroduction,
        handleIntroductionCancel,
        handleNicknameSave,
        handleIntroductionSave,
        handleProfileImageChange,
        profileImage,
        handleProfileBtnClick,
        setOneintroduction,
        oneintroduction,
    } = useContext(MyPageContext);

    const [profile, setProfile] = useState('');
    const [userno, setUserno] = useState(localStorage.getItem('userno'));
    const [name, setName] = useState('');
    const [email, setEmail] = useState(localStorage.getItem('useremail'));
    const [isSocialUser, setIsSocialUser] = useState(false); // SNS 사용자 여부 상태 추가

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

    // 상태 초기화 및 SNS 사용자 여부 확인
    useEffect(() => {
        setProfile(localStorage.getItem('userprofile') || '/image/default.svg');
        setName(localStorage.getItem('username') || '사용자 이름');

        const formattedEmail = formatEmail(email); // 이메일 포맷팅
        if (formattedEmail.startsWith("naver") || formattedEmail.startsWith("kakao") || formattedEmail.startsWith("google")) {
            setIsSocialUser(true); // SNS 사용자인 경우 상태를 true로 설정
        } else {
            setIsSocialUser(false); // 일반 사용자
        }
    }, [profile, name, email]);

    const handleNicknameChange = (e) => setNickname(e.target.value);

    return (
        <div className='UserInfoPage'>
            <div className='UserInfoWrap'>
                <div className='PageTitle'>
                    <Link className="prev" to="/mypage">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>계정 설정</h1>
                </div>
                <div className='ProfileImageContainer'>
                    <div className="imgWrap">
                        <img className='loginProfileImg' src={profile} alt="profile" />
                        <button id='profileBtn' onClick={handleProfileBtnClick} disabled={isSocialUser}>
                            <img src="/image/camera.png" alt="camera" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleProfileImageChange}
                            id="fileInput"
                            disabled={isSocialUser} // SNS 사용자는 프로필 사진 변경 불가
                        />
                    </div>
                </div>
                <form className='NickNameForm'>
                    <div className='Container'>
                        <h3 className="SubTitle">모이고 활동명</h3>
                        <div>
                            {isToggleWrap1Visible ? (
                                <div className='Title'>
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={handleNicknameChange}
                                        maxLength={8}
                                        disabled={isSocialUser} // SNS 사용자는 활동명 변경 불가
                                    />
                                </div>
                            ) : (
                                <div className='Title'>{name}</div>
                            )}
                            <div className="Button">
                                <input
                                    id='toggleBtn1'
                                    type="button"
                                    value="수정"
                                    onClick={() => { handleNicknameCancel(); toggleWrap1(); }}
                                    disabled={isSocialUser} // SNS 사용자는 수정 불가
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    {isToggleWrap1Visible && (
                        <div className='ToggleWrap' id='ToggleWrap1'>
                            <div>{nickname.length}/8</div>
                            <div className='ToggleButton'>
                                <input
                                    type="button"
                                    value="취소"
                                    onClick={() => { handleNicknameCancel(); setIsToggleWrap1Visible(false); }}
                                    disabled={isSocialUser}
                                />
                                <input
                                    type="button"
                                    value="저장하기"
                                    onClick={() => { handleNicknameSave(); }}
                                    disabled={isSocialUser}
                                />
                            </div>
                        </div>
                    )}
                </form>
                {loginStatus !== 'ROLE_PRO' || (
                    <form className='IntroductionForm'>
                        <div className='Container'>
                            <h3 className="SubTitle">달인 관리</h3>
                            <Link className="IntroductionWrap2" to="/pro/intro">
                                <div className='title'>
                                    달인 소개
                                </div>
                                <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                            </Link>
                            <br />
                            <Link className="IntroductionWrap2" to="/pro/serviceintro">
                                <div className='title'>
                                    서비스 소개
                                </div>
                                <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                            </Link>
                        </div>
                        <hr />
                        {isToggleWrap2Visible && (
                            <div className='ToggleWrap' id='ToggleWrap2'>
                                <div>{introduction.length}/50</div>
                                <div className='ToggleButton'>
                                    <input
                                        type="button"
                                        value="취소"
                                        onClick={() => { handleIntroductionCancel(); setIsToggleWrap2Visible(false); }}
                                        disabled={isSocialUser}
                                    />
                                    <input
                                        type="button"
                                        value="저장하기"
                                        onClick={() => { handleIntroductionSave(); }}
                                        disabled={isSocialUser}
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                )}
                <div className='DetailInfoContainer'>
                    <Link className="Link" to="/mypage/account/private">
                        <h3 className='Title'>개인정보관리</h3>
                        <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                    </Link>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Account;
