import React from 'react';
import '../../css/admin/Event.css';

const EventWrite = () => {
    const handleCancel = () => {
        window.close(); // 현재 창을 닫음
    };

    return (
        <div className="event-write-container">
            <h3>이벤트 및 공지 등록</h3>
            <form>
                <div>
                    <label>제목</label>
                    <input type="text" name="subject" placeholder="제목을 입력하세요" />
                </div>
                <div>
                    <label>카테고리</label>
                    <select>
                        <option value="event">이벤트</option>
                        <option value="notice">공지</option>
                    </select>
                </div>
                <div>
                    <label>파일 첨부</label>
                    <input type="file" />
                </div>
                <div>
                    <label>내용</label>
                    <textarea placeholder="내용을 입력하세요"></textarea>
                </div>
                <div>
                    <button type="submit">등록</button>
                    <button type="button" onClick={handleCancel}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventWrite;
