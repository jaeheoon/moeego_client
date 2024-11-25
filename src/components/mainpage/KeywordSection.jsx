import React, { useState, useEffect } from "react";

function KeywordSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // 초기 상태 (복제 포함)
  const [isAnimating, setIsAnimating] = useState(false);
  const images = [
    { id: 1, label: "치워드림", url: "./src/image/keyword1.jpg" },
    { id: 2, label: "삐까뻔쩍홈케어", url: "./src/image/keyword2.jpg" },
    { id: 3, label: "청소다움", url: "./src/image/keyword3.jpg" },
    { id: 4, label: "청소를 부탁해", url: "./src/image/keyword4.jpg" },
  ];

  // 앞뒤로 복제된 슬라이드 배열 생성
  const extendedImages = [
    images[images.length - 1], // 마지막 슬라이드 복제
    ...images,
    images[0], // 첫 번째 슬라이드 복제
  ];

  const handlePrev = () => {
    if (isAnimating) return; // 애니메이션 중 클릭 방지
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    if (isAnimating) return; // 애니메이션 중 클릭 방지
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // 슬라이드 전환 완료 시 처리
  const handleTransitionEnd = () => {
    setIsAnimating(false); // 애니메이션 중단

    // 복제 슬라이드에서 원래 위치로 전환
    if (currentIndex === 0) {
      setCurrentIndex(images.length);
    } else if (currentIndex === extendedImages.length - 1) {
      setCurrentIndex(1);
    }
  };

  return (
    <div className="keywordWrap">
      <h2>쓱싹쓱싹 청소하는 날</h2>
      <div className="carousel">
        <button className="carousel-button prev" onClick={handlePrev}>
          &lt;
        </button>
        <div className="carousel-track">
          <div
            className="keyword-images"
            style={{
              transform: `translateX(-${currentIndex * 50}%)`,
              transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd} // 전환 완료 이벤트 핸들러
          >
            {extendedImages.map((image, index) => (
              <div
                key={index} // 복제 포함 고유 키
                className="keyword-image"
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <div>{image.label}</div>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-button next" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default KeywordSection;
