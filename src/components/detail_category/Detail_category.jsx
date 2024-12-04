import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../css/detail_category/Detail_category.css";
import apiAxios from '../../api/apiAxios';

const Detail_category = () => {
    const [categories, setCategories] = useState([]);
    const [mainCateNo, setMainCateNo] = useState('');

    useEffect(() => {
        apiAxios
            .get("/api/main_category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError(err);
            });
    },[])

    return (
        <div className='detailCategoryPage'>
            <div className="categories">
                {
                    categories.map(item => (
                        <Link to={`/category/${item.mainCateNo}`} key={item.mainCateNo}>
                            <div className="category-item">
                                <img src="/image/home.png" alt={item.mainCateName} />
                                <span>{item.mainCateName}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Detail_category;
