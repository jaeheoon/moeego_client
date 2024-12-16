import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/mypage/MyPage.css';
import { AuthContext } from '../../context/member/AuthContext';
import { MyPageContext } from '../../context/mypage/MyPageContext';

const MyPage = () => {
    const { isLoggedIn, loginUser, loginEmail, loginProfile } = useContext(AuthContext);

    const [userno, setUserno] = useState(localStorage.getItem('userno') || ''); // 초기값 설정
    const [userprofile, setUserProfile] = useState(localStorage.getItem('userprofile') || ''); // 초기값 설정

    // 로컬 스토리지의 userno 변경 감지
    useEffect(() => {
        const handleStorageChange = () => {
            const newUserno = localStorage.getItem('userno');
            setUserno(newUserno || ''); // 값이 없을 경우 빈 문자열로 설정
            setUserProfile(localStorage.getItem('userprofile') || '');
        };

        // localStorage 이벤트 리스너 등록
        window.addEventListener('storage', handleStorageChange);

        // 초기 userno 값 설정
        handleStorageChange();

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // SNS 프로필 이미지 및 이메일 변환 함수
    const getSNSProfile = (email) => {
        const platform = email?.split(" ")[0];
        switch (platform) {
            case 'naver':
                return { img: "/image/naver_sns.png", email: `naver_user${userno}` };
            case 'kakao':
                return { img: "/image/kakao_sns.png", email: `kakao_user${userno}` };
            case 'google':
                return { img: "/image/google_sns.svg", email: `google_user${userno}` };
            default:
                return { img: "/image/moeego_login.png", email };
        }
    };

    const snsProfile = getSNSProfile(loginEmail);

    return (
        <div className='MyPage'>
            <div className='MyPageWrap'>
                <h1>마이페이지</h1>
                <div className='ProfileContainer'>
                    <Link to='/mypage/account' className='ProfileSettingPage'>
                        <div className='TopWrap'>
                            <div className='ProfileImage'>
                                <img
                                    className='loginProfileImg'
                                    src={userprofile || "/image/default.svg"} // 기본 프로필 이미지 처리
                                    alt="profile"
                                />  {/* 프로필 이미지 표시 */}
                            </div>
                            <div className='ProfileInfo'>
                                <div className='NickName'>{loginUser}님</div>
                                <div className='MailWrap'>
                                    <div className="SNSWrap">
                                        <img
                                            className='snsProfile'
                                            src={snsProfile.img}
                                            alt="SNS"
                                        />
                                    </div>
                                    <div className='Email'>{snsProfile.email}</div>
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