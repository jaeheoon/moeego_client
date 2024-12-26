import React, { useContext, useEffect, useState } from "react";
import apiAxios from "../../api/apiAxios";
import "../../css/Pro/ProInfo.css";
import { AuthContext } from '../../context/member/AuthContext';

const ProInfo = ({ proItem, serviceItem, service, prono }) => {
    const [address, setAddress] = useState("");
    const [reservationCount, setReservationCount] = useState(0); // 기본값을 0으로 설정
    const [isFavorite, setIsFavorite] = useState(false); // 찜 여부 상태 추가
    const [favoritePro, setFavoritePro] = useState([prono]);

    const userno = localStorage.getItem("userno");

    // 주소 추출
    useEffect(() => {
        if (proItem?.address) {
            const match = proItem.address.match(/.+?( \d+(?:-\d+)?)/);
            if (match) {
                setAddress(match[0].trim());
            } else {
                setAddress(proItem.address);
            }
        }
    }, [proItem?.proItemNo]);

    // 예약 수 조회 API 호출
    useEffect(() => {
        if (proItem && service) {
            apiAxios
                .get(`/api/reservation/total`, {
                    params: {
                        proItemNo: service.proItemNo,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        setReservationCount(response.data.data || 0);
                    } else {
                        setReservationCount(0);
                    }
                })
                .catch((error) => {
                    console.error("예약 수 조회 실패:", error);
                    setReservationCount(0);
                });
        }
    }, [proItem, service]);

    // 즐겨찾기 로드 API 호출
    useEffect(() => {
        const loadFavoritePro = async () => {
            try {
                const response = await apiAxios.get("/api/pro/favorite", {
                    params: { memberNo: userno, pg: 1 },
                });

                if (response.data.success) {
                    // 서버에서 받은 데이터를 통해 찜 여부를 설정
                    const favoriteProNos = response.data.data.content.map(
                        (item) => item.proNo
                    );
                    setIsFavorite(favoriteProNos.includes(prono)); // 프로 No가 목록에 포함되면 찜 상태
                } else {
                    setIsFavorite(false); // 데이터가 없으면 기본적으로 찜 아니라고 설정
                }
            } catch (error) {
                console.error("즐겨찾기 프로필 로드 실패:", error);
            }
        };

        loadFavoritePro(); // 비동기 함수 호출
    }, [userno, service.proItemNo]);

    // 찜하기 / 찜 해제 처리
    const handleFavoriteToggle = async () => {
        const apiUrl = "/api/pro/favorite";
        const method = isFavorite ? "delete" : "post"; // 찜 상태에 따라 메서드 결정

        // favoritePro가 배열인지 확인하고, 그렇지 않으면 빈 배열로 처리
        const proNoList =
            Array.isArray(favoritePro) && favoritePro.length > 0
                ? favoritePro
                : [favoritePro];

        // API 요청: `post`와 `delete` 모두 배열로 proNo를 전달
        const data =
            method === "delete"
                ? {
                    memberNo: userno,
                    proNo: proNoList, // 삭제할 proNo는 배열로 전달
                }
                : {
                    memberNo: userno,
                    proNo: proNoList[0], // POST는 단일 proNo 전달
                };

        try {
            // Axios 요청
            const response = await apiAxios({
                method: method,
                url: apiUrl,
                data: data,
            });

            // 서버 응답 성공 시 상태 업데이트
            setIsFavorite(!isFavorite);
        } catch (error) {
            // Axios 에러 처리
            if (error.response) {
                // 서버에서 응답을 반환한 경우
                const { status, data } = error.response;

                if (status === 400) {
                    alert(error.response.data.message);
                } else if (status === 401) {
                    alert("인증 오류입니다. 다시 로그인해주세요.");
                } else if (status === 404) {
                    alert("요청한 자원을 찾을 수 없습니다.");
                } else {
                    alert(
                        `서버 오류: ${data.message || "알 수 없는 오류가 발생했습니다."
                        }`
                    );
                }
            } else if (error.request) {
                // 요청이 서버에 도달하지 못한 경우
                console.error("요청 전송 실패:", error.request);
                alert("서버로부터 응답이 없습니다. 네트워크 상태를 확인하세요.");
            } else {
                // 그 외 오류 (예: 설정 문제)
                console.error("요청 구성 오류:", error.message);
                alert("요청 구성에 문제가 있습니다. 관리자에게 문의하세요.");
            }
        }
    };

    return (
        <div className="infoWrap">
            <div className="info-section-header">
                <h1 className="nickname">{proItem.name}</h1>
                <div className="icon-buttons">
                    <div
                        role="button"
                        className={`heart ${isFavorite ? "favorited" : "not-favorited"
                            }`} // Conditionally add the class based on isFavorite
                        onClick={handleFavoriteToggle} // 버튼 클릭 시 찜하기/해제 처리
                    >
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                    stroke="#9e9e9e"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="info-sub-header">
                <div>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                                fill="#9e9e9e"
                            ></path>{" "}
                        </g>
                    </svg>
                    <div className="address">{address}</div>
                </div>
                <div className="category">
                    {proItem.mainCateName} ({service.subCategory.subCateName})
                </div>
            </div>
            <div className="introduce">{service.subject}</div>
            <div className="detail-info">
                <div className="statistics-info">
                    <div className="statistics-info-item">
                        <div className="statistics-info-item-header">
                            서비스 이용자
                        </div>
                        <div className="statistics-info-item-contents">
                            {reservationCount !== null
                                ? reservationCount + "명"
                                : "불러오는 중..."}
                        </div>
                    </div>
                    <div className="statistics-info-item">
                        <div className="statistics-info-item-header">리뷰</div>
                        <div className="statistics-info-item-contents">
                            <span style={{ color: "#f39c12" }}>★</span>
                            <span className="rate">
                                {Math.floor(proItem.star * 10) / 10}
                            </span>
                            <span className="count">
                                ({proItem.reviewCount})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProInfo;
