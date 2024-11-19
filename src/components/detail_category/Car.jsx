import React from 'react';
import Detail_category from './Detail_category';

const Car = () => {
    return (
        <div className='detailCategoryList'>
            <Detail_category/>
            <ul>
                <li>세차</li>
                <li>설치 / 수리</li>
                <li>썬팅 / 튜닝</li>
                <li>매각 / 매매</li>
                <li>캠핑카제작 / 렌탈</li>
                <li>각 카테고리 마다 </li>
                <li>세부 카테고리 DB에서 </li>
                <li>가져와서 map으로 뽑기</li>
            </ul>
        </div>
    );
};

export default Car;