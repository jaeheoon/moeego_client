import React from 'react';
import '../../../css/admin/Membership.css'; 

const MemberList = () => {
    // Table data
    const tableData = [
        {
            id: 1,
            name: '김민수',
            email: 'kimminsu@example.com',
            gender: '남성',
            phone: '010-1111-2222',
            address: '서울시 강남구',
        },
        {
            id: 2,
            name: '박지현',
            email: 'parkjihyun@example.com',
            gender: '여성',
            phone: '010-2233-4455',
            address: '서울시 송파구',
        },
        {
            id: 3,
            name: '이정우',
            email: 'leejeongwoo@example.com',
            gender: '남성',
            phone: '010-3344-5566',
            address: '경기도 용인시',
        },
    ];

    return (
        <div className="membership-container">
            <div className='membership-inner-container'>
                <h2 className="membership-title">회원 관리 | 떠난 고수들</h2>

                <div className="membership-table-wrapper">
                    <hr className="membership-divider" />
                        <table className="membership-table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>성별</th>
                                    <th>전화번호</th>
                                    <th>주소</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.gender}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
};

export default MemberList;
