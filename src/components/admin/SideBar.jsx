import React from 'react';
import '../../css/admin/SideBar.css';
import { useSideBar } from '../../js/useSideBar';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const { 
        isMemberSubmenuOpen, 
        toggleMemberSubmenu,
    } = useSideBar();

    return (
        <div className="sidebar">
            <div>
                <div className="sidelogo">MoeeGo</div>
                <ul className="menu-list">
                    <Link to='/admin/DashBoard' className='sideBar-Link'>
                        <li className="menu-item">대시보드</li>
                    </Link>
                    <Link to='/admin/ProApproval' className='sideBar-Link'>
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
                                <Link to='/admin/MemberList' className='sideBar-Link'>
                                    <li className="submenu-item">일반 회원</li>
                                </Link>
                                <Link to='/admin/ProList' className='sideBar-Link'>
                                    <li className="submenu-item">고수 회원</li>
                                </Link>
                                <Link to='/admin/LeaveMemberList' className='sideBar-Link'>
                                    <li className="submenu-item">탈퇴 회원</li>
                                </Link>
                            </ul>
                        )}
                    </div>
                    <Link to='/admin/EventList' className='sideBar-Link'>
                        <li className="menu-item">이벤트 및 공지</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;