import React from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
    return (
        <div className='UserInfoPage'>
            <div className='PageTitle'>
                <Link to="/mypage"><img src="../../src/image/prev_icon.png" alt="prev"></img></Link>
                <h1>계정 설정</h1>
            </div>
            <div className='ProfileImageContainer'>
                <div>
                    <img src="" alt="" />
                    <button>
                        <img src="" alt="" />
                    </button>
                </div>
            </div>
            <form className='NickNameForm'>
                <div>
                    <div className="SubTitle">모이고 활동명</div>
                    <div>
                        <div>김달인</div>
                        <div>
                            <input type="button" value="수정" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className='ToggleWrap1'>
                    <div>3/20</div>
                    <div>
                        <input type="button" value="취소" />
                        <input type="button" value="저장하기" />
                    </div>
                </div>
            </form>
            <form className='IntroductionForm'>
                <div>
                    <div className="SubTitle">달인 소개</div>
                    <div>
                        <div>저는 코딩/개발/디자인 달인입니다. 서울 지역에서 활동합니다.</div>
                        <div>
                            <input type="button" value="수정" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className='ToggleWrap2'>
                    <div>34/200</div>
                    <div>
                        <input type="button" value="취소" />
                        <input type="button" value="저장하기" />
                    </div>
                </div>
            </form>
            <div className='DetailInfoContainer'>
                <Link to="/mypage/account/private">
                    <div>개인정보관리</div>
                    <div><img src="../src/image/next_icon.png" alt="nextIcon" /></div>
                </Link>
            </div>
        </div>
    );
};

export default Account;