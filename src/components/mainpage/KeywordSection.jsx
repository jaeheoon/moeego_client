import React, { useState, useEffect } from "react";
import apiAxios from "../../api/apiAxios"; // 사용자 설정 Axios 인스턴스
import { useNavigate } from 'react-router-dom';

function KeywordSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [item, setProData] = useState([]); // 전문가 데이터 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedPro, setSelectedPro] = useState(null); // 선택된 프로 데이터
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 화면 크기에 따라 슬라이드 개수 조정
  useEffect(() => {
    const updateSlidesToShow = () => {
      setSlidesToShow(window.innerWidth <= 768 ? 2 : 3);
    };
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  // 데이터 가져오기
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiAxios.get("/api/pro/item", {
          params: { subCateNo: 2 },
        });
        if (response.data.success) {
          setProData(response.data.data.content); // 전문가 리스트 저장
        } else {
          console.error("데이터를 불러오지 못했습니다:", response.data.message);
        }
      } catch (error) {
        console.error("API 요청 오류:", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    }
    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < Math.ceil(item.length / slidesToShow) - 1
        ? prevIndex + 1
        : prevIndex
    );
  };

  const openModal = (pro) => {
    setSelectedPro(pro); // 클릭된 프로의 정보를 저장
    setIsModalOpen(true); // 모달 열기
    document.body.style.overflow = 'hidden'; // 스크롤 막기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedPro(null); // 선택된 프로 정보 초기화
    document.body.style.overflow = 'auto'; // 스크롤 다시 활성화
  };

  const handleServiceSelect = (service, pro) => {
    const item = pro;
    const serviceItem = service;
    const proNo = pro.proNo;  // 클릭한 전문가(pro)에서 proNo를 가져옵니다.

    // 페이지 이동 전 모달 닫기
    closeModal();

    navigate(`/pro/proview/`, {
      state: { item, serviceItem, proNo },
    });
  };

  // 로딩 중 표시
  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  const isNextDisabled = item.length <= slidesToShow;

  return (
    <div className="keywordWrap">
      <h2>오늘은 청소하는 날!</h2>
      <div className="carousel">
        {/* 이전 버튼 */}
        <button
          className="carousel-button prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>

        {/* 슬라이드 */}
        <div className="carousel-track">
          <div
            className="keyword-images"
            style={{
              transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {item.map((pro) => (
              pro.proItems && pro.proItems.some(item => item.subject) && (
                <div
                  key={pro.proNo}
                  className="keyword-image"
                  style={{
                    backgroundImage: `url(${pro.profileImage ? "https://kr.object.ncloudstorage.com/moeego/profile/" + pro.profileImage : "/image/default.svg"})`,
                  }}
                  onClick={() => openModal(pro)}  // 클릭된 pro를 모달에 전달
                >
                  <div className="pro-info">
                    <h3>{pro.name}</h3>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* 다음 버튼 */}
        <button
          className="carousel-button next"
          onClick={handleNext}
          disabled={isNextDisabled || currentIndex === Math.ceil(item.length / slidesToShow) - 1}
        >
          &gt;
        </button>
      </div>

      {/* 모달에서 클릭된 서비스로 페이지 이동 */}
      {isModalOpen && selectedPro && (
        <div
          className="modal-overlay"
          onClick={closeModal}  // 모달 외부 클릭 시 모달 닫기
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}  // 모달 내부 클릭 시 이벤트 전파 차단
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedPro.name}의 서비스</h2>
            <ul className="service-list">
              {selectedPro.proItems
                .filter((service) => service && service.subject) // 서비스가 null이 아닌 항목만 필터링
                .map((service) => (
                  <li
                    key={service.proItemNo}
                    onClick={() => handleServiceSelect(service, selectedPro)}  // 클릭한 전문가(pro) 전달
                    className="service-item"
                  >
                    {service.subject}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default KeywordSection;
