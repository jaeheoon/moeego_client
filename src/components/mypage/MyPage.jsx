import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../css/mypage/MyPage.css';
import {AuthContext} from '../../context/member/AuthContext';

const MyPage = () => {
    const {isLoggedIn, loginUser, loginEmail} = useContext(AuthContext);

    return (
        <div className='MyPage'>
            <div className='MyPageWrap'>
                <h1>마이페이지</h1>
                <div className='ProfileContainer'>
                    <Link to='/mypage/account' className='ProfileSettingPage'>
                        <div className='TopWrap'>
                            <div className='ProfileImage'>
                                <img src="/image/profile.svg" alt="profile" />
                            </div>
                            <div className='ProfileInfo'>
                                <div className='NickName'>{loginUser} 고객님</div>
                                <div className='MailWrap'>
                                    <div className="SNSWrap"><img src="/image/naver_sns.png" alt="naver" /></div>
                                    <div className='Email'>{loginEmail}</div>
                                </div>
                            </div>
                        </div>
                        <div className='ProfileButton'>
                            <input type="button" value="계정설정" />
                        </div>
                    </Link>
                </div>
                <hr />

                <div className='Container'>
                    <h3>달인찾기</h3>
                    <div>
                        <Link to='/mypage/likepro' className='Link'>
                            <div className="Title">찜한 달인</div>
                            <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                        </Link>
                    </div>
                </div>
                <hr />

                <div className='Container'>
                    <h3>모이고 활동내역</h3>
                    <div>
                        <Link to='/mypage/reservation' className='Link'>
                            <div className="Title">모이고 예약 내역</div>
                            <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                        </Link>
                        <br />
                        <Link to='/mypage/review' className='Link'>
                            <div className="Title">모이고 리뷰 내역</div>
                            <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                        </Link>
                    </div>
                </div>
                <hr />

                <div className='Container'>
                    <h3>커뮤니티</h3>
                    <div>
                        <Link to='/mypage/myhistory' className='Link'>
                            <div className="Title">커뮤니티 작성 글/댓글</div>
                            <div className='next'><img src="/image/next_icon.png" alt="nextIcon" /></div>
                        </Link>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default MyPage;