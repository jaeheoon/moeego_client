import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/mypage/Account.css';

const Account = () => {
    return (
        <div className='UserInfoPage'>
            <div className='UserInfoWrap'>
                <div className='PageTitle'>
                    <Link className="Link" to="/mypage">
                        <div className='prev'><img src="../../src/image/prev_icon.png" alt="prev"></img></div>
                    </Link>
                    <h1>계정 설정</h1>
                </div>
                <div className='ProfileImageContainer'>
                    <div className="imgWrap">
                        <img src="../../src/image/profile_default.png" alt="default" />
                        <button>
                            <img src="../../src/image/camera.png" alt="camera" />
                        </button>
                    </div>
                </div>
                <form className='NickNameForm'>
                    <div className='Container'>
                        <h3 className="SubTitle">모이고 활동명</h3>
                        <div>
                            <div className='Title'>김달인</div>
                            <div className="Button">
                                <input type="button" value="수정" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='ToggleWrap'>
                        <div>3/20</div>
                        <div className='ToggleButton'>
                            <input type="button" value="취소" />
                            <input type="button" value="저장하기" />
                        </div>
                    </div>
                </form>
                <form className='IntroductionForm'>
                    <div className='Container'>
                        <h3 className="SubTitle">달인 소개</h3>
                        <div className='IntroductionWrap'>
                            <div className='content'>저는 코딩/개발/디자인 달인입니다. 서울 지역에서 활동합니다.</div>
                            <div className='buttonwrap'>
                                <input type="button" value="수정" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='ToggleWrap'>
                        <div>34/200</div>
                        <div className='ToggleButton'>
                            <input type="button" value="취소" />
                            <input type="button" value="저장하기" />
                        </div>
                    </div>
                </form>
                <div className='DetailInfoContainer'>
                    <Link className="Link" to="/mypage/account/private">
                        <h3 className='Title'>개인정보관리</h3>
                        <div className='next'><img src="../src/image/next_icon.png" alt="nextIcon" /></div>
                    </Link>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Account;