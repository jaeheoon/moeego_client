import React from 'react';
import Detail_category from './Detail_category';

const Study = () => {
    return (
        <div className='detailCategoryList'>
            <Detail_category/>
            <ul>
                <li>과외 / 입시</li>
                <li>논술 / 논문</li>
                <li>취업 / 창업</li>
                <li>자격증 / 시험</li>
                <li>실무레슨 / 교육</li>
                <li>각 카테고리 마다 </li>
                <li>세부 카테고리 DB에서 </li>
                <li>가져와서 map으로 뽑기</li>
            </ul>
        </div>
    );
};

export default Study;