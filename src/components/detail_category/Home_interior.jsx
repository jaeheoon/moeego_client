import React from 'react';
import Detail_category from './Detail_category';

const Home_interior = () => {
    return (
        <div className='detailCategoryList'>
            <Detail_category/>
            <ul>
                <li>이사 / 청소</li>
                <li>설치 / 수리</li>
                <li>철거 / 폐기</li>
                <li>인테리어 / 시공</li>
                <li>가구 리폼 / 운반</li>
                <li>각 카테고리 마다 </li>
                <li>세부 카테고리 DB에서 </li>
                <li>가져와서 map으로 뽑기</li>
            </ul>
        </div>
    );
};

export default Home_interior;