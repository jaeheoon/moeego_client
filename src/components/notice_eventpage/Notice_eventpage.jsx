import React from 'react';
import Notice from './Notice';
import Event from './Event';

const Notice_eventPage = () => {
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
                <Notice/>
            </div>
            <div className='eventListWrap'>
                <Event/>
            </div>
        </div>
    );
};

export default Notice_eventPage;