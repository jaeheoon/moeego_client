import React from 'react';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
    return (
        <div className='ChangePasswordPage'>
            <div className='PageTitle'>
                <Link to="/mypage/account/private"><img src="../../../src/image/prev_icon.png" alt="prev"></img></Link>
                <h1>비밀번호 변경</h1>
            </div>
            <form className='ChangePasswordForm'>
                <div className='ChangePasswordContainer'>
                    <div className="SubTitle">기존 비밀번호</div>
                    <div>
                        <input type="password" placeholder='현재 비밀번호를 입력해주세요' />
                    </div>
                </div>
                <hr />
                <div className='ChangePasswordContainer'>
                    <div className="SubTitle">새로운 비밀번호</div>
                    <div>
                        <input type="password" placeholder='비밀번호를 입력해주세요' />
                    </div>
                </div>
                <hr />
                <div className='ChangePasswordContainer'>
                    <div className="SubTitle">새로운 비밀번호 확인</div>
                    <div>
                        <input type="password" placeholder='비밀번호를 한번 더 입력해주세요' />
                    </div>
                </div>
                <hr />
                <div className='ButtonContainer'>
                    <div>
                        <input type="button" value="취소" />
                        <input type="button" value="변경완료" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;