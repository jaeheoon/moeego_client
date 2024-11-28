import React, { createContext, useState } from 'react';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState('');

    return (
        <AdminContext.Provider value={{ admin }}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminProvider };