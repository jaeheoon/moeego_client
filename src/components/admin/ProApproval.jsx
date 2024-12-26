import React, { useState, useEffect } from 'react';
import '../../css/admin/ProApproval.css';
import apiAxios from '../../api/apiAxios';

const ProApproval = () => {
    // 상태 변수 정의
    const [approvedMember, setApprovedMember] = useState([]); // 승인 대기 중인 회원 데이터
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const pageSize = 5; // 페이지 당 아이템 수 고정

    // 승인 대기 중인 데이터 불러오기
    const fetchApprovalData = async (page = 1) => {
        try {
            const response = await apiAxios.get(`/api/admin/pro/approval?page=${page}&size=${pageSize}`);
            console.log('API 응답 데이터:', response.data); // API 응답 데이터 확인
            setApprovedMember(response.data || []); // 바로 response.data로 설정
            setTotalPages(response.data.totalPages || 1); // 전체 페이지 수 설정
            setCurrentPage(page); // 현재 페이지 업데이트
        } catch (err) {
            console.error('API 호출 오류:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    

    // 승인 처리 함수
    const handleApprove = async (memberNo, name) => {
        const isApproved = window.confirm(`${name}님을 승인하시겠습니까?`);
        if (isApproved) {
            try {
                await apiAxios.post(`/api/admin/pro/approve/${memberNo}`);
                fetchApprovalData(currentPage); // 승인 후 데이터 새로 고침
                alert(`${name}님이 고수 등록 되었습니다.`); // 승인 완료 후 알림
            } catch (err) {
                console.error('승인 처리 중 오류 발생:', err);
                setError(err.message);
            }
        }
    };

    // 취소 처리 함수
    const handleRevoke = async (memberNo, name) => {
        const isRevoked = window.confirm(`${name}님을 승인 취소 하시겠습니까?`);
        if (isRevoked) {
            try {
                await apiAxios.post(`/api/admin/pro/cancel/${memberNo}`);
                fetchApprovalData(currentPage); // 취소 후 데이터 새로 고침
                alert(`${name}님이 고수 승인 취소 되었습니다.`); // 취소 완료 후 알림
            } catch (err) {
                console.error('취소 처리 중 오류 발생:', err);
                setError(err.message);
            }
        }
    };

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchApprovalData(page); // 페이지 변경 시 데이터 불러오기
        }
    };

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchApprovalData(currentPage); // 데이터 초기 로드
    }, [currentPage]);

    // 로딩 중일 때 UI 표시
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;
    
    return (
        <div className="proApproval-approve-container">
            <div className="proApproval-approve-inner-container">
                <h2 className="proApproval-approve-title">고수 권한 승인 | 고수가 되고 싶은가?</h2>
                <hr className="proApproval-approve-divider" />
                <div className="proApproval-table-container">
                    <table className="proApproval-approve-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>카테고리명</th>
                                <th>한줄 소개</th>
                                <th>서비스 소개</th>
                                <th>작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedMember.length === 0 ? (
                                <tr>
                                    <td colSpan="6">승인 대기 중인 회원이 없습니다.</td>
                                </tr>
                            ) : (
                                approvedMember.map((row) => (
                                    <tr key={row.memberNo}>
                                        <td>{row.memberNo}</td>
                                        <td>{row.name}</td>
                                        <td>{row.cate_name}</td>
                                        <td>{row.oneIntro}</td>
                                        <td>{row.intro}</td>
                                        <td>
                                            <button
                                                onClick={() => handleApprove(row.memberNo, row.name)}
                                                className="approve-btn"
                                            >
                                                승인
                                            </button>
                                            <button
                                                onClick={() => handleRevoke(row.memberNo, row.name)}
                                                className="revoke-btn"
                                            >
                                                취소
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 페이지 네비게이션 추가 */}
                <div className="proApproval-pagination">
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

export default ProApproval;
