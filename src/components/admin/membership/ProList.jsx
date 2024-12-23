import React, { useEffect, useState } from 'react';
import apiAxios from '../../../api/apiAxios';
import '../../../css/admin/Membership.css';

const ProList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pro, setPro] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const pageSize = 30; // 페이지 당 아이템 수 고정

    // 고수 데이터 불러오기
    const fetchProData = async (page = 1) => {
        try {
            const response = await apiAxios.get(`/api/admin/member/pro?page=${page}&size=${pageSize}`);
            const sortedPro = response.data ? response.data.content.sort((a, b) => new Date(b.accessDate) - new Date(a.accessDate)) : [];
            setPro(sortedPro);
            setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
            setCurrentPage(page); // 현재 페이지 업데이트
        } catch (err) {
            console.error('API 호출 오류:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 박탈 상태 변경
    const revokePro = async (memberNo, name) => {
        const confirm = window.confirm(`${name}님을 박탈하시겠습니까?`);
        if (confirm) {
            try {
                await apiAxios.post(`/api/admin/member/pro/cancel/${memberNo}`); // 박탈 처리 API 호출
                setPro(pro.map((row) => 
                    row.memberNo === memberNo ? { ...row, depriveDate: new Date().toISOString() } : row
                ));
            } catch (err) {
                console.error('박탈 처리 오류:', err);
                setError(err.message);
            }
        }
    };

    // 날짜 포맷팅
    const formatDate = (date) => {
        if (!date) return ''; // date가 null 또는 undefined일 경우 빈 문자열 반환
        const formattedDate = new Date(date).toLocaleDateString(); // 원하는 포맷으로 날짜 변환
        return formattedDate;
    };

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchProData(page); // 페이지 변경 시 데이터 불러오기
        }
    };

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchProData(currentPage); // 데이터 초기 로드
    }, [currentPage]);

    // 로딩 중일 때 UI 표시
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;

    return (
        <div className="membership-container">
            <div className="membership-inner-container">
                <h2 className="membership-title">👑 고수 관리 👑</h2>

                <div className="membership-table-wrapper">
                    <hr className="membership-divider" />
                    <table className="membership-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>카테고리</th>
                                <th>별점</th>
                                <th>승인 날짜</th>
                                <th>작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pro.map((row) => (
                                <tr key={row.memberNo}>
                                    <td>{row.memberNo}</td>
                                    <td>{row.name}</td>
                                    <td>{row.mainCateName}</td>
                                    <td>⭐ {row.star}</td>
                                    <td>{formatDate(row.accessDate)}</td>
                                    <td>
                                        {!row.depriveDate && (
                                            <button
                                                onClick={() => revokePro(row.memberNo, row.name)} // 이름도 전달
                                                className="revoke-btn">
                                                박탈
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default ProList;
