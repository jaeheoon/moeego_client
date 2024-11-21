import React, { useState } from 'react';
import '../../css/admin/EventList.css';

const EventList = () => {
    const [newWindow, setNewWindow] = useState(null); // 새로운 창 상태 관리

    // 테이블 데이터
    const tableData = [
        {
            id: 2,
            category:'공지',
            imgName : 'img1.jpg',
            eventName: '공지 테스트',
            content: '공지 테스트',
            registrationDate: '2024.11.20',
            views: 150,
        },
        {
            id: 1,
            category:'이벤트',
            imgName : 'img5.jpg',
            eventName: '신규 회원 이벤트',
            content: '신규 회원가입 시 20% 할인 쿠폰 증정',
            registrationDate: '2024.11.20',
            views: 150,
        },
    ];

    // 새로운 창을 열기 위한 함수
    const openNewWriteWindow = () => {
        const openedWindow = window.open('/admin/event-write', '_blank', 'width=800,height=600');
        if (!openedWindow) {
            alert('팝업이 차단되었습니다. 팝업 차단을 해제해 주세요.');
        } else {
            setNewWindow(openedWindow); // 새로 연 창을 상태에 저장
        }
    };

    const openNewUpdateWindow = () => {
        const openedWindow = window.open('/admin/event-update', '_blank', 'width=800,height=600');
        if (!openedWindow) {
            alert('팝업이 차단되었습니다. 팝업 차단을 해제해 주세요.');
        } else {
            setNewWindow(openedWindow); // 새로 연 창을 상태에 저장
        }
    };

    return (
        <div className="eventList-container">
            <div className="eventList-inner-container">
                <h1 className="eventList-title">이벤트 및 공지 게시판</h1>

                <div className="eventList-table-wrapper">
                    <hr className="eventList-divider" />
                    <table className="eventList-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>카테고리</th>
                                <th>사진</th>
                                <th>제목</th>
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
                                    <td>{row.category}</td>
                                    <td>{row.imgName}</td>
                                    <td>{row.eventName}</td>
                                    <td>{row.content}</td>
                                    <td>{row.registrationDate}</td>
                                    <td>{row.views}</td>
                                    <td>
                                        <button className="eventList-edit-button" onClick={openNewUpdateWindow}>수정</button>
                                        <button className="eventList-delete-button">삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="eventList-button-container">
                    <button className="eventList-register-button" onClick={openNewWriteWindow}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default EventList;
