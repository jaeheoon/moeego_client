import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchProItem = ({ item, proNo }) => {
    const [isToggled, setIsToggled] = useState(false); // 토글 상태 관리
    const navigate = useNavigate();

    const toggleDetails = () => {
        setIsToggled(!isToggled); // 토글 상태 변경
    };

    const handleProViewNavigation = (serviceItem) => {
        navigate("/pro/proview", {
            state: { item: item, serviceItem, proNo },
        });
    };

    return (
        <div className="searchListWrap">
            <div className="searchListAWrap" onClick={toggleDetails}>
                <div className="searchListLink">
                    <div className="searchListContentWrap">
                        <div className="searchListTitleWrap">
                            <h3>{item.name}</h3>
                        </div>
                        <div className="searchListProInfoWrap">
                            <span>
                                <span
                                    style={{
                                        color: "#f39c12",
                                        marginRight: "0.25rem",
                                    }}
                                >★</span>
                                {Math.floor(item.star * 10) / 10} (
                                {item.reviewCount !== null && item.reviewCount !== undefined
                                    ? item.reviewCount
                                    : 0})
                            </span>
                        </div>
                        <p className="searchListIntro">
                            {item.oneIntro}
                        </p>
                    </div>
                </div>
                <div className="searchListProfileWrap">
                    <div className="user-profile-picture">
                        <img
                            src={
                                item.profileImage
                                    ? `https://kr.object.ncloudstorage.com/moeego/profile/${item.profileImage}`
                                    : "/image/default.svg"
                            }
                            width={150}
                            height={150}
                            alt="전문가 이름"
                        />
                    </div>
                </div>
            </div>

            {/* 토글된 상세 정보 부분 */}
            <div
                className={`searchListDetailWrap ${isToggled ? 'active' : ''}`}
            >
                {isToggled &&
                    item.proItems
                        .filter((serviceItem) => serviceItem.subject) // subject가 있는 경우만 렌더링
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
                                        ({serviceItem.reviewCount !== null &&
                                        serviceItem.reviewCount !== undefined
                                            ? serviceItem.reviewCount
                                            : 0})
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
};

export default SearchProItem;