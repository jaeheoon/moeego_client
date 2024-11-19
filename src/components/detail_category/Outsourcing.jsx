import React from 'react';
import Detail_category from './Detail_category';

const Outsourcing = () => {
    return (
        <div className='detailCategoryList'>
            <Detail_category/>
            <ul>
                <li>디자인 / 모델링</li>
                <li>개발 / 데이터</li>
                <li>번역 / 통역</li>
                <li>음향 / 더빙</li>
                <li>이벤트</li>
                <li>강의 / 컨설팅</li>
                <li>각 카테고리 마다 </li>
                <li>세부 카테고리 DB에서 </li>
                <li>가져와서 map으로 뽑기</li>
            </ul>
        </div>
    );
};

export default Outsourcing;