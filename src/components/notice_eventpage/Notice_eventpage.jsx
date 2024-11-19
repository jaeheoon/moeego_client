import React from 'react';

const Notice_eventpage = () => {
    return (
        <div className='Notice_eventPage'>
            <div className=''></div>
            <h2>공지사항 / 이벤트</h2>
            <ul>
                <li>전체글</li>
                <li>공지글</li>
                <li>이벤트</li>
            </ul>
            <div className='noticeListWrap'>
                <p>공지사항</p>
                <ul>
                    <li>
                        map 돌려서 찍기
                    </li>
                </ul>
            </div>
            <div className='eventListWrap'>
                <p>이벤트</p>
                <ul>
                    <li>
                        map 돌려서 찍기
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Notice_eventpage;