import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import "../../css/pro/Reservation.css";
import WeekCalendar from './WeekCalendar';

import apiAxios from "../../api/apiAxios";

const Reservation = ({ closeModal, proItem, serviceItem, service }) => {
    //------------------------------------
    const [userno, setUserno] = useState(localStorage.getItem("userno") || '');

    const [selectedDate, setSelectedDate] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});

    const handleTimeSelection = (time) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [time]: !prevCheckedItems[time],
        }));
    };

    const handleReservation = () => {
        if (!selectedDate) {
            alert('날짜를 선택해주세요!');
            return;
        }

        const selectedTimes = Object.keys(checkedItems).filter(time => checkedItems[time]);

        if (selectedTimes.length === 0) {
            alert('시간을 선택해주세요!');
            return;
        }

        const reservationData = {
            userno: userno,
            proNo: proItem.proNo,
            date: selectedDate,
            time: selectedTimes,
        };

        console.log('예약 정보:', reservationData);
        alert(reservationData.userno + ", " + reservationData.proNo + ", " + reservationData.date + ", " + reservationData.time)


        apiAxios
            .post('/api/reservation', reservationData)
            .then(response => {
                console.log('예약 성공:', response.data);
                alert('예약이 완료되었습니다.');
                closeModal();
            })
            .catch(error => {
                console.error('예약 실패:', error);
                alert('예약에 실패했습니다. 다시 시도해주세요.');
            });
    };

    return (
        <div className='reservation-wrap'>
            <div className="reservation-controller" onClick={closeModal}>
                <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="closeBtn">
                            <button className="reservation-modal-close" onClick={closeModal}>
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
                            <h3>
                                {service.subject}
                            </h3>
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
                                    <WeekCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                </div>
                            </div>
                            <div className="reservation-time">
                                <div className="reservation-timebox">
                                    <ul className="reservation-timelist">
                                        {[
                                            "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
                                            "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
                                        ].map((time, index) => (
                                            <li className="reservation-time-item" key={index} onClick={() => handleTimeSelection(time)} >
                                                <label className="custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        name="product-reservation-time"
                                                        value={time}
                                                        checked={checkedItems[time] || false}
                                                        onChange={() => handleTimeSelection(time)}
                                                    />
                                                    <span className="custom-checkbox-box" style={{ display: "none" }}></span>
                                                    <div className='pull' value={time}>{time}</div>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <div className="reservationBtn-wrap">
                            <button type="button" className="reservation-btn" onClick={handleReservation}>
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
