import React, { useContext } from 'react';
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

    const email = localStorage.getItem('useremail');
    const phone = localStorage.getItem('userphone');
    const address = localStorage.getItem('useraddress');

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
                    <Link className='LinkTag' to="/mypage/account/private/update/phone">
                        <div className='EmailContainer'>
                            <h3 className="SubTitle">휴대전화 번호</h3>
                            <div className='MainContainer'>
                                <div className='Text'>
                                    {phone}
                                </div>
                                <div className='Button'>
                                    <input type="button" value="변경" />
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
                                    미인증
                                </div>
                                <div className='Button'>
                                    <input type="button" value="본인인증" />
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
                <hr />
                <div className='LinkTag' to="/mypage/account/private/email">
                    <div className='EmailContainer'>
                        <h3 className="SubTitle">이메일</h3>
                        <div className='MainContainer'>
                            <div>
                                {email && email.split(" ")[0] === "naver"
                                    ? "naver_email"
                                    : email && email.split(" ")[0] === "kakao"
                                        ? "kakao_email"
                                        : email && email.split(" ")[0] === "google"
                                            ? "google_email" :
                                            email}
                            </div>
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
                            <div>{address !== '' ? (address) : (
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