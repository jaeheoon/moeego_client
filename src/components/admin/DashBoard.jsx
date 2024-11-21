import React, { useState } from 'react';
import '../../css/admin/DashBoard.css';
import people from '../../image/people.png';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

    const navigate = useNavigate(); // 경로 이동 훅

    const [eventCount] = useState(15); // 예시 데이터
    const [noticeCount] = useState(8); // 예시 데이터

    const handleEventClick = () => {
        alert(`현재 등록된 이벤트: ${eventCount}건`);
        // 여기에 모달이나 더 상세한 내용을 보여주는 로직 추가
    };

    const handleNoticeClick = () => {
        alert(`현재 등록된 공지사항: ${noticeCount}건`);
        // 여기에 모달이나 더 상세한 내용을 보여주는 로직 추가
    };

    return (
        <div className="adminDashBoard-container">
            <div className="adminDashBoard-wrapper">
                <div className="adminDashBoard-header">
                    <h1>대시보드 | 각종 이력을 간략히 확인할 수 있습니다.</h1>
                </div>
                <div className="adminDashBoard-list-section">
                    <div className="adminDashBoard-list-header">
                        <h4>List</h4>
                        <hr />
                    </div>
                    <div className="adminDashBoard-member-grid">
                        <div className="adminDashBoard-member-box" style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span>고수 회원</span><br />
                                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>554</span>
                                </div>
                                <div>
                                    <button
                                        className="adminDashBoard-count-button"
                                        onClick={() => navigate('/admin/ProList')}>
                                        <span>+</span>
                                    </button>
                                </div>
                            </div>
                            <img
                                src={people}
                                className="adminDashBoard-member-image"
                                alt="고수 회원 통계"
                            />
                        </div>

                        <div className="adminDashBoard-member-box" style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span>일반 회원</span><br />
                                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>51254</span>
                                </div>
                                <div>
                                    <button
                                        className="adminDashBoard-count-button"
                                        onClick={() => navigate('/admin/MemberList')}>
                                        <span>+</span>
                                    </button>
                                </div>
                            </div>
                            <img
                                src={people}
                                className="adminDashBoard-member-image"
                                alt="일반 회원 통계"
                            />
                        </div>

                        <div className="adminDashBoard-member-box" style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span>탈퇴 회원</span><br />
                                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#f44336' }}>165</span>
                                </div>
                                <div>
                                    <button
                                        className="adminDashBoard-count-button"
                                        onClick={() => navigate('/admin/LeaveMemberList')}>
                                        <span>+</span>
                                    </button>
                                </div>
                            </div>
                            <img
                                src={people}
                                className="adminDashBoard-member-image"
                                alt="탈퇴 회원 통계"
                            />
                        </div>
                    </div>
                </div>

                <div className="adminDashBoard-count-wrapper">
                    <div className="adminDashBoard-count-section">
                        <div className="adminDashBoard-count-header">
                            <p>이벤트 건수</p>
                            <div className="adminDashBoard-count-button-wrapper">
                                <button
                                    className="adminDashBoard-count-button"
                                    onClick={() => navigate('/admin/EventList')}>
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div className="adminDashBoard-count-section">
                        <div className="adminDashBoard-count-header">
                            <p>공지사항 건수</p>
                            <div className="adminDashBoard-count-button-wrapper">
                                <button
                                    className="adminDashBoard-count-button"
                                    onClick={() => navigate('/admin/EventList')}>
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;