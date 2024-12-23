import React, { useState } from "react";
import Detail_category from "../detail_category/Detail_category";
import { useNavigate } from "react-router-dom";

function MainBanner() {
    const [searchValue, setSearchValue] = useState(""); // 검색어 상태 관리
    const navigate = useNavigate();

    const handleSearch = (value) => {
        if (value.trim()) { // 검색어가 비어있지 않을 경우에만 이동
            navigate(`/search?value=${value}`); // 쿼리 파라미터에 검색어 포함
        } else {
            alert("검색어를 입력해주세요.");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") { // 엔터키 감지
            handleSearch(searchValue);
        }
    };

    return (
        <div className="mainBannerWrap">
            <h1>내가 찾던 모든 전문가, 모이고에서 한눈에!</h1>
            <div className="searchCategoryWrap">
                <div className="searchBarWrap">
                    <img
                        src="/image/search.png"
                        alt="검색버튼"
                        onClick={() => handleSearch(searchValue)} // 클릭으로도 검색 가능
                    />
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} // 입력값 업데이트
                        onKeyDown={handleKeyPress} // 키 입력 감지
                    />
                </div>
                <div>
                    <Detail_category />
                </div>
            </div>
        </div>
    );
}

export default MainBanner;