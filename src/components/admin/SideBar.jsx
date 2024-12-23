import React from 'react';
import { useSideBar } from '../../js/useSideBar';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/admin/SideBarStyle.css';

const SideBar = () => {
    const {
        isMemberSubmenuOpen,
        toggleMemberSubmenu,
    } = useSideBar();

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return (
        <div className="sidebar">
            <div>
                <div className="sidelogo-link" onClick={goHome}>
                    <div className="sidelogo">MoeeGo</div>
                </div>
                <ul className="menu-list">
                    <Link to='/admin/dashboard' className='sideBar-Link'>
                        <li className="menu-item">대시보드</li>
                    </Link>
                    <Link to='/admin/proapproval' className='sideBar-Link'>
                        <li className="menu-item">고수 권한 승인</li>
                    </Link>
                    <div>
                        <div
                            className="submenu-trigger"
                            onClick={toggleMemberSubmenu}
                        >
                            <span>회원 관리</span>
                        </div>

                        {isMemberSubmenuOpen && (
                            <ul className="submenu">
                                <Link to='/admin/memberlist' className='sideBar-Link'>
                                    <li className="submenu-item">일반 회원</li>
                                </Link>
                                <Link to='/admin/prolist' className='sideBar-Link'>
                                    <li className="submenu-item">고수 회원</li>
                                </Link>
                                <Link to='/admin/leavememberlist' className='sideBar-Link'>
                                    <li className="submenu-item">탈퇴 회원</li>
                                </Link>
                            </ul>
                        )}
                    </div>
                    <Link to='/admin/eventlist' className='sideBar-Link'>
                        <li className="menu-item">이벤트 및 공지</li>
                    </Link>
                    <Link to='/admin/logout' className='sideBar-Link'>
                        <li className="menu-item">로그아웃</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;