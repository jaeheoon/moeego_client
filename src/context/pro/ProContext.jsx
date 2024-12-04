import React, { createContext, useState } from 'react';

const ProContext = createContext();

const ProProvider = ({ children }) => {
    //const [pro, setPro] = useState({});
    const [pro, setPro] = useState('');

    const updatePro = (newPro) => {
        setPro(newPro);
    };

    return (
        <ProContext.Provider value={{ pro, updatePro }}>
            {children}
        </ProContext.Provider>
    );
};

export { ProProvider, ProContext };