import React, { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios";

const SignOutContext = createContext();

const SignOutProvider = ({ children }) => {
    
    const [oneintro, setOneintro] = useState('');
    const [pwd, setPwd] = useState('');
    const [repwd, setRepwd] = useState('');
    const [result, setResult] = useState(false);
    const [errorMessage, setErrorMessage] 
        = useState({ oneintro: '', pwd: '', repwd: '' });
  
    const validateForm = () => {
        let isValid = true;
        let errors = { oneintro: '', pwd: '', repwd: '' };

         if (!oneintro.trim()) {
            errors.oneintro = "탈퇴사유를 입력해주세요.";
            isValid = false;
        } else if (oneintro.length > 50) {
            errors.oneintro = "탈퇴사유는 50자 이내로 입력해주세요.";
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
            oneintro: oneintro,
            pwd: pwd,
            repwd: repwd,
        }

        if(!validateForm()) {
            return;
        }

        apiAxios
        .post('/api/mypage/signout', dataToSubmit)
        .then(response => {
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
        oneintro, setOneintro,
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