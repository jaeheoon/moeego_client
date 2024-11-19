import React from 'react';
import { Link } from 'react-router-dom';

const ChangeEmail = () => {
    return (
        <div className='ChangeEmailPage'>
            <div className='PageTitle'>
                <Link to="/mypage/account/private"><img src="../../../src/image/prev_icon.png" alt="prev"></img></Link>
                <h1>이메일 변경</h1>
            </div>
            <form className='ChangeEmailForm'>
                <div className='ChangeEmailContainer'>
                    <div className="SubTitle">이메일</div>
                    <div>
                        <input type="email" placeholder='이메일을 입력해주세요' />
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

export default ChangeEmail;