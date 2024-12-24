import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../css/detail_category/Detail_category.css";
import apiAxios from '../../api/apiAxios';

const Detail_category = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null); // 에러 상태 추가
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        apiAxios
            .get("/api/main_category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 완료
            });
    }, []);

    return (
        <div className='detailCategoryPage'>
            <div className="categories">
                {isLoading ? ( // 로딩 중일 때
                    <p>데이터를 불러오는 중입니다...</p>
                ) : error ? ( // 에러 발생 시
                    <p>서버 연결이 불안정합니다. 잠시 후 다시 시도해주세요.</p>
                ) : categories.length === 0 ? ( // 데이터가 없을 때
                    <p>카테고리가 없습니다.</p>
                ) : ( // 데이터가 있을 때
                    categories.map(item => (
                        <Link to={`/category/${item.mainCateNo}`} key={item.mainCateNo}>
                            <div className="category-item">
                                <img src="/image/home.png" alt={item.mainCateName} />
                                <span>{item.mainCateName}</span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Detail_category;