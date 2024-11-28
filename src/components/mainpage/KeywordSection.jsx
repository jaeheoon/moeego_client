import React, { useState, useEffect } from "react";

function KeywordSection() {
  const [currentIndex, setCurrentIndex] = useState(0); // 초기 상태
  const [slidesToShow, setSlidesToShow] = useState(3); // 화면 크기에 따라 표시할 슬라이드 개수

  const images = [
    { id: 1, label: "치워드림", url: "/image/keyword1.jpg" },
    { id: 2, label: "삐까뻔쩍홈케어", url: "/image/keyword2.jpg" },
    { id: 3, label: "청소다움", url: "/image/keyword3.jpg" },
    { id: 4, label: "청소를 부탁해", url: "/image/keyword4.jpg" },
  ];

  // 화면 크기에 따라 슬라이드 개수 조정
  useEffect(() => {
    const updateSlidesToShow = () => {
      setSlidesToShow(window.innerWidth <= 768 ? 2 : 3); // 모바일: 2개, PC: 3개
    };
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - slidesToShow ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="keywordWrap">
      <h2>쓱싹쓱싹 청소하는 날</h2>
      <div className="carousel">
        {/* 이전 버튼 */}
        <button
          className="carousel-button prev"
          onClick={handlePrev}
          disabled={currentIndex === 0} // 첫 번째 슬라이드에서 비활성화
        >
          &lt;
        </button>

        {/* 슬라이드 */}
        <div className="carousel-track">
          <div
            className="keyword-images"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="keyword-image"
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <div>{image.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 다음 버튼 */}
        <button
          className="carousel-button next"
          onClick={handleNext}
          disabled={currentIndex === images.length - slidesToShow} // 마지막 슬라이드에서 비활성화
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default KeywordSection;