import React from 'react';
import Notice_eventMenu from './Notice_eventMenu';

const Notice = () => {
    return (
        <div className='noticePage'>
            <Notice_eventMenu/>
            <ul>
                <li>
                    <div>
                        공지 map으로 뽑음
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Notice;