import React, { useContext, useEffect, useState } from 'react';
import apiAxios from '../../../api/apiAxios';
import '../../../css/admin/Membership.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/member/AuthContext';

const MemberList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [member, setMember] = useState([]); // 회원 데이터
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const pageSize = 20; // 페이지 당 20개 아이템

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
    }, [navigate]);

    // 회원 데이터 불러오기
    const fetchMemberData = async (page = 1) => {
        try {
            const response = await apiAxios.get(`/api/admin/member/user?page=${page}&size=${pageSize}`);
            setMember(response.data.content || []); // 페이지에 해당하는 데이터
            setTotalPages(response.data.totalPages); // 전체 페이지 수
            setCurrentPage(page); // 현재 페이지 업데이트
        } catch (err) {
            console.error('API 호출 오류:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchMemberData(currentPage); // 데이터 초기 로드
    }, [currentPage]);

    // 로딩 중일 때 UI 표시
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;

    // 날짜 형식 변환 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR'); // 한국 형식으로 날짜 출력
    };

    // 이메일 도메인 파싱 함수
    const parseEmail = (email) => {
        if (email.includes('naver ')) {
            return '네이버 이메일';
        } else if (email.includes('kakao ')) {
            return '카카오 이메일';
        }
        return email; // 나머지 이메일은 그대로 반환
    };

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
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

    return (
        <div className="membership-container">
            <div className='membership-inner-container'>
                <h2 className="membership-title">👫 회원 관리 👫</h2>

                <div className="membership-table-wrapper">
                    <hr className="membership-divider" />
                    <table className="membership-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>주소</th>
                                <th>가입 날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {member.map((row) => (
                                <tr key={row.memberNo}>
                                    <td>{row.memberNo}</td>
                                    <td>{row.name}</td>
                                    <td>{parseEmail(row.email)}</td> {/* 이메일 파싱 */}
                                    <td>{row.phone}</td>
                                    <td>{row.address}</td>
                                    <td>{formatDate(row.joinDate)}</td> {/* 날짜 형식 변환 */}
                                </tr>
                            ))}
                        </tbody>
                    </table>

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
        </div>
    );
};

export default MemberList;
