import React, { useEffect, useState } from 'react';
import apiAxios from '../../../api/apiAxios';
import '../../../css/admin/Membership.css'; 

const ProList = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pro, setPro] = useState([]);

    // 고수 데이터 불러오기
    const fetchProData = async () => {
        try {
            const response = await apiAxios.get('/api/admin/member/pro');
            setPro(response.data || []);
        } catch (err) {
            console.error('API 호출 오류:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchProData(); // 데이터 초기 로드
    }, []);

    // 로딩 중일 때 UI 표시
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;

    // 박탈 날짜에 따른 상태 출력
    const getStatusClass = (depriveDate) => {
        return depriveDate ? 'pro-revoked' : 'pro-approved';
    };

    return (
        <div className="membership-container">
            <div className='membership-inner-container'>
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
                                <th>박탈 날짜</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pro.map((row) => (
                                <tr key={row.memberNo}>
                                    <td>{row.memberNo}</td>
                                    <td>{row.name}</td>
                                    <td>{row.mainCateName}</td>
                                    <td>⭐ {row.star}</td>
                                    <td>{row.accessDate}</td>
                                    <td>{row.depriveDate}</td>
                                    <td className={getStatusClass(row.depriveDate)}>
                                        {row.depriveDate ? '박탈' : '승인'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProList;
