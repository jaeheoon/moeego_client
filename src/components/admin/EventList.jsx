import React from 'react';
import '../../css/admin/EventList.css';

const EventList = () => {
    // 테이블 데이터
    const tableData = [
        {
            id: 1,
            eventName: '신규 회원 이벤트',
            content: '신규 회원가입 시 20% 할인 쿠폰 증정',
            registrationDate: '2024.11.20',
            views: 150,
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl">
                <h1 className="title">이벤트 및 공지 목록</h1>

                <div className="container">
                    <hr className="divider" />
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>이벤트명</th>
                                    <th>내용</th>
                                    <th>등록일</th>
                                    <th>조회수</th>
                                    <th>수정/삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.eventName}</td>
                                        <td>{row.content}</td>
                                        <td>{row.registrationDate}</td>
                                        <td>{row.views}</td>
                                        <td>
                                            <button className="edit-button">수정</button>
                                            <button className="delete-button">삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="button-container">
                        <button className="register-button">등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventList;
