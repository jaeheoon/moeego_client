import React from 'react';
import Detail_category from './Detail_category';

const Fashion_beauty = () => {
    return (
        <div className='detailCategoryList'>
            <Detail_category/>
            <ul>
                <li>헤어 / 메이크업</li>
                <li>코디</li>
                <li>퍼스널컬러 / 이미지메이킹</li>
                <li>촬영 / 모델</li>
                <li>피부 / 탈모</li>
                <li>각 카테고리 마다 </li>
                <li>세부 카테고리 DB에서 </li>
                <li>가져와서 map으로 뽑기</li>
            </ul>
        </div>
    );
};

export default Fashion_beauty;