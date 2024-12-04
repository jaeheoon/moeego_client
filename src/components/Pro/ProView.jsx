import React, { useContext, useEffect, useState } from 'react';
import ProInfo from './ProInfo';
import ProDetail from './ProDetail';
import ProReview from './ProReview';
import Reservation from './Reservation';
import "../../css/pro/ProView.css";
//---------------------------------
import { ProContext } from '../../context/pro/ProContext';
import { useLocation, useParams } from 'react-router-dom';

const ProView = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const proNo = queryParams.get('proNo');
    //const { id } = useParams(); 
    const { pro, updatePro } = useContext(ProContext); 

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

    useEffect(() => {
        const fetchData = async () => {
            // 예시 데이터 (API에서 데이터를 가져오는 로직으로 대체 가능)
            const fetchedData = {
                id: proNo,
                title: `프로필 제목 ${proNo}`,
                description: `상세 정보 for ${proNo}`,
                rating: 4.5,
                reviews: 1234
            };
            updatePro(fetchedData); // 데이터를 ProContext에 업데이트
        };

        fetchData();
    }, [proNo]);

    if (!pro) {
        return <div>로딩 중...</div>; // pro 데이터가 없으면 로딩 중 화면 표시
    }

    return (
        <section className="detail-view">
            <section className="dalin-photo">
                <div className="dalin-photo-background">
                    {/* <img src="../src/image/mc.jpg" alt="긴딩동" width="100" /> */}
                    <img src="/src/image/mc.jpg" alt="긴딩동" width="100" />
                </div>
                <div className="dalin-photo-main">
                    <img src="/src/image/mc.jpg" alt="딩동" width="100" height="100" />
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
                                <Reservation closeModal={closeModal} />
                            )}
                        </div>
                        <ProInfo pro={pro}/>
                        <ProDetail pro={pro}/>
                        <ProReview pro={pro}/>
                    </div>
                    {/* <div className='rightWrap'>
                        <div className='relativeWrap'>
                            <Reservation />
                        </div>
                    </div> */}
                </section>
            </section>
        </section>
    );
};

export default ProView;