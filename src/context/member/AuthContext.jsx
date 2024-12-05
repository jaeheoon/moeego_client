import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem('access'));
    const [loginUser, setLoginUser] = useState(window.localStorage.getItem('name'));

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginUser, setLoginUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };