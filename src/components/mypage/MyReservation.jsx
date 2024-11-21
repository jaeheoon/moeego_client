import React from 'react';
import { Link } from 'react-router-dom';

const MyReservation = () => {
    return (
        <div className='MyReservationPage'>
            <div className='PageTitle'>
                <Link to="/mypage"><img src="../../src/image/prev_icon.png" alt="prev"></img></Link>
                <h1>예약 내역</h1>
            </div>
            <div>
                여기에 캘린더 API 삽입
            </div>
        </div>
    );
};

export default MyReservation;