import React from 'react';

const EventUpdate = () => {
    return (
        <div>
            <div>
                <h2>이벤트 공지 | 이벤트 하면 개꿀인데 이걸 안해?</h2>
            </div>
            <div>
                <hr/>
                <div>
                    <h3>이벤트 및 공지 수정</h3>
                    <form>
                        <div>
                            <label>이벤트 명</label>
                            <input text='text' name='subject' value='' placeholder='PT30회 10만원 개꿀이지? 컴온 ㄱㄱ'/>
                            
                            <label>카테고리</label>
                            <select value='' >
                                <option value="event">이벤트</option>
                                <option value="notice">공지</option>
                            </select>
                            
                            <label>파일 첨부</label>
                            <input type="file" />
                            <p>이미지 사진</p>
                        </div>
                        <div>
                            <label>내용</label>
                            <textarea value='' placeholder='이거 PT 받으면 IFBB 프로 카드 딴다 ㅋㅋ'></textarea>
                        </div>

                        <div>
                            <button type='submit'>수정</button>
                            <button type='button'>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventUpdate;