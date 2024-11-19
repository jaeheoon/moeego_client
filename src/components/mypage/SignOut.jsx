import React from 'react';

const SignOut = () => {
    return (
        <div className='DeleteUserInfoPage'>
            <h1>회원탈퇴</h1>
            <form className='DeleteUserInfoForm'>
                <div className='DeleteUserInfoContainer'>
                    <div className="SubTitle">탈퇴사유</div>
                    <div>
                        <input type="text" placeholder='탈퇴사유를 입력해주세요' />
                    </div>
                </div>
                <hr />
                <div className='DeleteUserInfoContainer'>
                    <div className="SubTitle">비밀번호</div>
                    <div>
                        <input type="password" placeholder='비밀번호를 입력해주세요' />
                    </div>
                </div>
                <hr />
                <div className='DeleteUserInfoContainer'>
                    <div className="SubTitle">비밀번호 재입력</div>
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

export default SignOut;