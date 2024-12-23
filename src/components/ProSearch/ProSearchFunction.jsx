// src/components/ProSearchFunction.jsx
import React, { useContext, useState } from "react";
import ProSearchFunctionModal from "./ProSearchFunctionModal.jsx";
import { ProContext } from "../../context/pro/ProContext.jsx";

const ProSearchFunction = () => {
    const { service, setService, serviceName, updateService, area, setArea } = useContext(ProContext);
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
        setService(""); // 서비스 초기화
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
                </button>
                <button
                    type="button"
                    className={`areaBtn ${area !== "지역" ? "selectedService" : ""}`}
                    onClick={openAreaModal}
                >
                    <span>{area}</span>
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
