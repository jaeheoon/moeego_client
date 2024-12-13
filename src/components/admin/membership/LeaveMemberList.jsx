import React, { useEffect, useState } from 'react';
import apiAxios from '../../../api/apiAxios';
import '../../../css/admin/Membership.css'; 

const LeaveMemberList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [leave, setLeave] = useState([]);


    // 고수 데이터 불러오기
    const fetchleaveData = async () => {
        try {
            const response = await apiAxios.get('/api/admin/member/cancel');
            setLeave(response.data || []);
            
        } catch (err) {
            console.error('API 호출 오류:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                                        <td>{row.cancelDate}</td>
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
