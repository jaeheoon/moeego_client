import React, { useState, useEffect } from "react";
import ServiceAreaModal from "./ServiceAreaModal"; // 모달 컴포넌트 import
import "../../css/Pro/Service_area.css";

const ServiceArea = ({ onServiceAreaChange }) => {
    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리
    const [activeModal, setActiveModal] = useState("service"); // 기본적으로 서비스 모달을 열도록 설정
    const [selectedService, setSelectedService] = useState("서비스"); // 기본값
    const [selectedArea, setSelectedArea] = useState("지역"); // 기본값

    useEffect(() => {
        if (onServiceAreaChange) {
            onServiceAreaChange(selectedService, selectedArea); // 부모 컴포넌트로 선택된 값 전달
        }
    }, [selectedService, selectedArea, onServiceAreaChange]);

    const openServiceModal = () => {
        setActiveModal("service");
        setModalOpen(true);
    };

    const openAreaModal = () => {
        setActiveModal("area");
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        openAreaModal();
    };

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        closeModal();
    };

    const resetFilters = () => {
        setSelectedService("서비스"); // 서비스 초기화
        setSelectedArea("지역"); // 지역 초기화
        // 모달 닫기
        closeModal();
    };

    return (
        <section className="service_areaHeader">
            <button
                type="button"
                className={`serviceBtn ${
                    selectedService !== "서비스" ? "selectedService" : ""
                }`}
                onClick={openServiceModal}
            >
                <span>{selectedService}</span> {/* 선택한 서비스 텍스트 표시 */}
                <span>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.0791 17.3C12.278 17.2991 12.4684 17.2191 12.6084 17.0778L20.3326 9.27778C20.6241 8.98346 20.6218 8.5086 20.3274 8.21714C20.0331 7.92568 19.5583 7.92799 19.2668 8.22231L12.0703 15.4894L4.72747 8.21716C4.43316 7.92569 3.95829 7.92799 3.66682 8.22229C3.37535 8.5166 3.37764 8.99146 3.67195 9.28294L11.5477 17.0829C11.6891 17.2229 11.8802 17.301 12.0791 17.3Z"
                            fill={
                                selectedService !== "서비스" ? "white" : "black"
                            }
                        ></path>
                    </svg>
                </span>
            </button>
            <button
                type="button"
                className={`areaBtn ${
                    selectedArea !== "지역" ? "selectedService" : ""
                }`}
                onClick={openAreaModal}
            >
                <span>{selectedArea}</span> {/* 선택한 지역 텍스트 표시 */}
                <span>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.0791 17.3C12.278 17.2991 12.4684 17.2191 12.6084 17.0778L20.3326 9.27778C20.6241 8.98346 20.6218 8.5086 20.3274 8.21714C20.0331 7.92568 19.5583 7.92799 19.2668 8.22231L12.0703 15.4894L4.72747 8.21716C4.43316 7.92569 3.95829 7.92799 3.66682 8.22229C3.37535 8.5166 3.37764 8.99146 3.67195 9.28294L11.5477 17.0829C11.6891 17.2229 11.8802 17.301 12.0791 17.3Z"
                            fill={selectedArea !== "지역" ? "white" : "black"}
                        ></path>
                    </svg>
                </span>
            </button>
            <button
                type="button"
                className="filterResetBtn"
                onClick={resetFilters}
            >
                필터 초기화
            </button>

            {isModalOpen && (
                <ServiceAreaModal
                    onClose={closeModal}
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                    handleServiceSelect={handleServiceSelect} // 서비스 선택 핸들러 전달
                    handleAreaSelect={handleAreaSelect} // 지역 선택 핸들러 전달
                />
            )}
        </section>
    );
};

export default ServiceArea;
