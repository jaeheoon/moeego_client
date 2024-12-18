import React, { useContext, useEffect, useState } from 'react';
import ProInfo from './ProInfo';
import ProDetail from './ProDetail';
import ProReview from './ProReview';
import Reservation from './Reservation';
import "../../css/pro/ProView.css";
import "../../css/pro/SearchList.css";
import { ProContext } from '../../context/pro/ProContext';
import { useLocation } from 'react-router-dom';
import apiAxios from '../../api/apiAxios'; // apiAxios import 추가

const ProView = () => {
    const location = useLocation();
    const { item: routeStateItem, serviceItem } = location.state || {};

    const [modalType, setModalType] = useState(null);
    const [proItem, setProItem] = useState(null);
    const [service, setService] = useState(null);

    useEffect(() => {
        const fetchProDetails = async () => {
            try {
                setProItem(routeStateItem);
                const response = await apiAxios.get(`/api/pro/item/detail`, {
                    params: {
                        proItemNo: serviceItem.proItemNo,
                        pg: 1,
                    }
                });
                const fetchedItem = response.data.data;
                setService(fetchedItem);
            } catch (error) {
                console.error("프로 상세 정보 가져오기 실패:", error);
            }
        };

        fetchProDetails();
    }, []);

    const openModal = (type) => {
        setModalType((prevType) => (prevType === type ? null : type));
        document.body.style.overflow = type ? "hidden" : "auto";
    };

    const closeModal = () => {
        setModalType(null);
        document.body.style.overflow = "auto";
    };

    const handleModalClose = () => {
        setModalType(null);
        document.body.style.overflow = "auto";
    }

    if (!proItem) {
        return <div>로딩 중...</div>;
    }

    return (
        <section className="detail-view">
            {/* 기존 코드 유지 */}
            <section className="dalin-photo">
                <div className="dalin-photo-background">
                    <img
                        src={`https://kr.object.ncloudstorage.com/moeego/profile/${proItem.profileImage}`}
                        alt={proItem.name}
                        width="100"
                    />
                </div>
                <div className="dalin-photo-main">
                    <img
                        src={`https://kr.object.ncloudstorage.com/moeego/profile/${proItem.profileImage}`}
                        alt={proItem.name}
                        width="100"
                        height="100"
                    />
                </div>
            </section>
            <section className='detail-view-wrap'>
                <section className="dalin-mainpage">
                    <div className='leftWrap'>
                        <div className="reservationBtn-modal-wrap">
                            <div className='reservationBtn-modal-button-wrap'>
                                <input type="button" className="reservation-modalBtn" value="예약하기" onClick={() => openModal("reservation")} />
                            </div>
                        </div>
                        <div className={`ModalWrap ${modalType ? 'show' : ''}`} onClick={handleModalClose}>
                            {modalType === "reservation" && (
                                <Reservation closeModal={closeModal} proItem={proItem} serviceItem={serviceItem} service={service} />
                            )}
                        </div>
                        <ProInfo proItem={proItem} serviceItem={serviceItem} service={service} />
                        <ProDetail proItem={proItem} serviceItem={serviceItem} service={service} />
                        <ProReview proItem={proItem} serviceItem={serviceItem} service={service} />
                    </div>
                </section>
            </section>
        </section>
    );
};

export default ProView;