import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/mypage/SignOut.css"

const SignOut = () => {
    return (
        <div className='DeleteUserInfoPage'>
            <div className='DeleteUserWrap'>
                <div className='PageTitle'>
                    <Link className='prev' to="/mypage/account/private">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>회원탈퇴</h1>
                </div>
                <form className='DeleteUserInfoForm'>
                    <div className='DeleteUserInfoContainer'>
                        <h3 className="SubTitle">탈퇴사유</h3>
                        <div>
                            <textarea type="textarea" maxLength='80' placeholder='탈퇴사유를 입력해주세요(80자이내)' />
                            {/* <input type="text" placeholder='탈퇴사유를 입력해주세요' /> */}
                        </div>
                    </div>
                    <hr />
                    <div className='DeleteUserInfoContainer'>
                        <h3 className="SubTitle">비밀번호</h3>
                        <div>
                            <input type="password" placeholder='비밀번호를 입력해주세요' />
                        </div>
                    </div>
                    <hr />
                    <div className='DeleteUserInfoContainer'>
                        <h3 className="SubTitle">비밀번호 재입력</h3>
                        <div>
                            <input type="password" placeholder='비밀번호를 한번 더 입력해주세요' />
                        </div>
                    </div>
                    <hr />
                    <div className='ButtonContainer'>
                            <input type="button" value="취소" />
                            <input type="button" value="변경완료" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignOut;