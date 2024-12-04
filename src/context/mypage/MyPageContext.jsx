import React, { createContext, useEffect, useState } from 'react';
import apiAxios from '../../api/apiAxios';

const MyPageContext = createContext();

const MyPageProvider = ({ children }) => {
    const [nickname, setNickname] = useState('김달인');
    const [introduction, setIntroduction] = useState('저는 달인인간입니다.');
    const [isToggleWrap1Visible, setIsToggleWrap1Visible] = useState(false);
    const [isToggleWrap2Visible, setIsToggleWrap2Visible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await apiAxios.get('/api/mypage/account');
                const { nickname, introduction } = response.data;

                setNickname(nickname);
                setIntroduction(introduction);
            } catch (error) {
                console.error('axios 요청 오류:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

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