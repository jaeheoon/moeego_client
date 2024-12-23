import React, { useEffect, useState } from 'react';
import apiAxios from '../../../api/apiAxios';
import '../../../css/admin/Membership.css';

const LeaveMemberList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [leave, setLeave] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const pageSize = 30; // 페이지 당 아이템 수 고정

    // 탈퇴 데이터 불러오기
    const fetchLeaveData = async (page = 1) => {
        try {
            const response = await apiAxios.get(`/api/admin/member/cancel?page=${page}&size=${pageSize}`);
            const sortedLeave = response.data ? response.data.content.sort((a, b) => new Date(b.cancelDate) - new Date(a.cancelDate)) : [];
            setLeave(sortedLeave);
            setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
            setCurrentPage(page); // 현재 페이지 업데이트
        } catch (err) {
            console.error('API 호출 오류:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (date) => {
        if (!date) return '';  // 날짜가 없는 경우 빈 문자열 반환
        const formattedDate = new Date(date).toLocaleDateString('ko-KR'); // 'ko-KR'로 설정하여 한국식 날짜 형식으로 포맷
        return formattedDate;
    };

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchLeaveData(page); // 페이지 변경 시 데이터 불러오기
        }
    };

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchLeaveData(currentPage); // 데이터 초기 로드
    }, [currentPage]);

    // 로딩 중일 때 UI 표시
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;

    return (
        <div className="membership-container">
            <div className='membership-inner-container'>
                <h1 className="membership-title">👻 탈퇴 회원 관리 👻</h1>

                <div className="-table-wrapper">
                    <hr className="membership-divider" />
                    <div className="membership-table-container">
                        <table className="membership-table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>전화번호</th>
                                    <th>탈퇴 사유</th>
                                    <th>탈퇴 날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leave.map((row) => (
                                    <tr key={row.cancelNo}>
                                        <td>{row.cancelNo}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.reason}</td>
                                        <td>{formatDate(row.cancelDate)}</td> {/* 날짜 포맷 적용 */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 페이지 네비게이션 추가 */}
                <div className="membership-pagination">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}>이전</button>

                    {/* 페이지 번호 버튼 */}
                    {[...Array(totalPages).keys()].map((i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}>
                            {i + 1}
                        </button>
                    ))}

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}>다음</button>
                </div>
            </div>
        </div>
    );
};

export default LeaveMemberList;
