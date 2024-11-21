import React from 'react';
import '../../../css/admin/LeaveMemberList.css';

const LeaveMemberList = () => {
    // 테이블 데이터
    const tableData = [
        {
            id: 1,
            name: '김유진',
            email: 'kimyujin@example.com',
            phone: '010-1234-5678',
            leaveDate: '2024.11.18',
            leaveReason: '개인적인 사정',
        },
        {
            id: 2,
            name: '박세진',
            email: 'parksejin@example.com',
            phone: '010-2345-6789',
            leaveDate: '2024.11.17',
            leaveReason: '서비스 불만족',
        },
        {
            id: 3,
            name: '이하늘',
            email: 'leehaneul@example.com',
            phone: '010-3456-7890',
            leaveDate: '2024.11.16',
            leaveReason: '타 서비스 이용',
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl">
                <h1 className="title">탈퇴 회원 관리 | 떠난 고수들</h1>

                <div className="container">
                    <hr className="divider" />
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>전화번호</th>
                                    <th>탈퇴 날짜</th>
                                    <th>탈퇴 사유</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.leaveDate}</td>
                                        <td>{row.leaveReason}</td>
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
