import React from 'react';
import { Link } from 'react-router-dom';

const HeaderModal = ({ closeModal }) => {
    return (
        <div className='ToggleMenuListWrap' onClick={closeModal}>
            <div className='ToggleMenuList' onClick={(e) => e.stopPropagation()}>
                <div>김태훈 회원님</div>
                <div><Link to='/pro/search'>달인 찾기</Link></div>
                <div><Link to='/mypage'>마이페이지</Link></div>
                <div className='Logout'>
                    <div><Link to='/mypage'>로그아웃</Link></div>
                </div>
            </div>
        </div>
    );
};

export default HeaderModal;