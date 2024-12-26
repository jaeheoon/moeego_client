import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Pro/Reservation.css";
import WeekCalendar from "./WeekCalendar";
import apiAxios from "../../api/apiAxios";

const Reservation = ({ closeModal, proItem, reivew, service }) => {
    const [userno, setUserno] = useState("");
    const [reservedTimes, setReservedTimes] = useState({});

    useEffect(() => {
        setUserno(localStorage.getItem("userno") || "");
    }, []);

    const [selectedDate, setSelectedDate] = useState(null);
    const [checkedItems, setCheckedItems] = useState(() => {
        const initialCheckedItems = {};
        [
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
        ].forEach((time) => {
            initialCheckedItems[time] = false; // 초기값을 false로 설정
        });
        return initialCheckedItems;
    });

    useEffect(() => {
        const today = new Date();
        setSelectedDate(today);
    }, []);

    const handleTimeSelection = (time) => {
        if (!selectedDate) {
            alert("날짜를 먼저 선택해주세요.");
            return;
        }

        const formattedDate = selectedDate.toISOString().split("T")[0];

        // 예약된 시간 확인
        if (reservedTimes[formattedDate]?.includes(time)) {
            alert("이미 예약된 시간입니다.");
            return;
        }

        setCheckedItems((prevCheckedItems) => {
            const updatedCheckedItems = {
                ...prevCheckedItems,
                [time]: !prevCheckedItems[time],
            };
            return updatedCheckedItems;
        });
    };

    useEffect(() => {
        const initialCheckedItems = {};
        [
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
        ].forEach((time) => {
            initialCheckedItems[time] = false;
        });
        setCheckedItems(initialCheckedItems);
    }, [selectedDate]);

    useEffect(() => {
        apiAxios
            .get("/api/reservation", {
                params: {
                    proNo: proItem.proNo,
                },
            })
            .then((response) => {
                const data = response.data.data;
                const today = new Date();
                const currentFormattedDate = today.toISOString().split("T")[0];
                const currentHour = today.getHours();

                // 예약 시간 및 현재 시간 이전의 시간 처리
                const groupedTimes = data.reduce((acc, curr) => {
                    const { startDate, startTimes } = curr;

                    // 예약된 시간만 추출
                    const times = startTimes.map((startTime) =>
                        startTime.slice(0, 5)
                    );

                    // 해당 날짜가 없으면 초기화
                    if (!acc[startDate]) {
                        acc[startDate] = [];
                    }

                    // 현재 시간 기준 이전 시간 추가
                    if (startDate === currentFormattedDate) {
                        const filteredTimes = times.filter(
                            (time) => parseInt(time.split(":")[0], 10) <= currentHour
                        );
                        acc[startDate] = [
                            ...acc[startDate],
                            ...filteredTimes,
                        ];
                    }

                    acc[startDate] = [...acc[startDate], ...times]; // 예약 시간 업데이트
                    return acc;
                }, {});

                // 현재 날짜 이전의 시간 비활성화 처리
                if (!groupedTimes[currentFormattedDate]) {
                    groupedTimes[currentFormattedDate] = [];
                }
                const pastTimes = [];
                for (let i = 0; i <= currentHour; i++) {
                    pastTimes.push(`${i.toString().padStart(2, "0")}:00`);
                }
                groupedTimes[currentFormattedDate] = [
                    ...new Set([...groupedTimes[currentFormattedDate], ...pastTimes]),
                ];

                setReservedTimes(groupedTimes); // 상태에 예약 시간 저장
            })
            .catch((error) => {
                console.error("예약 정보 로드 실패:", error);
                setReservedTimes({});
            });
    }, []);

    const handleReservation = () => {
        if (!selectedDate) {
            alert("날짜를 선택해주세요!");
            return;
        }

        const selectedTimes = Object.keys(checkedItems).filter(
            (time) => checkedItems[time]
        );

        if (selectedTimes.length === 0) {
            alert("시간을 선택해주세요!");
            return;
        }

        const formattedDate = new Date(selectedDate);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
        const day = String(formattedDate.getDate()).padStart(2, "0");
        const formattedDateString = `${year}-${month}-${day}`;

        const formattedTimes = selectedTimes.map((time) => {
            const [hour, minute] = time.split(":");
            return `${hour.padStart(2, "0")}:${minute}:00`; // "HH:mm:ss" 형식으로 변환
        });

        const reservationData = {
            memberNo: parseInt(userno), // 문자열을 숫자로 변환
            proItemNo: service.proItemNo,
            startDate: formattedDateString,
            startTimes: formattedTimes,
        };

        apiAxios
            .post("/api/reservation", reservationData)
            .then((response) => {
                console.log("예약 성공:", response.data);
                alert("예약이 완료되었습니다.");
                closeModal();
                window.location.reload();
            })
            .catch((error) => {
                if (error.response) {
                    const errorMessage =
                        error.response.data.message || "예약에 실패했습니다.";
                    alert(`예약 실패: ${errorMessage}`);
                } else if (error.request) {
                    alert("서버 응답 없음. 나중에 다시 시도해주세요.");
                } else {
                    alert("예약 실패: 시스템 오류. 다시 시도해주세요.");
                }
            });
    };

    return (
        <div className="reservation-wrap">
            <div className="reservation-controller" onClick={closeModal}>
                <div
                    className="modal-overlay"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content">
                        <div className="closeBtn">
                            <button
                                className="reservation-modal-close"
                                onClick={closeModal}
                            >
                                X
                            </button>
                        </div>
                        <section>
                            <ol>
                                <li>
                                    <Link to="#">{proItem.mainCateName}</Link>
                                </li>
                                <li>
                                    <Link to="#">{service.subCategory.subCateName}</Link>
                                </li>
                            </ol>
                        </section>
                        <section className="product-title">
                            <h3>{service.subject}</h3>
                        </section>
                        <section>
                            <div className="product-options">
                                <div className="options-wrapper">
                                    {service.content}
                                </div>
                                <div className="options-wrapper">
                                    {service.price.toLocaleString()}원
                                </div>
                                <div className="product-reservation-date">
                                    <WeekCalendar
                                        selectedDate={selectedDate}
                                        setSelectedDate={setSelectedDate}
                                    />
                                </div>
                            </div>
                            <div className="reservation-time">
                                <div className="reservation-timebox">
                                    <ul className="reservation-timelist">
                                        {[...Array(15)].map((_, index) => {
                                            const time = `${(9 + index)
                                                .toString()
                                                .padStart(2, "0")}:00`; // 9 -> 09로 처리

                                            const formattedDate = selectedDate
                                                ? selectedDate
                                                    .toISOString()
                                                    .split("T")[0]
                                                : null;

                                            const isReserved =
                                                formattedDate &&
                                                reservedTimes[formattedDate]?.includes(
                                                    time
                                                );

                                            const isSelected =
                                                checkedItems[time] || false;

                                            return (
                                                <li
                                                    className={`reservation-time-item ${isReserved
                                                        ? "disabled"
                                                        : ""
                                                        } ${isSelected
                                                            ? "selected"
                                                            : ""
                                                        }`}
                                                    key={index}
                                                >
                                                    <label className="custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            name="product-reservation-time"
                                                            value={time}
                                                            disabled={isReserved}
                                                            checked={isSelected}
                                                            onChange={() =>
                                                                handleTimeSelection(
                                                                    time
                                                                )
                                                            }
                                                        />
                                                        <span
                                                            className="custom-checkbox-box"
                                                            style={{
                                                                display: "none",
                                                            }}
                                                        ></span>
                                                        <div
                                                            className="pull"
                                                            value={time}
                                                        >
                                                            {time}
                                                        </div>
                                                    </label>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <div className="reservationBtn-wrap">
                            <button
                                type="button"
                                className="reservation-btn"
                                onClick={handleReservation}
                            >
                                예약하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
