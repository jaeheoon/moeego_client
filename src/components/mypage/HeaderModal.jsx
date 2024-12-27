import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/member/AuthContext';

const HeaderModal = ({ closeModal, closeAndAccessMenu, GoProAccess, loginStatus }) => {
    const { isLoggedIn, loginUser } = useContext(AuthContext);

    return (
        <div className='ToggleMenuListWrap' onClick={closeModal}>
            {isLoggedIn ? (
                <div className='ToggleMenuList' onClick={(e) => e.stopPropagation()}>
                    <div className='userInfoName'>{loginUser}님</div>
                    <div><Link to='/pro/search'>달인 찾기</Link></div>
                    <div><Link to='/mypage'>마이페이지</Link></div>
                    {loginStatus !== "ROLE_PRO" && loginStatus !== "ROLE_PEND_PRO" && loginStatus !== "ROLE_ADMIN" && loginStatus !== "ROLE_CANCEL_PRO" && loginStatus !== "ROLE_CANCEL" &&
                        <div className='proAccess' onClick={() => { GoProAccess() }}>달인 전환</div>
                    }
                    {loginStatus === "ROLE_PEND_PRO" &&
                        <div className='proAccess' onClick={() => { closeAndAccessMenu() }}>승인 대기</div>
                    }
                    <div className='Logout'>
                        <div><Link to='/logout'>로그아웃</Link></div>
                    </div>
                </div>
            ) : (
                <div className='ToggleMenuList' onClick={(e) => e.stopPropagation()}>
                    <div className='ToggleMenuListLink'><Link to='/login'>로그인을 해주세요</Link></div>
                    <div><Link to='/signup'>회원가입</Link></div>
                    <div><Link to='/pro/signup/main'>달인가입</Link></div>
                </div>
            )
            }
        </div >
    );
};

export default HeaderModal;