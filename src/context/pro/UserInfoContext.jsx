import React, { createContext, useContext, useState, useEffect } from "react";
import apiAxios from "../../api/apiAxios";

const UserInfoContext = createContext();

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [area, setArea] = useState("");

  // DB에서 userInfo 가져오기
  useEffect(() => {
    apiAxios.get("/api/pro/item", {
      params: {
        location: area,
      },
    })
      .then((response) => {
        setUserInfo(response.data.data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 실패했습니다.", error);
      });
  }, [area]);

  return (
    <UserInfoContext.Provider value={{ userInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};