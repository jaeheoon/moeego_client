import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/detail_category/Detail_category.css";

const Detail_category = () => {
    return (
        <div className='detailCategoryPage'>
            <div className="categories">
                <Link to="/category/home">
                    <div className="category-item">
                        <img src="/image/home.png" alt="홈/인테리어" />
                        <span>홈/인테리어</span>
                    </div>
                </Link>
                <Link to="/category/outsourcing">
                    <div className="category-item">
                        <img src="/image/si.png" alt="외주" />
                        <span>외주</span>
                    </div>
                </Link>
                <Link to="/category/fashion">
                    <div className="category-item">
                        <img src="/image/fashion.png" alt="패션/뷰티" />
                        <span>패션/뷰티</span>
                    </div>
                </Link>
                <Link to="/category/study">
                    <div className="category-item">
                        <img src="/image/study.png" alt="직무/과외" />
                        <span>직무/과외</span>
                    </div>
                </Link>
                <Link to="/category/hobby">
                    <div className="category-item">
                        <img src="/image/hobby.png" alt="취미/자기계발" />
                        <span>취미/자기계발</span>
                    </div>
                </Link>
                <Link to="/category/car">
                    <div className="category-item">
                        <img src="/image/car.png" alt="자동차" />
                        <span>자동차</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Detail_category;
