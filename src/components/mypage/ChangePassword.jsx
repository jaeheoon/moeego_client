import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/mypage/ChangePassword.css"

const ChangePassword = () => {
    return (
        <div className='ChangePasswordPage'>
            <div className='ChangePasswordWrap'>
                <div className='PageTitle'>
                    <Link className='prev' to="/mypage/account/private">
                        <img src="../../../src/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>비밀번호 변경</h1>
                </div>
                <form className='ChangePasswordForm'>
                    <div className='ChangePasswordContainer'>
                        <h3 className="SubTitle">기존 비밀번호</h3>
                        <div>
                            <input type="password" placeholder='현재 비밀번호를 입력해주세요' />
                        </div>
                    </div>
                    <hr />
                    <div className='ChangePasswordContainer'>
                        <h3 className="SubTitle">새로운 비밀번호</h3>
                        <div>
                            <input type="password" placeholder='비밀번호를 입력해주세요' />
                        </div>
                    </div>
                    <hr />
                    <div className='ChangePasswordContainer'>
                        <h3 className="SubTitle">새로운 비밀번호 확인</h3>
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

export default ChangePassword;