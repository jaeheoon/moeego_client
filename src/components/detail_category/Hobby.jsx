import React from 'react';
import Detail_category from './Detail_category';

const Hobby = () => {
    return (
        <div className='detailCategoryList'>
            <Detail_category/>
            <ul>
                <li>음악 / 악기</li>
                <li>운동 / 대회</li>
                <li>연기 / 댄스</li>
                <li>미술 / 사진</li>
                <li>요리 / 베이킹</li>
                <li>각 카테고리 마다 </li>
                <li>세부 카테고리 DB에서 </li>
                <li>가져와서 map으로 뽑기</li>
            </ul>
        </div>
    );
};

export default Hobby;