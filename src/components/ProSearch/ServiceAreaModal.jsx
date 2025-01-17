import React, { useEffect, useState } from 'react';
import ServiceModal from './ServiceModal';
import AreaModal from './AreaModal';
import '../../css/Pro/ServiceAreaModal.css';

const ServiceAreaModal = ({ onClose, activeModal, setActiveModal, handleServiceSelect, handleAreaSelect, initialArea }) => {
    const [selectedArea, setSelectedArea] = useState(initialArea || "지역");

    useEffect(() => {
        setSelectedArea(initialArea); // 초기 지역 설정
    }, [initialArea]);

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
                        <button onClick={() => setActiveModal('service')} className={`modalButton ${activeModal === 'service' ? 'active' : ''}`}>
                            서비스
                        </button>
                        <button onClick={() => setActiveModal('area')} className={`modalButton ${activeModal === 'area' ? 'active' : ''}`}>
                            지역
                        </button>
                    </div>
                    {/* 현재 활성화된 모달에 따라 렌더링 */}
                    {activeModal === 'service' && <ServiceModal handleServiceSelect={handleServiceSelect} />}
                    {activeModal === 'area' && <AreaModal handleAreaSelect={handleAreaSelect} initialArea={selectedArea} />}
                </div>
            </div>
        </div>
    );
};

export default ServiceAreaModal;

// import React from 'react';
// import ServiceModal from './ServiceModal';
// import AreaModal from './AreaModal';
// import '../../css/Pro/ServiceAreaModal.css';

// const ServiceAreaModal = ({ onClose, activeModal, setActiveModal, handleServiceSelect, handleAreaSelect }) => {
//     const handleOverlayClick = () => {
//         onClose(); // 오버레이 클릭 시 모달 닫기
//     };

//     return (
//         <div className='ServiceAreaModalWrap'>
//             <div className='ServiceAreaModalOverlay' onClick={handleOverlayClick}>
//                 <div className='ServiceAreaModal' onClick={(e) => e.stopPropagation()}> {/* 모달 내부 클릭 시 이벤트 전파 방지 */}
//                     <div className='closeButtonWrap'>
//                         <button className='closeButton' onClick={onClose}>✖</button> {/* 닫기 버튼 추가 */}
//                     </div>
//                     <div className='ServiceAreaModalHeader'>
//                         <button onClick={() => setActiveModal('service')} className={`modalButton ${activeModal === 'service' ? 'active' : ''}`}>
//                             서비스
//                         </button>
//                         <button onClick={() => setActiveModal('area')} className={`modalButton ${activeModal === 'area' ? 'active' : ''}`}>
//                             지역
//                         </button>
//                     </div>
//                     {/* 현재 활성화된 모달에 따라 렌더링 */}
//                     {activeModal === 'service' && <ServiceModal handleServiceSelect={handleServiceSelect} />}
//                     {activeModal === 'area' && <AreaModal handleAreaSelect={handleAreaSelect} />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ServiceAreaModal;
