// src/components/ProSearchFunction.jsx
import React, { useContext, useState } from "react";
import ProSearchFunctionModal from "./ProSearchFunctionModal.jsx";
import { ProContext } from "../../context/pro/ProContext.jsx";

const ProSearchFunction = () => {
    const { service, setService, serviceName, updateService, area, setArea, setServiceName } = useContext(ProContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState("service");

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

    const handleServiceSelect = (selectedService, selectedServiceName) => {
        updateService(selectedService, selectedServiceName); // subCateNo와 subCateName 업데이트
        openAreaModal();
    };

    const handleAreaSelect = (selectedArea) => {
        setArea(selectedArea);
        closeModal();
    };

    const resetFilters = () => {
        setService("");  // 서비스 초기화
        setServiceName("서비스");  // 서비스 이름도 초기화
        setArea("지역");
        closeModal();
    };

    return (
        <header className="searchHeaderWrap">
            <h1>달인찾기</h1>
            <section className="service_areaHeader">
                <button
                    type="button"
                    className={`serviceBtn ${service !== "" ? "selectedService" : ""}`}
                    onClick={openServiceModal}
                >
                    <span>{serviceName}</span>
                    <span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0791 17.3C12.278 17.2991 12.4684 17.2191 12.6084 17.0778L20.3326 9.27778C20.6241 8.98346 20.6218 8.5086 20.3274 8.21714C20.0331 7.92568 19.5583 7.92799 19.2668 8.22231L12.0703 15.4894L4.72747 8.21716C4.43316 7.92569 3.95829 7.92799 3.66682 8.22229C3.37535 8.5166 3.37764 8.99146 3.67195 9.28294L11.5477 17.0829C11.6891 17.2229 11.8802 17.301 12.0791 17.3Z" fill={serviceName !== '서비스' ? '#fff' : 'black'}></path>
                        </svg>
                    </span>
                </button>
                <button
                    type="button"
                    className={`areaBtn ${area !== "지역" ? "selectedService" : ""}`}
                    onClick={openAreaModal}
                >
                    <span>{area}</span>
                    <span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0791 17.3C12.278 17.2991 12.4684 17.2191 12.6084 17.0778L20.3326 9.27778C20.6241 8.98346 20.6218 8.5086 20.3274 8.21714C20.0331 7.92568 19.5583 7.92799 19.2668 8.22231L12.0703 15.4894L4.72747 8.21716C4.43316 7.92569 3.95829 7.92799 3.66682 8.22229C3.37535 8.5166 3.37764 8.99146 3.67195 9.28294L11.5477 17.0829C11.6891 17.2229 11.8802 17.301 12.0791 17.3Z" fill={area !== '지역' ? '#fff' : 'black'}></path>
                        </svg>
                    </span>
                </button>
                <button type="button" className="filterResetBtn" onClick={resetFilters}>
                    필터 초기화
                </button>
                {isModalOpen && (
                    <ProSearchFunctionModal
                        onClose={closeModal}
                        activeModal={activeModal}
                        setActiveModal={setActiveModal}
                        handleServiceSelect={handleServiceSelect}
                        handleAreaSelect={handleAreaSelect}
                    />
                )}
            </section>
        </header>
    );
};

export default ProSearchFunction;
