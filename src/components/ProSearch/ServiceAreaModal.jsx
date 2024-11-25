import React from 'react';
import ServiceModal from './ServiceModal';
import AreaModal from './AreaModal';
import '../../css/pro/ServiceAreaModal.css';

const ServiceAreaModal = ({ onClose, activeModal, setActiveModal, handleServiceSelect, handleAreaSelect }) => {
    const handleOverlayClick = () => {
        onClose(); // 오버레이 클릭 시 모달 닫기
    };

    return (
        <div className='main-content'>
            <div className='ServiceAreaModalOverlay' onClick={handleOverlayClick}>
                <div className='ServiceAreaModal' onClick={(e) => e.stopPropagation()}> {/* 모달 내부 클릭 시 이벤트 전파 방지 */}
                    <button className='closeButton' onClick={onClose}>✖</button> {/* 닫기 버튼 추가 */}
                    <div className='ServiceAreaModalHeader'>
                        <button onClick={() => setActiveModal('service')} className={`modalButton ${activeModal === 'service' ? 'active' : ''}`}>
                            서비스
                        </button>
                        <button onClick={() => setActiveModal('area')} className={`modalButton ${activeModal === 'area' ? 'active' : ''}`}>
                            지역
                        </button>
                    </div>
                    {/* 현재 활성화된 모달에 따라 렌더링 */}
                    {activeModal === 'service' && <ServiceModal handleServiceSelect={handleServiceSelect} />}
                    {activeModal === 'area' && <AreaModal handleAreaSelect={handleAreaSelect} />}
                </div>
            </div>
        </div>
    );
};

export default ServiceAreaModal;
