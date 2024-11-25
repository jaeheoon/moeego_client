import React, { useState, useEffect } from "react";

function KeywordSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // 초기 상태 (복제 포함)
  const [isAnimating, setIsAnimating] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3); // 화면 크기에 따라 표시할 슬라이드 개수

  const images = [
    { id: 1, label: "치워드림", url: "./src/image/keyword1.jpg" },
    { id: 2, label: "삐까뻔쩍홈케어", url: "./src/image/keyword2.jpg" },
    { id: 3, label: "청소다움", url: "./src/image/keyword3.jpg" },
    { id: 4, label: "청소를 부탁해", url: "./src/image/keyword4.jpg" },
  ];

  // 복제 슬라이드 배열 생성
  const extendedImages = [
    images[images.length - 1], // 마지막 슬라이드 복제
    ...images,
    ...images.slice(0, slidesToShow), // 필요한 만큼 슬라이드 복제
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
  if (isAnimating) return;
  setIsAnimating(true);
  
  setCurrentIndex((prevIndex) => {
    let newIndex = prevIndex - 1;
    
    // 첫 번째 슬라이드에서 이전 버튼을 클릭할 경우, 마지막 슬라이드로 넘어갑니다.
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }

    return newIndex;
  });
};

const handleNext = () => {
  if (isAnimating) return;
  setIsAnimating(true);

  setCurrentIndex((prevIndex) => {
    let newIndex = prevIndex + 1;

    // 마지막 슬라이드에서 다음 버튼을 클릭할 경우, 첫 번째 슬라이드로 넘어갑니다.
    if (newIndex >= extendedImages.length) {
      newIndex = 1; // 첫 번째 슬라이드로 설정
    }

    return newIndex;
  });
};

const handleTransitionEnd = () => {
  setIsAnimating(false);

  // 복제 슬라이드에서 원래 위치로 전환
  if (currentIndex === 0) {
    setCurrentIndex(images.length); // 첫 번째 슬라이드로 다시 설정
  } else if (currentIndex === extendedImages.length - slidesToShow) {
    setCurrentIndex(1); // 마지막 슬라이드에서 첫 번째로 돌아감
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
              transform: `translateX(-${(currentIndex - 1) * (100 / slidesToShow)}%)`,
              transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedImages.map((image, index) => (
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
        <button className="carousel-button next" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default KeywordSection;
