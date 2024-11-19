import React from 'react';
import { Link } from 'react-router-dom';

const Private = () => {
    return (
        <div className='UserPrivateInfoPage'>
            <div className='PageTitle'>
                <Link to="/mypage/account"><img src="../../src/image/prev_icon.png" alt="prev"></img></Link>
                <h1>개인 정보 관리</h1>
            </div>
            <Link to="/mypage/account/private/phone">
                <div className='EmailContainer'>
                    <div className="SubTitle">휴대전화 번호</div>
                    <div>
                        <div>미인증</div>
                        <div>
                            <input type="button" value="본인인증이 필요해요" />
                        </div>
                    </div>
                </div>
            </Link>
            <hr />
            <Link to="/mypage/account/private/email">
                <div className='EmailContainer'>
                    <div className="SubTitle">이메일</div>
                    <div>
                        <div>moeego@moeego.com</div>
                        <div>
                            <div><img src="../../src/image/next_icon.png" alt="nextIcon" /></div>
                        </div>
                    </div>
                </div>
            </Link>
            <hr />
            <Link to="/mypage/account/private/password">
                <div className='PasswordContainer'>
                    <div className="SubTitle">비밀번호</div>
                    <div>
                        <div>•••••••</div>
                        <div>
                            <div><img src="../../src/image/next_icon.png" alt="nextIcon" /></div>
                        </div>
                    </div>
                </div>
            </Link>
            <hr />
            <Link to="/mypage/account/private/address">
                <div className='AddressContainer'>
                    <div className="SubTitle">주소</div>
                    <div>
                        <div>서울시 서대문구 홍제동 통일로39가길 57(홍제동, 현대아파트) 102동 902호</div>
                        <div>
                            <div><img src="../../src/image/next_icon.png" alt="nextIcon" /></div>
                        </div>
                    </div>
                </div>
            </Link>
            <hr />
            <div className='functionContainer'>
                <Link to="/mypage/account/private/logout">로그아웃</Link>
                <Link to="/mypage/account/private/signout">회원탈퇴</Link>
            </div>
        </div>
    );
};

export default Private;