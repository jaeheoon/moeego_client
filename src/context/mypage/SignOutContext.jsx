import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios";
import { AuthContext } from '../member/AuthContext';

const SignOutContext = createContext();

const SignOutProvider = ({ children }) => {
    
    const { loginEmail } = useContext(AuthContext);

    const [reason, setReason] = useState('');
    const [pwd, setPwd] = useState('');
    const [repwd, setRepwd] = useState('');
    const [result, setResult] = useState(false);
    const [errorMessage, setErrorMessage] 
    = useState({ reason: '', pwd: '', repwd: '' });
    
    const validateForm = () => {
        let isValid = true;
        let errors = { reason: '', pwd: '', repwd: '' };

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

        if (pwd !== repwd) {
            errors.repwd = "비밀번호가 일치하지 않습니다.";
            isValid = false;
        }

        setErrorMessage(errors); 
        return isValid;
    };

    const handleSignOut = () => {
        const dataToSubmit = {
            reason: reason,
            pwd: pwd,
            //repwd: repwd,
            email: loginEmail,
        }

        if(!validateForm()) {
            return;
        }
        
        apiAxios
        .patch('/api/mypage/account/private/signout', dataToSubmit)
        .then(response => {
            console.log(reason.data)
            setResult(response.data);
            if(result) {
                alert(result + ", 탈퇴성공");
            } else {
                alert(result + ", 탈퇴실패");
            }
        })
        .catch(err => console.log('서버통신 오류 : ' + err));
    };
    
    
    const contextValue = {
        reason, setReason,
        pwd, setPwd,
        repwd, setRepwd,
        errorMessage, setErrorMessage,
        handleSignOut
    };
    return (
        <SignOutContext.Provider value={contextValue}>
            { children }
        </SignOutContext.Provider>
    );
};

export { SignOutProvider, SignOutContext };