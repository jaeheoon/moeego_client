import React from 'react';
import ServiceModal from '../modal/ServiceMoadal';
import AreaModal from '../../ProSearch/AreaModal';
import '../../../css/Pro/ServiceAreaModal.css';

const ServiceAreaModal = ({ onClose, activeModal, setActiveModal, handleServiceSelect, handleAreaSelect }) => {
    const handleOverlayClick = () => {
        onClose(); // 오버레이 클릭 시 모달 닫기
    };

    return (
        <div className='ServiceAreaModalWrap'>
            <div className='ServiceAreaModalOverlay' onClick={handleOverlayClick}>
                <div className='ServiceAreaModal' onClick={(e) => e.stopPropagation()}> {/* 모달 내부 클릭 시 이벤트 전파 방지 */}
                    <div className='closeButtonWrap'>
                        <button className='closeButton' onClick={onClose}>✖</button> {/* 닫기 버튼 추가 */}
                    </div>
                    <div className='ServiceAreaModalHeader'>
                        <div onClick={() => setActiveModal('service')} className={`modalButton ${activeModal === 'service' ? 'active' : ''}`}>
                            서비스
                        </div>
                        <div onClick={() => setActiveModal('area')} className={`modalButton ${activeModal === 'area' ? 'active' : ''}`}>
                            지역
                        </div>
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