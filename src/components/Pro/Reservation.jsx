import React, { useEffect, useState } from "react";
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
        // 예약 창이 열릴 때 selectedDate를 오늘 날짜로 설정
        const today = new Date();
        setSelectedDate(today);
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

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

            // 선택된 시간이 체크된 경우 'selected' 클래스를 추가
            return updatedCheckedItems;
        });
    };

    useEffect(() => {
        // 날짜가 변경될 때마다 예약 시간 체크 초기화
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
            initialCheckedItems[time] = false; // 체크 초기화
        });
        setCheckedItems(initialCheckedItems);
    }, [selectedDate]); // selectedDate가 변경될 때마다 실행

    useEffect(() => {
        apiAxios
            .get("/api/reservation", {
                params: {
                    proItemNo: service.proItemNo,
                },
            })
            .then((response) => {
                const data = response.data.data;

                // 날짜별로 시간 그룹화
                const groupedTimes = data.reduce((acc, curr) => {
                    const { startDate, startTime } = curr;
                    const time = startTime.slice(0, 5); // "HH:mm" 형식으로만 저장

                    if (!acc[startDate]) {
                        acc[startDate] = [];
                    }
                    acc[startDate].push(time); // 시간 문자열 "HH:mm:ss" -> "HH:mm"

                    return acc;
                }, {});

                setReservedTimes(groupedTimes); // 상태에 저장
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

        // 날짜 포맷 조정 (yyyy-MM-dd)
        const formattedDate = new Date(selectedDate);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
        const day = String(formattedDate.getDate()).padStart(2, "0");
        const formattedDateString = `${year}-${month}-${day}`;

        // 시간 포맷 조정 (HH:mm:ss)
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
                console.error("예약 실패:", error);
                alert("예약에 실패했습니다. 다시 시도해주세요.");
                window.location.reload();
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
                                    <Link to="#">이벤트</Link>
                                </li>
                                <li>
                                    <Link to="#">행사MC</Link>
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
                                    {service.price}원
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
                                                reservedTimes[
                                                    formattedDate
                                                ]?.includes(time);

                                            const isSelected =
                                                checkedItems[time] || false;

                                            return (
                                                <li
                                                    className={`reservation-time-item ${
                                                        isReserved
                                                            ? "disabled"
                                                            : ""
                                                    } ${
                                                        isSelected
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
                                                            disabled={
                                                                isReserved
                                                            }
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
