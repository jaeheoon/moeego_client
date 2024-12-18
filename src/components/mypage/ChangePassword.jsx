import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../css/mypage/ChangePassword.css";
import apiAxios from '../../api/apiAxios';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // 비밀번호 길이 검사
    const validateLength = (value) => {
        return value.length >= 8 && value.length <= 20;
    };

    // 비밀번호 형식 검사 (대소문자, 숫자, 특수문자 포함)
    const validateFormat = (value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?,.<>])/;
        return regex.test(value);
    };

    // 비밀번호 변경 API 요청
    const handleSubmit = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        // 유효성 검사
        if (!currentPassword || !newPassword || !confirmPassword) {
            setErrorMessage('모든 필드를 입력해주세요.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            return;
        }

        // 비밀번호 길이 검사
        if (!validateLength(newPassword)) {
            setErrorMessage('비밀번호는 8자 이상, 20자 이하이어야 합니다.');
            return;
        }

        // 비밀번호 형식 검사
        if (!validateFormat(newPassword)) {
            setErrorMessage('비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다.');
            return;
        }

        try {
            const payload = {
                password: currentPassword,
                're-password': newPassword
            };

            const response = await apiAxios.patch('/api/mypage/account/private/update/password', payload, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // JWT 토큰을 Authorization 헤더에 추가
                }
            });

            if (response.status === 200) {
                setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
                setTimeout(() => {
                    alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
                    const fetchLogout = async () => {
                        try {
                            // 로그아웃 요청 시 백엔드에서 refresh token 블랙리스트 처리 (혹은 refresh 토큰 DB에서 삭제)
                            const response = await apiAxios.post("/api/logout");

                            if (response.status === 200) {
                                // access token 삭제 (로컬 스토리지)
                                window.localStorage.clear();

                                setIsLoggedIn(false);
                                setLoginUser(null);
                                setLoginEmail(null);
                                setLoginStatus(null);
                                setLoginAddress(null);
                                setLoginPhone(null);
                                setLoginProfile(null);
                                setLoginNumber(null);
                            } else {
                                alert("logout failed");
                            }
                            navigate("/login", { replace: true });
                        } catch (error) {
                            console.log("로그인이 필요합니다.");
                            navigate("/login");
                        }
                    };

                    fetchLogout();
                }, 2000);
            } else {
                setErrorMessage(response.data.message || '비밀번호 변경 실패');
            }
        } catch (error) {
            console.error('비밀번호 변경 중 오류:', error);
            setErrorMessage('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className='ChangePasswordPage'>
            <div className='ChangePasswordWrap'>
                <div className='PageTitle'>
                    <Link className='prev' to="/mypage/account/private">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>비밀번호 변경</h1>
                </div>
                <form className='ChangePasswordForm'>
                    <div className='ChangePasswordContainer'>
                        <h3 className="SubTitle">기존 비밀번호</h3>
                        <div>
                            <input
                                type="password"
                                placeholder='현재 비밀번호를 입력해주세요'
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                maxLength={20}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className='ChangePasswordContainer'>
                        <h3 className="SubTitle">새로운 비밀번호</h3>
                        <div>
                            <input
                                type="password"
                                placeholder='비밀번호를 입력해주세요'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                maxLength={20}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className='ChangePasswordContainer'>
                        <h3 className="SubTitle">새로운 비밀번호 확인</h3>
                        <div>
                            <input
                                type="password"
                                placeholder='비밀번호를 한번 더 입력해주세요'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                maxLength={20}
                            />
                        </div>
                    </div>
                    <hr />
                    {errorMessage && (
                        <div className="error-message">
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="success-message">
                            <span>{successMessage}</span>
                        </div>
                    )}
                    <div className='ButtonContainer'>
                        <input type="button" value="취소" onClick={() => navigate('/mypage/account/private')} />
                        <input type="button" value="변경완료" onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
