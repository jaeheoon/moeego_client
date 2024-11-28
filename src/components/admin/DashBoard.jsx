import React, { useState } from 'react';
import '../../css/admin/DashBoard.css';
import { useNavigate } from 'react-router-dom';
import MemberPieChart from './MemberPieChart';
import LineChart from './LineChart';

const DashBoard = () => {
    const navigate = useNavigate(); // 경로 이동 훅

    // 예제 데이터
    const [events, setEvents] = useState([
        { id: 1, title: 'Event 1', subject: 'subject1', view: 20, date: '2024-11-21' },
        { id: 2, title: 'Event 2', subject: 'subject2', view: 30, date: '2024-11-22' },
        { id: 3, title: 'Event 3', subject: 'subject3', view: 10, date: '2024-11-23' },
        { id: 4, title: 'Event 4', subject: 'subject4', view: 50, date: '2024-11-24' },
        { id: 4, title: 'Event 4', subject: 'subject4', view: 50, date: '2024-11-24' },
        { id: 4, title: 'Event 4', subject: 'subject4', view: 50, date: '2024-11-24' },
        { id: 4, title: 'Event 4', subject: 'subject4', view: 50, date: '2024-11-24' },
        { id: 4, title: 'Event 4', subject: 'subject4', view: 50, date: '2024-11-24' },
        { id: 4, title: 'Event 4', subject: 'subject4', view: 50, date: '2024-11-24' },
        { id: 4, title: 'Event 4', subject: 'subject4', view: 50, date: '2024-11-24' },
        { id: 4, title: 'Event 4', subject: 'subject4', view: 50, date: '2024-11-24' },
    ]);

    const [notices, setNotices] = useState([
        { id: 1, title: 'Notice 1', subject: 'subject1', view: 50, date: '2024-11-21' },
        { id: 2, title: 'Notice 2', subject: 'subject2', view: 30, date: '2024-11-22' },
        { id: 3, title: 'Notice 3', subject: 'subject3', view: 280, date: '2024-11-23' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
        { id: 4, title: 'Notice 4', subject: 'subject4', view: 60, date: '2024-11-24' },
    ]);

    // 일주일 동안 회원 가입 수 데이터 (예시)
    const weekData = [
        { date: '11.21', count: 5 },
        { date: '11.22', count: 8 },
        { date: '11.23', count: 3 },
        { date: '11.24', count: 10 },
        { date: '11.25', count: 4 },
        { date: '11.26', count: 6 },
        { date: '11.27', count: 7 }
    ];

    const expertData = [
        { date: '11.21', count: 2 },
        { date: '11.22', count: 3 },
        { date: '11.23', count: 1 },
        { date: '11.24', count: 5 },
        { date: '11.25', count: 2 },
        { date: '11.26', count: 4 },
        { date: '11.27', count: 3 },
    ];

    return (
        <div className="adminDashBoard-container">
            <div className="adminDashBoard-wrapper">
                <div className="adminDashBoard-header">
                    <h1>대시보드 | 각종 이력을 간략히 확인할 수 있습니다.</h1>
                </div>
                <div className="chart-wrapper">
                    <LineChart data={weekData} expertData={expertData} /> {/* 라인 차트 */}
                    <MemberPieChart /> {/* 파이 차트 */}
                </div>

                <div className="adminDashBoard-count-wrapper">
                    <div className="adminDashBoard-count-section">
                        <div className="adminDashBoard-count-header">
                            <p>인기 이벤트</p>
                            <div className="adminDashBoard-count-button-wrapper">
                                <button
                                    className="adminDashBoard-count-button"
                                    onClick={() => navigate('/admin/EventList')}>
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                        <table className="adminDashBoard-table">
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>내용</th>
                                    <th>조회수</th>
                                    <th>등록일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.slice(0, 3).map(event => (
                                    <tr key={event.id}>
                                        <td>{event.title}</td>
                                        <td>{event.subject}</td>
                                        <td>{event.view}</td>
                                        <td>{event.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="adminDashBoard-count-section">
                        <div className="adminDashBoard-count-header">
                            <p>인기 공지사항</p>
                            <div className="adminDashBoard-count-button-wrapper">
                                <button
                                    className="adminDashBoard-count-button"
                                    onClick={() => navigate('/admin/NoticeList')}>
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                        <table className="adminDashBoard-table">
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>내용</th>
                                    <th>조회수</th>
                                    <th>등록일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notices.slice(0, 3).map(notice => (
                                    <tr key={notice.id}>
                                        <td>{notice.title}</td>
                                        <td>{notice.subject}</td>
                                        <td>{notice.view}</td>
                                        <td>{notice.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
