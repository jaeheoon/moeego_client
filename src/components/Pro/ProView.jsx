import React, { useState } from 'react';
import ProInfo from './ProInfo';
import ProDetail from './ProDetail';
import ProReview from './ProReview';
import Reservation from './Reservation';
import "../../css/pro/ProView.css";

const ProView = () => {

    const [modalType, setModalType] = useState(null);

    const openModal = (type) => {
        setModalType((prevType) => (prevType === type ? null : type));
        if (type) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    const closeModal = () => {
        setModalType(null);
        document.body.style.overflow = "auto";
    };

    const handleModalClose = () => {
        setModalType(null);
        document.body.style.overflow = "auto";
    }

    return (
        <section className="detail-view">
            <section className="dalin-photo">
                <div className="dalin-photo-background">
                    <img src="../src/image/mc.jpg" alt="긴딩동" width="100" />
                </div>
                <div class="dalin-photo-main">
                    <img src="../src/image/mc.jpg" alt="딩동" width="100" height="100" />
                </div>
            </section>
            <section className='detail-view-wrap'>
                <div className="reservationBtn-modal-wrap">
                    <div className='reservationBtn-modal-button-wrap'>
                        <input type="button" className="reservation-modalBtn" value="예약하기" onClick={() => openModal("reservation")} />
                    </div>
                </div>
                <div className={`ModalWrap ${modalType ? 'show' : ''}`} onClick={handleModalClose}>
                    {modalType === "reservation" && (
                        <Reservation closeModal={closeModal} />
                    )}
                </div>
                <section class="dalin-mainpage">
                    <div className='leftWrap'>
                        <ProInfo />
                        <ProDetail />
                        <ProReview />
                    </div>
                    {/* <div className='rightWrap'>
                        <div className='relativeWrap'>
                            <Reservation />
                        </div>
                    </div> */}
                </section>
            </section>
        </section >
    );
};

export default ProView;