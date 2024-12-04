import React, { useState, useRef, useEffect } from "react";
import Detail_category from "./Detail_category";
import "../../css/detail_category/Detail_category.css";
import DetailCardList from "./DetailCardList";
import { useParams } from "react-router-dom";
import apiAxios from "../../api/apiAxios";

const Home_interior = () => {
    const { mainCateNo } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionsRef = useRef([]);
    const menuRef = useRef(null);
    const [subCategories, setSubCategories] = useState([]); // 서브 카테고리 상태

    useEffect(() => {
        // mainCateNo 변경 시 첫 번째 메뉴를 활성화하고 오른쪽 화면 맨 위로 스크롤
        setActiveIndex(0);

        window.scrollTo(0, 0);

        // mainCateNo를 기반으로 서브 카테고리 데이터 받아오기
        apiAxios
            .get(`/api/subcategory/${mainCateNo}`)
            .then((response) => {
                setSubCategories(response.data); // 서브 카테고리 데이터 설정
            })
            .catch((err) => {
                console.error("Error fetching subcategories:", err);
            });
    }, [mainCateNo]); // mainCateNo가 변경될 때마다 실행

    const handleMenuClick = (index) => {
        setActiveIndex(index); // 클릭한 메뉴 활성화
        sectionsRef.current[index].scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    return (
        <div className="detailCategoryListPage">
            <div className="detailCategoryWrap">
                <h1>견적 요청</h1>
                <div className="detail_categoryWrap">
                    <Detail_category />
                </div>
                <div className="detailContentWrap">
                    <div className="detailCategoryListWrap" ref={menuRef}>
                        <ul>
                            {subCategories.map((category, index) => (
                                <li
                                    key={category.subCateNo}
                                    className={`menu-item ${activeIndex === index ? "active" : ""}`}
                                    onClick={() => handleMenuClick(index)}
                                >
                                    {category.subCateName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="detailRightWrap">
                        {subCategories.map((category, index) => (
                            <div
                                key={category.subCateNo}
                                ref={(el) => (sectionsRef.current[index] = el)}
                                className="detailSection"
                                id={`section-${index}`}
                            >
                                <h2>{category.subCateName}</h2>
                                <DetailCardList subCateNo={category.subCateNo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home_interior;