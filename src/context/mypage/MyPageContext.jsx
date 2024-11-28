import React, { createContext, useState } from 'react';

const MyPageContext = createContext();

const MyPageProvider = ({ children }) => {
    const [mypage, setMyPage] = useState('');
    return (
        <MyPageContext.Provider value={{ mypage }}>
            {children}
        </MyPageContext.Provider>
    );
};

export { MyPageProvider };