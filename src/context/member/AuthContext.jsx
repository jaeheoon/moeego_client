import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem('access'));
    const [loginUser, setLoginUser] = useState(window.localStorage.getItem('username'));
    const [loginEmail, setLoginEmail] = useState(window.localStorage.getItem('useremail'));
    const [loginStatus, setLoginStatus] = useState(window.localStorage.getItem('memberStatus'));

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginUser, setLoginUser, loginEmail, setLoginEmail, loginStatus, setLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };