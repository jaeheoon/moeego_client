import React, { createContext, useContext, useEffect, useState } from 'react';
import {AuthContext} from '../member/AuthContext';
import apiAxios from '../../api/apiAxios';

const MyPageContext = createContext();

const MyPageProvider = ({ children }) => {
    const [nickname, setNickname] = useState('김달인');
    const [introduction, setIntroduction] = useState('저는 달인인간입니다.');
    const [isToggleWrap1Visible, setIsToggleWrap1Visible] = useState(false);
    const [isToggleWrap2Visible, setIsToggleWrap2Visible] = useState(false);
    const [loading, setLoading] = useState(true);
    const {isLoggedIn, loginEmail, loginUser, loginStatus} = useContext(AuthContext);

    const toggleWrap1 = () => setIsToggleWrap1Visible((prev) => !prev);
    const toggleWrap2 = () => setIsToggleWrap2Visible((prev) => !prev);

    return (
        <MyPageContext.Provider value={{
            nickname,
            setNickname,
            introduction,
            setIntroduction,
            isToggleWrap1Visible,
            toggleWrap1,
            isToggleWrap2Visible,
            toggleWrap2,
            loading,
        }}>
            {children}
        </MyPageContext.Provider>
    );
};

export { MyPageProvider, MyPageContext };