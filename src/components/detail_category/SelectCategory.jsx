import React, { useState, useEffect } from "react";
import Detail_category from "./Detail_category";
import "../../css/detail_category/Detail_category.css";
import { useParams } from "react-router-dom";
import apiAxios from "../../api/apiAxios";
import CategoryPro from "./CategoryPro";

const SelectCategory = () => {
    const { mainCateNo } = useParams();
    const [subCategories, setSubCategories] = useState([]); // 서브 카테고리 상태
    const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태

    useEffect(() => {
        // mainCateNo 변경 시 서브 카테고리 데이터 받아오기
        apiAxios
            .get(`/api/sub_category/${mainCateNo}`)
            .then((response) => {
                setSubCategories(response.data); // 서브 카테고리 데이터 설정
                if (response.data.length > 0) {
                    setSelectedCategory(response.data[0]); // 첫 번째 카테고리 기본 선택
                }
            })
            .catch((err) => {
                console.error("Error fetching subcategories:", err);
            });
    }, [mainCateNo]); // mainCateNo가 변경될 때마다 실행

    const handleMenuClick = (category) => {
        setSelectedCategory(category); // 선택된 카테고리 업데이트
    };

    return (
        <div className="detailCategoryListPage">
            <div className="detailCategoryWrap">
                <h1>견적 요청</h1>
                <div className="detail_categoryWrap">
                    <Detail_category />
                </div>
                <div className="detailContentWrap">
                    <div className="detailCategoryListWrap">
                        <ul>
                            {subCategories.map((category) => (
                                <li
                                    key={category.subCateNo}
                                    className={`menu-item ${
                                        selectedCategory?.subCateNo === category.subCateNo ? "active" : ""
                                    }`}
                                    onClick={() => handleMenuClick(category)}
                                >
                                    {category.subCateName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="detailRightWrap">
                        {selectedCategory && <CategoryPro item={selectedCategory} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectCategory;
