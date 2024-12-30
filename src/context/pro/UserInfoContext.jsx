import React, { createContext, useContext, useState, useEffect } from "react";
import apiAxios from "../../api/apiAxios";

const UserInfoContext = createContext();

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // 데이터 저장
  const [area, setArea] = useState(""); // 지역 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  // DB에서 userInfo 가져오기
  useEffect(() => {
    setLoading(true); // 로딩 시작
    apiAxios.get("/api/pro/item", {
      params: {
        location: area,
        pg: currentPage, // 페이지 번호를 API 요청에 포함
      },
    })
      .then((response) => {
        setUserInfo(response.data.data); // 콘텐츠 데이터
        setTotalPages(response.data.data.totalPages); // 총 페이지 수
        setLoading(false); // 로딩 끝
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 실패했습니다.", error);
        setLoading(false);
      });
  }, [area, currentPage]); // area 또는 currentPage가 변경될 때마다 API 호출

  // 페이지 변경 함수
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);  // 페이지 변경
    }
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, loading, changePage, currentPage, totalPages }}>
      {children}
    </UserInfoContext.Provider>
  );
};
