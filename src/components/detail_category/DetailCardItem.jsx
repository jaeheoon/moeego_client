import React from 'react';

const DetailCardItem = () => {
    return (
        <div className='detailCard'>
            <div className='detailCardImg'>
                <img src='../../src/image/keyword1.jpg' alt='정리' />
            </div>
            <div className='detailCardContent'>
                <h4>치워드림</h4>
                <p>312,300명 요청</p>
            </div>
        </div>
    );
};

export default DetailCardItem;