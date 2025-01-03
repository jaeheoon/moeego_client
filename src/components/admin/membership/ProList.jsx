import React, { useContext, useEffect, useState } from 'react';
import apiAxios from '../../../api/apiAxios';
import '../../../css/admin/Membership.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/member/AuthContext';

const ProList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pro, setPro] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const pageSize = 20; // 페이지 당 아이템 수 고정

    const navigate = useNavigate();
    const { setIsLoggedIn, setLoginStatus } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태

    useEffect(() => {
        const checkLoginStatus = () => {
            const isLoggedIn = window.localStorage.getItem("login") === 'true'; // 로그인 상태 확인
            const memberStatus = window.localStorage.getItem("memberStatus"); // 관리자 여부 확인

            if (!isLoggedIn) {
                // 로그인하지 않은 경우
                navigate('/admin/login'); // 로그인 페이지로 리디렉션
            } else if (memberStatus !== "ROLE_ADMIN") {
                // 관리자가 아닌 경우
                alert("관리자만 접근할 수 있습니다.");
                navigate('/'); // 대시보드가 아닌 다른 페이지로 리디렉션
            } else {
                setIsAdmin(true); // 관리자인 경우
            }
        };

        checkLoginStatus();
    }, [navigate]); // `navigate`가 변경될 때마다 실행되도록 의존성 추가

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
            const reason = window.prompt("박탈 사유를 입력해주세요:", "불량 회원"); // 이유 입력받기
            
            if (reason) {  // 사용자가 이유를 입력한 경우에만 처리
                try {
                    // 박탈 처리 API 호출, 이유도 함께 전송
                    await apiAxios.post(`/api/admin/member/pro/cancel/${memberNo}`, { reason });
                    setPro(pro.map((row) => 
                        row.memberNo === memberNo ? { ...row, depriveDate: new Date().toISOString() } : row
                    ));

                    // 박탈 성공 메세지
                    alert(`${name}님이 박탈 되었습니다.`);
                } catch (err) {
                    console.error('박탈 처리 오류:', err);
                    setError(err.message);
                }
            } else {
                alert("박탈 사유를 입력해야 합니다.");
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

    // 페이지 범위 계산 함수
    const getPageRange = () => {
        const pageNumbers = [];
        const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
        const endPage = Math.min(startPage + 4, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
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
                <h2 className="membership-title">👑 달인 관리 👑</h2>

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
                    {getPageRange().map((i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={currentPage === i ? 'active' : ''}>
                            {i}
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
