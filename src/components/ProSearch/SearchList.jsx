import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchList = ({ item, proNo }) => {
    const [isToggled, setIsToggled] = useState(false); // 토글 상태 관리
    const navigate = useNavigate();

    const handleProViewNavigation = (serviceItem) => {
        navigate("/pro/proview", {
            state: { item: item, serviceItem, proNo },
        });
    };

    const toggleDetails = () => {
        setIsToggled(!isToggled); // 상태 변경으로 요소 토글
    };

    return (
        <>
            {item ? (
                <article className="proSearchListWrap">
                    <div className="proSearchListAWrap" onClick={toggleDetails}>
                        <div className="proSearchListLink">
                            <div className="proSearchListContentWrap">
                                <div className="proSearchListTitleWrap">
                                    <h3>{item.name}</h3>
                                </div>
                                <div className="proSearchListProInfoWrap">
                                    <span>
                                        <span
                                            style={{
                                                color: "#f39c12",
                                                marginRight: "0.25rem",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "#f39c12",
                                                    marginRight: "0.15rem",
                                                }}
                                            >
                                                ★
                                            </span>
                                            {Math.floor(item.star * 10) / 10}
                                        </span>
                                        ({item.reviewCount || "0"})
                                    </span>
                                </div>
                                <p className="proSearchListIntro">{item.oneIntro}</p>
                            </div>
                        </div>
                        <div className="proSearchListProfileWrap">
                            <div className="user-profile-picture">
                                <img
                                    src={
                                        item.profileImage
                                            ? item.profileImage.startsWith("https://")
                                                ? item.profileImage  // https://로 시작하면 그대로 사용
                                                : `https://kr.object.ncloudstorage.com/moeego/profile/${item.profileImage}`  // 아니면 경로 추가
                                            : "/image/default.svg"  // profileImage가 없으면 기본 이미지 사용
                                    }
                                    width={150}
                                    height={150}
                                    alt={item.name}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 토글된 상세 정보 부분 */}
                    <div
                        className={`proSearchListDetailWrap ${isToggled ? "active" : ""}`}
                    >
                        {isToggled &&
                            item.proItems
                                .filter((serviceItem) => serviceItem && serviceItem.subject) // null 또는 subject가 없는 항목 제외
                                .map((serviceItem) => (
                                    <div
                                        key={serviceItem.proItemNo}
                                        className="servicePage"
                                        onClick={() => handleProViewNavigation(serviceItem)}
                                    >
                                        <div className="serviceWrap">
                                            <div className="serviceSubject">
                                                {serviceItem.subject} (
                                                {serviceItem.subCategory.subCateName})
                                            </div>
                                            <div className="serviceStar">
                                                <span
                                                    style={{
                                                        color: "#f39c12",
                                                        marginRight: "0.25rem",
                                                    }}
                                                >
                                                    ★{" "}
                                                    {Math.floor(serviceItem.star * 10) / 10}
                                                </span>{" "}
                                                ({serviceItem.reviewCount})
                                            </div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </article>
            ) : (
                "등록된 달인과 서비스가 없습니다."
            )}
        </>
    );
};

export default SearchList;