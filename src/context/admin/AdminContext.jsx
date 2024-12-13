// import React, { createContext, useState, useEffect } from 'react';
// import apiAxios from '../../api/apiAxios';

// // AdminContext 생성
// const AdminContext = createContext();

// const AdminProvider = ({ children }) => {

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     return (
//         <AdminContext.Provider
//         value={{
//                 loading,
//                 error,
//         }}
//         >
//             {children}
//         </AdminContext.Provider>
//     );
// };

// export { AdminProvider, AdminContext };



import React, { createContext, useState } from 'react';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <AdminContext.Provider value={{ loading, setLoading, error, setError }}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminProvider, AdminContext };
