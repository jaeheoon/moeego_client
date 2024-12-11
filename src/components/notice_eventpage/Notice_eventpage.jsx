import React from 'react';
import Notice from './Notice';
import Event from './Event';
import '../../css/notice/notice_event.css';
import { Link } from 'react-router-dom';
import LifeTopic from '../articles/FreeBoardForm/LifeTopic';

const Notice_eventPage = () => {

    return (
        <div className='Notice_eventPage'>
            <h1>공지사항 / 이벤트</h1>
            <div className='noticePageWrap'>
                <div className='noticeLifeWrap'>
                    <LifeTopic/>
                </div>
                <div className='noticeEventListWrap'>
                    <div className='noticeListWrap'>
                        <Notice />
                    </div>
                    <div className='eventListWrap'>
                        <Event />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notice_eventPage;