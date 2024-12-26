import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SignOutContext } from '../../context/mypage/SignOutContext';
import "../../css/mypage/SignOut.css"

const SignOut = () => {
    const {
        reason,
        setReason,
        pwd,
        setPwd,
        errorMessage,
        setErrorMessage,
        handleSignOut
    } = useContext(SignOutContext);

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
                            <textarea
                                value={reason} onChange={(e) => setReason(e.target.value)}
                                type="textarea" maxLength='50' placeholder='탈퇴사유를 입력해주세요(50자이내)' />
                        </div>
                        {errorMessage.reason && (
                            <div className="error-message">
                                <span>{errorMessage.reason}</span>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className='DeleteUserInfoContainer'>
                        <h3 className="SubTitle">비밀번호</h3>
                        <div>
                            <input
                                value={pwd} onChange={(e) => setPwd(e.target.value)}
                                type="password" placeholder='비밀번호를 입력해주세요' />
                        </div>
                        {errorMessage.pwd && (
                            <div className="error-message">
                                <span>{errorMessage.pwd}</span>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className='ButtonContainer'>
                        <input type="button" value="취소"
                            onClick={() => {
                                setReason('');
                                setPwd('');
                                setErrorMessage({ reason: '', pwd: '' });
                            }} />
                        <input type="button" value="탈퇴하기"
                            onClick={handleSignOut} />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignOut;