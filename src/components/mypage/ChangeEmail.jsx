import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/mypage/ChangeEmail.css";

const ChangeEmail = () => {
    return (
        <div className='ChangeEmailPage'>
            <div className='ChangeEmailWrap'>
                <div className='Title'>
                    <Link className="Link" to="/mypage/account/private"><img src="../../../src/image/prev_icon.png" alt="prev"></img></Link>
                    <h1>이메일 변경</h1>
                </div>
                <form className='ChangeEmailForm'>
                    <div className='ChangeEmailContainer'>
                        <h3 className="SubTitle">이메일</h3>
                        <div className="EmailWrap">
                            <input type="email" name="email" id="email" placeholder='이메일을 입력해주세요' />
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

export default ChangeEmail;