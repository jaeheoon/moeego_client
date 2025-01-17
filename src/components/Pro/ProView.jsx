import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios"; // apiAxios import 추가
import ProInfo from "./ProInfo";
import ProDetail from "./ProDetail";
import ProReview from "./ProReview";
import Reservation from "./Reservation";
import ProViewPaging from "../Pro/ProViewPaging";
import "../../css/Pro/Proview.css";
import "../../css/Pro/SearchList.css";

const ProView = () => {
    const location = useLocation();
    const {
        item: routeStateItem = [],
        serviceItem = {},
        proNo = null,
    } = location.state || {};

    const [modalType, setModalType] = useState(null);
    const [proItem, setProItem] = useState(routeStateItem || {});
    const [service, setService] = useState(serviceItem || []);
    const [prono, setProno] = useState(proNo || []);
    const [reviewData, setReviewData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const [isFunction, setIsFunction] = useState(false);

    const navigate = useNavigate();

    // 로그인 상태 확인
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("login"); // 로그인 여부 확인
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login"); // 로그인 페이지로 리다이렉트
        } else {
            fetchProDetails(); // 로그인 상태일 경우에만 프로 정보를 가져옴
        }
    }, []); // 페이지 로드 시 한 번만 실행

    // 프로 상세 정보 가져오는 함수
    const fetchProDetails = async () => {
        try {
            setProItem(routeStateItem);
            setService(serviceItem);
            setProno(proNo);

            const response = await apiAxios.get(`/api/pro/item/detail`, {
                params: {
                    proItemNo: serviceItem.proItemNo,
                    pg: currentPage, // Include the current page in the request
                },
            });

            const fetchedItem = response.data.data.content;
            setReviewData(fetchedItem);
            setTotalPages(response.data.data.totalPages); // Set total pages
        } catch (error) {
            console.error("프로 상세 정보 가져오기 실패:", error);
            alert("프로 상세 정보를 가져오는 데 실패했습니다.");
        }
    };

    // currentPage 변경 시 프로 정보를 다시 가져옴
    useEffect(() => {
        if (serviceItem.proItemNo) {
            fetchProDetails();
        }
    }, [currentPage]); // currentPage가 변경될 때마다 실행

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
    };

    if (!proItem || !reviewData) {
        return <div>로딩 중...</div>;
    }

    const handlePageChange = (page) => {
        setCurrentPage(page); // Change page on pagination
    };

    return (
        <section className="detail-view">
            <section className="dalin-photo">
                <div className="dalin-photo-background">
                    <img
                        src={
                            proItem.profileImage
                                ? proItem.profileImage.startsWith("https://")
                                    ? proItem.profileImage // https://로 시작하면 그대로 사용
                                    : `https://kr.object.ncloudstorage.com/moeego/profile/${proItem.profileImage}` // 아니면 경로 추가
                                : "/image/default.svg" // profileImage가 없으면 기본 이미지 사용
                        }
                        alt={proItem.name}
                        width="100"
                    />
                </div>
                <div className="dalin-photo-main">
                    <img
                        src={
                            proItem.profileImage
                                ? proItem.profileImage.startsWith("https://")
                                    ? proItem.profileImage // https://로 시작하면 그대로 사용
                                    : `https://kr.object.ncloudstorage.com/moeego/profile/${proItem.profileImage}` // 아니면 경로 추가
                                : "/image/default.svg" // profileImage가 없으면 기본 이미지 사용
                        }
                        style={{ backgroundColor: "#fff" }}
                        alt={proItem.name}
                        width="100"
                        height="100"
                    />
                </div>
            </section>
            <section className="detail-view-wrap">
                <section className="dalin-mainpage">
                    <div className="leftWrap">
                        <div className="reservationBtn-modal-wrap">
                            <div className="reservationBtn-modal-button-wrap">
                                <input
                                    type="button"
                                    className="reservation-modalBtn"
                                    value="예약하기"
                                    onClick={() => openModal("reservation")}
                                />
                            </div>
                        </div>
                        <div
                            className={`ModalWrap ${modalType ? "show" : ""}`}
                            onClick={handleModalClose}
                        >
                            {modalType === "reservation" && (
                                <Reservation
                                    closeModal={closeModal}
                                    proItem={proItem}
                                    service={service}
                                    review={reviewData}
                                />
                            )}
                        </div>
                        <ProInfo
                            proItem={proItem}
                            service={service}
                            review={reviewData}
                            prono={prono}
                        />
                        <ProDetail
                            proItem={proItem}
                            service={service}
                            review={reviewData}
                        />
                        <ProReview
                            proItem={proItem}
                            service={service}
                            review={reviewData}
                        />

                        {/* Pagination Component */}
                        <ProViewPaging
                            pages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </section>
            </section>
        </section>
    );
};

export default ProView;
