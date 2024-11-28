import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/mypage/Account.css';

const Account = () => {
    const [isToggleWrap1Visible, setIsToggleWrap1Visible] = useState(false);
    const [isToggleWrap2Visible, setIsToggleWrap2Visible] = useState(false);

    const [nickname, setNickname] = useState('김달인'); // 닉네임 상태
    const [introduction, setIntroduction] = useState('저는 코딩/개발/디자인 달인입니다. 서울 지역에서 활동합니다.'); // 소개 상태

    const handleToggleWrap1 = () => {
        setIsToggleWrap1Visible((prevState) => !prevState);
    };

    const handleToggleWrap2 = () => {
        setIsToggleWrap2Visible((prevState) => !prevState);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleIntroductionChange = (e) => {
        setIntroduction(e.target.value);
    };

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
                        <img src="/image/profile.svg" alt="profile" />
                        <button>
                            <img src="/image/camera.png" alt="camera" />
                        </button>
                    </div>
                </div>
                <form className='NickNameForm'>
                    <div className='Container'>
                        <h3 className="SubTitle">모이고 활동명</h3>
                        <div>
                            {isToggleWrap1Visible ? (
                                <div className='Title'>
                                    <input type="text" value={nickname} onChange={handleNicknameChange} maxLength={20} />
                                </div>
                            ) : (
                                <div className='Title'>김달인</div>
                            )}
                            <div className="Button">
                                <input id='toggleBtn1' type="button" value="수정" onClick={handleToggleWrap1} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    {isToggleWrap1Visible && (
                        <div className='ToggleWrap' id='ToggleWrap1'>
                            <div>{nickname.length}/20</div>
                            <div className='ToggleButton'>
                                <input type="button" value="취소" />
                                <input type="button" value="저장하기" />
                            </div>
                        </div>
                    )}
                </form>
                <form className='IntroductionForm'>
                    <div className='Container'>
                        <h3 className="SubTitle">달인 소개</h3>
                        <div className='IntroductionWrap'>
                            {!isToggleWrap2Visible ? (
                                <div className='content'>저는 코딩/개발/디자인 달인입니다. 서울 지역에서 활동합니다.</div>
                            ) : (
                                <div className='content'>
                                    <textarea type="text" value={introduction} onChange={handleIntroductionChange} maxLength={50}></textarea>
                                </div>
                            )}
                            <div className='buttonwrap'>
                                <input type="button" id='toggleBtn2' value="수정" onClick={handleToggleWrap2} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    {isToggleWrap2Visible && (
                        <div className='ToggleWrap' id='ToggleWrap2'>
                            <div>{introduction.length}/50</div>
                            <div className='ToggleButton'>
                                <input type="button" value="취소" />
                                <input type="button" value="저장하기" />
                            </div>
                        </div>
                    )}
                </form>
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