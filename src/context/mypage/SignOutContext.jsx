import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios";
import { AuthContext } from '../member/AuthContext';

const SignOutContext = createContext();

const SignOutProvider = ({ children }) => {
    const { loginEmail, loginUser } = useContext(AuthContext);

    const [reason, setReason] = useState('');
    const [pwd, setPwd] = useState('');
    const [result, setResult] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        reason: '',
        pwd: ''
    });

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        let errors = { reason: '', pwd: '', };

        if (!reason.trim()) {
            errors.reason = "탈퇴사유를 입력해주세요.";
            isValid = false;
        } else if (reason.length > 50) {
            errors.reason = "탈퇴사유는 50자 이내로 입력해주세요.";
            isValid = false;
        }

        if (!pwd) {
            errors.pwd = "비밀번호를 입력해주세요.";
            isValid = false;
        }

        setErrorMessage(errors);
        return isValid;
    };

    // 탈퇴 처리
    const handleSignOut = async () => {
        if (!reason || !pwd) {
            setErrorMessage({
                reason: reason ? '' : '탈퇴 사유를 입력해주세요.',
                pwd: pwd ? '' : '비밀번호를 입력해주세요.'
            });
            return;
        }

        try {
            const signOutDTO = {
                email: loginEmail, // 로그인한 사용자의 이메일을 로컬스토리지에서 가져옴
                pwd,
                reason
            };

            const response = await apiAxios.patch('/api/mypage/account/private/signout', signOutDTO);

            if (response.status === 200) {
                alert(loginUser + '님 모이고 회원 탈퇴가 완료되었습니다.');
                navigate('/logout');
            } else {
                // 서버에서 반환한 에러 메시지 처리
                setErrorMessage({ ...response.data });
            }
        } catch (error) {
            console.error('탈퇴 처리 중 오류 발생:', error);
            alert('탈퇴 처리 중 오류가 발생했습니다.');
        }
    };

    const contextValue = {
        reason,
        setReason,
        pwd,
        setPwd,
        errorMessage,
        setErrorMessage,
        handleSignOut
    };
    return (
        <SignOutContext.Provider value={contextValue}>
            {children}
        </SignOutContext.Provider>
    );
};

export { SignOutProvider, SignOutContext };