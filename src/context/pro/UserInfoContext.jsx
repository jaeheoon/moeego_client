import React, { createContext, useContext, useState, useEffect } from "react";
import apiAxios from "../../api/apiAxios";

const UserInfoContext = createContext();

export const useUserInfo = () => {
    return useContext(UserInfoContext);
  };
  
  export const UserInfoProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
  
    // DB에서 userInfo 가져오기
    useEffect(() => {
      apiAxios.get("/api/pro/item", {
        params: {
          location: "서울",
        },
      })
        .then((response) => {
          console.log("받은 데이터:", response.data.data);
          setUserInfo(response.data.data); 
        })
        .catch((error) => {
          console.error("데이터를 가져오는 데 실패했습니다.", error);
        });
    }, []);
  
    return (
      <UserInfoContext.Provider value={{ userInfo }}>
        {children}
      </UserInfoContext.Provider>
    );
  };