import React, { useContext, useEffect, useState } from 'react';
import '../../css/admin/DashBoard.css';
import { useNavigate } from 'react-router-dom';
import MemberPieChart from './MemberPieChart';
import LineChart from './LineChart';
import apiAxios from '../../api/apiAxios';
import { AdminContext } from '../../context/admin/AdminContext'; 

const DashBoard = () => {
    const navigate = useNavigate();
    const { loading, setLoading, error, setError } = useContext(AdminContext);

    const [event, setEvent] = useState([]); // 이벤트 게시판 데이터
    const [notices, setNotices] = useState([]); // 공지사항 게시판 데이터
    const [weekMemberData, setWeekMemberData] = useState([]); // 일주일 회원 가입 수
    const [weekProData, setWeekProData] = useState([]); // 일주일 고수 회원 등록 수 ( 고수 )
    const [weekLeaveMemberData, setweekLeaveMemberData] = useState([]); // 일주일 탈퇴 회원 수

    const [memberData, setMemberData] = useState([]);
    const [proData, setProData] = useState([]);
    const [leaveData, setLeaveData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [eventRes, noticeRes, weekMemberDataRes, weekProDataRes, weekLeaveMemberDataRes, memberDataRes, proDataRes, leaveDataRes] =
                    await Promise.all([
                        //공지사항 및 이벤트
                        apiAxios.get('/api/article/event'),
                        apiAxios.get('/api/article/notices'),

                        //라인 차트
                        apiAxios.get('/api/admin/weekmember'),
                        apiAxios.get('/api/admin/weekpro'),
                        apiAxios.get('/api/admin/weekleave'),

                        //파이 차트
                        apiAxios.get('/api/admin/member'),
                        apiAxios.get('/api/admin/pro'),
                        apiAxios.get('/api/admin/leave'),
                    ]);

                setEvent(eventRes.data);
                setNotices(noticeRes.data);

                setWeekMemberData(weekMemberDataRes.data);
                setWeekProData(weekProDataRes.data);
                setweekLeaveMemberData(weekLeaveMemberDataRes.data);
                
                setMemberData(memberDataRes.data);
                setProData(proDataRes.data);
                setLeaveData(leaveDataRes.data);
                

                setError(null); // 에러 초기화
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setLoading, setError]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;


    return (
        <div className="adminDashBoard-container">
            <div className="adminDashBoard-wrapper">
                <div className="adminDashBoard-header">
                    <h1>대시보드 | 각종 이력을 간략히 확인할 수 있습니다.</h1>
                </div>
                <div className="chart-wrapper">
                    <LineChart weekMemberData={weekMemberData} weekProData={weekProData} weekLeaveMemberData={weekLeaveMemberData} />
                    <MemberPieChart memberData={memberData} proData={proData} leaveData={leaveData}/>
                </div>

                <div className="adminDashBoard-count-wrapper">
                    <div className="adminDashBoard-count-section">
                        <div className="adminDashBoard-count-header">
                            <p>인기 이벤트</p>
                            <div className="adminDashBoard-count-button-wrapper">
                                <button
                                    className="adminDashBoard-count-button"
                                    onClick={() => navigate('/admin/eventlist')}>
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
                                {event && event.content && event.content.length > 0 ? event.content
                                    .sort((a, b) => b.view - a.view)
                                    .slice(0, 3)
                                    .map(event => (
                                        <tr key={event.articleNo}>
                                            <td>{event.subject}</td>
                                            <td>{event.content}</td>
                                            <td>{event.view}</td>
                                            <td>{event.writeDate}</td>
                                        </tr>
                                    )) : <tr><td colSpan="4">데이터가 없습니다.</td></tr>}
                            </tbody>
                        </table>
                    </div>

                    <div className="adminDashBoard-count-section">
                        <div className="adminDashBoard-count-header">
                            <p>인기 공지사항</p>
                            <div className="adminDashBoard-count-button-wrapper">
                                <button
                                    className="adminDashBoard-count-button"
                                    onClick={() => navigate('/admin/eventlist')}>
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
                                {notices.content && notices.content.length > 0 ? notices.content
                                    .sort((a, b) => b.view - a.view)
                                    .slice(0, 3)
                                    .map(notice => (
                                        <tr key={notice.articleNo}>
                                            <td>{notice.subject}</td>
                                            <td>{notice.content}</td>
                                            <td>{notice.view}</td>
                                            <td>{notice.writeDate}</td>
                                        </tr>
                                    )) : <tr><td colSpan="4">데이터가 없습니다.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
