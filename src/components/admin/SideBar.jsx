import React from 'react';
import '../../css/admin/SideBar.css';
import { useSideBar } from '../../css/admin/useSideBar';

const SideBar = () => {
    const { 
        isMemberSubmenuOpen, 
        toggleMemberSubmenu, 
        isEventSubmenuOpen, 
        toggleEventSubmenu 
    } = useSideBar();

    return (
        <div className="sidebar">
            <div>
                <div className="sidelogo">MoeeGo</div>
                <ul className="menu-list">
                    <li className="menu-item">대시보드</li>
                    <li className="menu-item">고수 권한 승인</li>
                    <div>
                        <div 
                            className="submenu-trigger"
                            onClick={toggleMemberSubmenu}
                        >
                            <span>회원 관리</span>
                        </div>
                        
                        {isMemberSubmenuOpen && (
                            <ul className="submenu">
                                <li className="submenu-item">일반 회원</li>
                                <li className="submenu-item">고수 회원</li>
                                <li className="submenu-item">탈퇴 회원</li>
                            </ul>
                        )}
                    </div>
                    <div>
                        <div 
                            className="submenu-trigger"
                            onClick={toggleEventSubmenu}
                        >
                            <span>이벤트 및 공지</span>
                        </div>
                        
                        {isEventSubmenuOpen && (
                            <ul className="submenu">
                                <li className="submenu-item">이벤트 게시판</li>
                                <li className="submenu-item">공지 게시판</li>
                            </ul>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;