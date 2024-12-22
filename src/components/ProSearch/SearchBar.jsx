import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";

const SearchBar = ({ onSearch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]); // 데이터를 담을 상태
    const [keyword, setKeyword] = useState("");

    // 입력값 변경 시 상태 업데이트
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    // 엔터 키 입력 시 검색 실행
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("Enter pressed, searching with:", keyword); // 디버깅
            onSearch(keyword); // 키워드로 검색
        }
    };

    const handleSearch = () => {
        console.log("Search button clicked, searching with:", keyword); // 디버깅
        onSearch(keyword); // 검색 실행
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        document.body.style.overflow = isModalOpen ? "auto" : "hidden";
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    useEffect(() => {
        const fetchedItems = [
            "서울 송파구/코딩달인/정세묵/수업 안들어도 코딩고수 가능!",
            "서울 강남구/웹 개발/김소영/비전공자도 고수 될 수 있어!",
            "서울 마포구/UX디자인/김태훈/디자인 실력 향상!",
            "서울 서초구/데이터 분석/이민지/통계로 세상을 변화시킨다!",
            "서울 송파구/네트워크 보안/박성호/해킹방어 능력 키우기!",
            "서울 송파구/수비천재/오지환/모든 공은 나에게로",
        ];

        setItems(fetchedItems);
    }, []);

    return (
        <div className="proSearchBarWrap">
            <div className="proSearchInputBarWrap">
                <img
                    src="../../src/image/search.png"
                    alt="검색버튼"
                    onClick={handleSearch}
                />
                <input
                    type="text"
                    placeholder="어떤 서비스가 필요하세요?"
                    maxLength={30}
                    value={keyword}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="mapBtnWrap">
                <button className="mapBtn" onClick={toggleModal}>
                    <i className="icon">
                        <svg
                            width="20"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="prisma-icon primary"
                            category="contents"
                        >
                            <path
                                d="M21.25 5.57258V17.7169C21.25 18.4977 20.7327 19.1841 19.982 19.3992L15.6477 20.641C15.3287 20.7324 14.9903 20.7313 14.672 20.6376L9.01265 18.9734C8.9633 18.9589 8.91067 18.96 8.86195 18.9765L5.06119 20.2633C3.92652 20.6474 2.75 19.8036 2.75 18.6057V6.44955C2.75 5.68666 3.24421 5.01167 3.97148 4.78127L8.39965 3.37841C8.73568 3.27195 9.09602 3.26945 9.43349 3.37124L15.0845 5.07559C15.1324 5.09005 15.1836 5.08978 15.2313 5.07483L18.9773 3.90246C20.1043 3.54974 21.25 4.39165 21.25 5.57258ZM19.75 17.7169V5.57258C19.75 5.40388 19.5863 5.2836 19.4253 5.33399L15.8136 6.46434L15.8136 19.0332L19.5689 17.9572C19.6761 17.9265 19.75 17.8284 19.75 17.7169ZM14.3136 18.9687L9.62701 17.5906L9.62702 4.99634L14.3136 6.40983L14.3136 18.9687ZM8.12701 17.6417L8.12702 5.03825L4.4245 6.21123C4.3206 6.24414 4.25 6.34057 4.25 6.44955L4.25 18.6057C4.25 18.7768 4.41807 18.8974 4.58017 18.8425L8.12701 17.6417Z"
                                fill="white"
                            ></path>
                        </svg>
                    </i>
                    <span className="mapTitle">지도</span>
                </button>
            </div>

            {isModalOpen && (
                <div
                    className={`map-modalOverlay ${
                        isModalOpen ? "show" : "hide"
                    }`}
                    onClick={closeModal}
                >
                    <div
                        className="map-modalContent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mapName">
                            <h2>주변 달인</h2>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                        <KakaoMap />

                        <ul className="map-content-wrap">
                            {items.map((item, index) => (
                                <li key={index} className="map-list">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.37892 10.2236L8 16L12.6211 10.2236C13.2398 9.57389 13.2398 8.42611 12.6211 7.77642L8 2L3.37892 7.77642C2.76019 8.42611 2.76019 9.57389 3.37892 10.2236ZM8 14.1384L4.26449 9.63253C3.69834 8.93957 3.69834 7.86043 4.26449 7.16747L8 2.86157L11.7355 7.16747C12.3017 7.86043 12.3017 8.93957 11.7355 9.63253L8 14.1384Z"
                                            fill="#6F6F6F"
                                        ></path>
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
