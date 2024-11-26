import React, { useState, useEffect } from "react";
import DetailCardItem from "./DetailCardItem";

const DetailCardList = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드의 시작 인덱스
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 카드 아이템 배열
    const visibleCards = 2; // 화면에 표시되는 카드 수
    const [cardWidth, setCardWidth] = useState(350); // 기본 카드 너비

    useEffect(() => {
        // 화면 크기에 따라 카드 너비를 조정
        const handleResize = () => {
            if (window.innerWidth <= 1250) { // 모바일 환경
                setCardWidth(115); // 모바일에서 카드 너비
            } else {
                setCardWidth(350); // PC에서 카드 너비
            }
        };

        handleResize(); // 초기 사이즈 설정
        window.addEventListener("resize", handleResize); // 리사이즈 이벤트 리스너 추가

        return () => {
            window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 리스너 제거
        };
    }, []);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < cards.length - visibleCards) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div className="detailCardList">
            <div className="detailCardWrap">
                {/* 이전 슬라이드 버튼 */}
                <button
                    className="slideButton left"
                    onClick={handlePrev}
                    disabled={currentIndex === 0} // 첫 번째 카드에서는 비활성화
                >
                    {"<"}
                </button>

                {/* 카드 리스트 */}
                <div className="detailCardListContainer">
                    <div
                        className="detailCardList"
                        style={{
                            transform: `translateX(-${currentIndex * cardWidth}px)`, // 카드 크기 기준
                            transition: "transform 0.3s ease", // 부드러운 이동 효과
                        }}
                    >
                        {cards.map((_, index) => (
                            <DetailCardItem key={index} />
                        ))}
                    </div>
                </div>

                {/* 다음 슬라이드 버튼 */}
                <button
                    className="slideButton right"
                    onClick={handleNext}
                    disabled={currentIndex === cards.length - visibleCards} // 마지막 카드에서는 비활성화
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default DetailCardList;