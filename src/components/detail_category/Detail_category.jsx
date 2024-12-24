import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../css/detail_category/Detail_category.css";
import apiAxios from '../../api/apiAxios';

const Detail_category = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            });
    }, []);

    // 카테고리 번호에 따른 이미지 경로 매핑
    const getImageSrc = (mainCateNo) => {
        switch (mainCateNo) {
            case 1:
                return "https://kr.object.ncloudstorage.com/moeego/image/home.png";
            case 2:
                return "https://kr.object.ncloudstorage.com/moeego/image/si.png";
            case 3:
                return "https://kr.object.ncloudstorage.com/moeego/image/fashion.png";
            case 4:
                return "https://kr.object.ncloudstorage.com/moeego/image/study.png";
            case 5:
                return "https://kr.object.ncloudstorage.com/moeego/image/hobby.png";
            case 6:
                return "https://kr.object.ncloudstorage.com/moeego/image/car.png";
            default:
                return "/image/default.jpg"; // 기본 이미지
        }
    };

    return (
        <div className='detailCategoryPage'>
            <div className="categories">
                {isLoading ? (
                    <p>데이터를 불러오는 중입니다...</p>
                ) : error ? (
                    <p>서버 연결이 불안정합니다. 잠시 후 다시 시도해주세요.</p>
                ) : categories.length === 0 ? (
                    <p>카테고리가 없습니다.</p>
                ) : (
                    categories.map(item => (
                        <Link to={`/category/${item.mainCateNo}`} key={item.mainCateNo}>
                            <div className="category-item">
                                <img 
                                    src={getImageSrc(item.mainCateNo)} 
                                    alt={item.mainCateName} 
                                />
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