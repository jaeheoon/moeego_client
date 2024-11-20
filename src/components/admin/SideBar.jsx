import React from 'react';

const SideBar = () => {
    return (
        <div>
            <div>
                <div>MoeeGo</div>
                <ul>
                    <li>대시보드</li>
                    <li>고수 권한 승인</li>
                    <div>
                        <span>회원 관리</span>
                    </div>
                        <ul>
                            <li>일반 회원</li>
                            <li>고수 회원</li>
                            <li>탈퇴 회원</li>
                        </ul>
                    <li>이벤트 및 공지</li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
