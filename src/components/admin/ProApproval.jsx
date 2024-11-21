import React from 'react';
import '../../css/admin/ProApproval.css';

const GosuApproveTable = () => {
    const tableData = [
        { id: 10, name: '윤상수', description: '고수 시작추천요 ㅎㅎ', status: '미승인' },
        { id: 9, name: '주홍', description: '고수 시작하겠요 열심히!!', status: '미승인' },
        { id: 8, name: '김태윤', description: '고수 시작하겠요 열심히!!', status: '미승인' },
        { id: 7, name: '정진미', description: '고수 시작하겠요 열심히!!', status: '미승인' },
    ];

    return (
        <div className="approve-container">
            <div className='approve-inner-container'>
                <h2 className="approve-title">고수 권한 승인 | 고수가 되고 싶은가?</h2>
                <hr className="approve-divider" />
                <div className="table-container">
                    <table className="approve-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>한줄 소개</th>
                                <th>승인 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.description}</td>
                                    <td>
                                        <div className="status-badge">{row.status}</div>
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

export default GosuApproveTable;