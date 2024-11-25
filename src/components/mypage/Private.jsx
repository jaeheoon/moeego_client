import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/mypage/Private.css';

const Private = () => {
    return (
        <div className='UserPrivateInfoPage'>
            <div className="UserPrivateInfoWrap">
                <div className='PageTitle'>
                    <Link className="prev" to="/mypage/account">
                        <img src="../../src/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>개인 정보 관리</h1>
                </div>
                <Link className='LinkTag' to="/mypage/account/private/phone">
                    <div className='EmailContainer'>
                        <h3 className="SubTitle">휴대전화 번호</h3>
                        <div className='MainContainer'>
                            <div className='Text'>미인증</div>
                            <div className='Button'>
                                <input type="button" value="본인인증이 필요해요" />
                            </div>
                        </div>
                    </div>
                </Link>
                <hr />
                <Link className='LinkTag' to="/mypage/account/private/email">
                    <div className='EmailContainer'>
                        <h3 className="SubTitle">이메일</h3>
                        <div className='MainContainer'>
                            <div>moeego@moeego.com</div>
                            <div className="Link">
                                <div className='next'><img src="../../src/image/next_icon.png" alt="nextIcon" /></div>
                            </div>
                        </div>
                    </div>
                </Link>
                <hr />
                <Link className='LinkTag' to="/mypage/account/private/password">
                    <div className='PasswordContainer'>
                        <h3 className="SubTitle">비밀번호</h3>
                        <div className='MainContainer'>
                            <div>•••••••</div>
                            <div className="Link">
                                <div className='next'><img src="../../src/image/next_icon.png" alt="nextIcon" /></div>
                            </div>
                        </div>
                    </div>
                </Link>
                <hr />
                <Link className='LinkTag' to="/mypage/account/private/address">
                    <div className='AddressContainer'>
                        <h3 className="SubTitle">주소</h3>
                        <div className='MainContainer'>
                            <div>서울시 서대문구 홍제동 통일로39가길 57(홍제동, 현대아파트) 102동 902호</div>
                            <div className="Link">
                                <div className='next'><img src="../../src/image/next_icon.png" alt="nextIcon" /></div>
                            </div>
                        </div>
                    </div>
                </Link>
                <hr />
                <div className='functionContainer'>
                    <Link className='LinkTag2' to="/mypage/account/private/logout">로그아웃</Link>
                    <Link className='LinkTag2' to="/mypage/account/private/signout">회원탈퇴</Link>
                </div>
            </div>
        </div>
    );
};

export default Private;