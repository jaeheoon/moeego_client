// src/context/ProSearchContext.jsx
import React, { createContext, useContext, useState } from "react";

const ProContext = createContext();

const ProProvider = ({ children }) => {
    // 서비스 관련 상태 (subCateNo)
    const [service, setService] = useState(""); // subCateNo
    const [serviceName, setServiceName] = useState("서비스"); // subCateName

    // 지역, 키워드 상태
    const [area, setArea] = useState("지역");
    const [keyword, setKeyword] = useState("");

    // service 업데이트 함수
    const updateService = (newService, newServiceName) => {
        setService(newService);
        setServiceName(newServiceName); // 서비스 이름도 업데이트
    };

    const value = {
        service,
        setService,
        serviceName,
        setServiceName,
        updateService,
        area,
        setArea,
        keyword,
        setKeyword
    };

    return (
        <ProContext.Provider value={value}>
            {children}
        </ProContext.Provider>
    );
};

export { ProProvider, ProContext };