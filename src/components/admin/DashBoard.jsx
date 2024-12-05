import React, { useContext } from 'react';
import '../../css/admin/DashBoard.css';
import { useNavigate } from 'react-router-dom';
import MemberPieChart from './MemberPieChart';
import LineChart from './LineChart';
import { AdminContext } from '../../context/admin/AdminContext'; 

const DashBoard = () => {
    const navigate = useNavigate(); // 경로 이동 훅
    const { events, notices, weekData, expertData, allmemberData ,loading, error } = useContext(AdminContext);  // AdminContext에서 데이터 가져오기

    // 로딩 중일 때 처리
    if (loading) {
        return <div>Loading...</div>;
    }

    // 에러가 있을 경우 처리
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="adminDashBoard-container">
            <div className="adminDashBoard-wrapper">
                <div className="adminDashBoard-header">
                    <h1>대시보드 | 각종 이력을 간략히 확인할 수 있습니다.</h1>
                </div>
                <div className="chart-wrapper">
                    <LineChart data={weekData} expertData={expertData} /> {/* 라인 차트 */}
                    <MemberPieChart data={allmemberData}/> {/* 파이 차트 */}
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
