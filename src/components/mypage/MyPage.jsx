import React from 'react';
import { Link } from 'react-router-dom';
// import '../../css/mypage/MyPage.css';

const MyPage = () => {
    return (
        <div className='MyPage'>
            <h1>마이페이지</h1>
            <div className='ProfileContainer'>
                <Link to='/mypage/account' className='ProfileSettingPage'>
                    <div className='ProfileImage'>
                        <img src="" alt="" />
                    </div>
                    <div className='ProfileInfo'>
                        <div>ooo 고객님</div>
                        <div><img src="" alt="" /></div>
                        <div>moeego@moeego.com</div>
                    </div>
                    <div className='ProfileButton'>
                        <input type="button" value="계정설정" />
                    </div>
                </Link>
            </div>
            <hr />

            <div className='SearchProContainer'>
                <h3>달인찾기</h3>
                <div>
                    <Link to='/mypage/likepro' className='SearchProLink'>
                        <div>찜한 달인</div>
                        <div><img src="./src/image/next_icon.png" alt="nextIcon" /></div>
                    </Link>
                </div>
            </div>
            <hr />

            <div className='ActivityDetailsContainer'>
                <h3>모이고 활동내역</h3>
                <div>
                    <Link to='/mypage/reservation' className='ActivityDetailsLink'>
                        <div>모이고 예약 내역</div>
                        <div><img src="./src/image/next_icon.png" alt="nextIcon" /></div>
                    </Link>
                    <Link to='' className='MyReviewsLink'>
                        <div>모이고 리뷰 내역</div>
                        <div><img src="./src/image/next_icon.png" alt="nextIcon" /></div>
                    </Link>
                </div>
            </div>
            <hr />

            <div className='ArticleHistoryContainer'>
                <h3>커뮤니티</h3>
                <div>
                    <Link to='/mypage/myhistory' className='ArticleHistoryLink'>
                        <div>커뮤니티 작성 글/댓글</div>
                        <div><img src="./src/image/next_icon.png" alt="nextIcon" /></div>
                    </Link>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default MyPage;