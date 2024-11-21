import React from 'react';
import '../../../css/admin/Membership.css'; 

const ProList = () => {
    // 테이블 데이터
    const tableData = [
        {
            id: 2,
            name: '정진범',
            category: '청소/이사',
            gender: '남자',
            rating: 4.4,
            approvalDate: '2024.11.11',
            backupDate: '2024.11.15',
            status: '승인',
        },
        {
            id: 1,
            name: '윤강준',
            category: '청소/이사',
            gender: '남자',
            rating: 1.2,
            approvalDate: '2024.11.11',
            backupDate: '2024.11.20',
            status: '박탈',
        },
    ];

    // 상태에 따른 클래스 이름을 반환하는 함수
    const getStatusBadgeClass = (status) =>
        `status-badge ${status === '승인' ? 'approved' : 'revoked'}`;

    return (
        <div className="membership-container">
            <div className='membership-inner-container'>
            <h2 className="membership-title">고수 관리 | 멋지고 캡짱 지리는 고수 형님덜</h2>

            <div className="membership-container">
                <hr className="membership-divider" />
                    <table className="membership-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>카테고리</th>
                                <th>성별</th>
                                <th>별점</th>
                                <th>승인 날짜</th>
                                <th>백업 날짜</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.category}</td>
                                    <td>{row.gender}</td>
                                    <td>{row.rating}</td>
                                    <td>{row.approvalDate}</td>
                                    <td>{row.backupDate}</td>
                                    <td>
                                        <span className={getStatusBadgeClass(row.status)}>
                                            {row.status}
                                        </span>
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
