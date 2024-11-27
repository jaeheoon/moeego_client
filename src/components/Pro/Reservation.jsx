import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import "../../css/pro/Reservation.css";

const Reservation = ({ closeModal }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className='reservation-wrap'>
            <div className="reservation-controller">
                <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div class="closeBtn">
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
                        [유튜브 4,000만 조회수] 
                        운동하는 물리치료사 김동우의 진짜 헬스케어
                    </h3>
                </section>
                <section>
                    <div className="product-options">
                        <div className="options-wrapper">
                            [모이고 한정] 체험 수업 1회 (55,000 원)
                        </div>
                        <div className="product-reservation-date">
                            <ul className="picker-items">
                                {[
                                    { day: "오늘", value: "2024-11-18" },
                                    { day: "화", value: "2024-11-19" },
                                    { day: "수", value: "2024-11-20" },
                                    { day: "목", value: "2024-11-21" },
                                    { day: "금", value: "2024-11-22" },
                                    { day: "토", value: "2024-11-23" },
                                    { day: "일", value: "2024-11-24" },
                                ].map((item, index) => (
                                    <li className="picker-item" key={index}>
                                        <label className="custom-radio">
                                            <input type="radio" name="date-picker" value={item.value} />
                                            <span className="custom-radio-box" style={{ display: "none" }}></span>
                                            <span className="day-text">{item.day}</span>
                                            <span className="date-text">{item.value.slice(-2)}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="btn-controller">
                            <button className="btn-prev">
                                {/* Add your SVG here */}
                            </button>
                            <button className="btn-next">
                                {/* Add your SVG here */}
                            </button>
                        </div>
                    </div>
                    <div className="reservation-time">
                        <div className="reservation-timebox">
                            <ul className="reservation-timelist">
                                {[
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
                                
                                ].map((time, index) => (
                                    <li className="reservation-time-item" key={index}>
                                        {/* <label className="custom-checkbox"> */}
                                        <label className="custom-checkbox" >
                                            <input type="checkbox" name="product-reservation-time" value={time} />
                                            {/* <span className="custom-checkbox-box"></span> */}
                                            <span className="custom-checkbox-box" style={{ display: "none" }}></span>
                                            <div className='pull'>{time}</div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="reservationBtn-wrap">
                        <button type="button" className="reservation-btn">
                            예약하기
                        </button>
                    </div>
                    <br />
                </section>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Reservation;
