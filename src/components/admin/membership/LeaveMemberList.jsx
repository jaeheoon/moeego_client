import React, { useEffect, useState } from 'react';
import apiAxios from '../../../api/apiAxios';
import '../../../css/admin/Membership.css'; 

const LeaveMemberList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [leave, setLeave] = useState([]);

    // 탈퇴 데이터 불러오기
    const fetchleaveData = async () => {
        try {
            const response = await apiAxios.get('/api/admin/member/cancel');
            // cancelDate를 기준으로 내림차순 정렬
            const sortedLeave = response.data ? response.data.sort((a, b) => new Date(b.cancelDate) - new Date(a.cancelDate)) : [];
            setLeave(sortedLeave);
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

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchleaveData(); // 데이터 초기 로드
    }, []);

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
            </div>
        </div>
    );
};

export default LeaveMemberList;
