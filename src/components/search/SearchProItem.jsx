import React, { useState } from 'react';

const SearchProItem = () => {
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
                            <h3>전문가 이름</h3>
                        </div>
                        <div className="searchListProInfoWrap">
                            <span>⭐️ 평점 (리뷰 수)</span>
                        </div>
                        <p className="searchListIntro">
                            한 줄 소개 텍스트가 들어갑니다.
                        </p>
                    </div>
                </div>
                <div className="searchListProfileWrap">
                    <div className="user-profile-picture">
                        <img
                            src="/image/default.svg"
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
                {isToggled && (
                    <div className="servicePage">
                        <div className="serviceWrap">
                            <div className="serviceSubject">
                                서비스 이름 (서브 카테고리)
                            </div>
                            <div className="serviceStar">
                                ⭐️ 평점 (리뷰 수)
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchProItem;