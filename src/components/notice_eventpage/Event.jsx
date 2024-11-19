import React from 'react';
import Notice_eventMenu from './Notice_eventMenu';

const Event = () => {
    return (
        <div className='eventPage'>
            <Notice_eventMenu/>
            <div className='eventListWrap'>
                <div>제목(모이고가 경품 쏜다! 경품 이벤트)</div>
                <div>4개정도 DB에서 map으로 뽑아서</div>
            </div>
        </div>
    );
};

export default Event;