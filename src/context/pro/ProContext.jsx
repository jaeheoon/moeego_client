import React, { createContext, useState } from 'react';

const ProContext = createContext();

const ProProvider = ({ children }) => {
    const [pro, setPro] = useState('');
    return (
        <ProContext.Provider value={{ pro }}>
            {children}
        </ProContext.Provider>
    );
};

export { ProProvider };