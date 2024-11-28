import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState();

    return (
        <LoginContext.Provider value={{ login }}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginProvider };