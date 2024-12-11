import React from 'react';

const Notice_eventItem = ({ item }) => {
    return (
        <>
            <div className='noticeItemWrap'>
                <p>{item.subject}</p>
            </div>
        </>
    );
};

export default Notice_eventItem;