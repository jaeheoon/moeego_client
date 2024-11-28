import React, { createContext, useState } from 'react';

const SignUpContext = createContext();

const SignUpProvider = ({ children }) => {
    const [signup, setSignup] = useState('');

    return (
        <SignUpContext.Provider value={{ signup }}>
            {children}
        </SignUpContext.Provider>
    );
};

export { SignUpProvider };