import React from 'react';
import { Link } from 'react-router-dom';
import MonthCalendar from './MonthCalendar';
import "../../css/mypage/MyReservation.css";

const MyReservation = () => {
    return (
        <div className='MyReservationPage'>
            <div className='MyReservationWrap'>
                <div className='PageTitle'>
                    <Link className='prev' to="/mypage">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>예약 내역</h1>
                </div>
                <div>
                    <MonthCalendar />
                </div>
            </div>
        </div>
    );
};

export default MyReservation;