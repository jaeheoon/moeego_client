import React, { useState } from 'react';

const SearchProItem = ({item}) => {
    const [isToggled, setIsToggled] = useState(false); // 토글 상태 관리

    const toggleDetails = () => {
        setIsToggled(!isToggled); // 토글 상태 변경
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
                                {Math.floor(item.star * 10) / 10} ({item.reviewCount})</span>
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
                className={`searchListDetailWrap ${
                    isToggled ? 'active' : ''
                }`}
            >
                {isToggled &&
                    item.proItems.map((serviceItem) => (
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
        </div>
    );
};

export default SearchProItem;