import React, { useState, useEffect } from 'react';
import apiAxios from '../../api/apiAxios';


const ServiceModal = ({ handleServiceSelect }) => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [openIndex, setOpenIndex] = useState(null);

    const toggleSubMenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const fetchSubCategories = (mainCateNo) => {
        if (subCategories[mainCateNo]) return;

        apiAxios
            .get(`/api/sub_category/${mainCateNo}`)
            .then((response) => {
                setSubCategories((prevSubCategories) => ({
                    ...prevSubCategories,
                    [mainCateNo]: response.data,
                }));
            })
            .catch((err) => {
                console.error("Error fetching subcategories:", err);
            });
    };

    useEffect(() => {
        apiAxios
            .get("/api/main_category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.error("Error fetching main categories:", err);
            });
    }, []);

    const handleSubItemClick = (subItem) => {
        handleServiceSelect(subItem);
    };

    return (
        <div className='serviceModal'>
            <div className='modalTitle'>서비스</div>
            <ul className='modalMainMenu'>
                {categories.map((category, index) => (
                    <li key={category.mainCateNo}>
                        <div
                            onClick={() => {
                                toggleSubMenu(index);
                                fetchSubCategories(category.mainCateNo);
                            }}
                            className='menuTitle'
                        >
                            {category.mainCateName}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0791 17.3C12.278 17.2991 12.4684 17.2191 12.6084 17.0778L20.3326 9.27778C20.6241 8.98346 20.6218 8.5086 20.3274 8.21714C20.0331 7.92568 19.5583 7.92799 19.2668 8.22231L12.0703 15.4894L4.72747 8.21716C4.43316 7.92569 3.95829 7.92799 3.66682 8.22229C3.37535 8.5166 3.37764 8.99146 3.67195 9.28294L11.5477 17.0829C11.6891 17.2229 11.8802 17.301 12.0791 17.3Z" fill="black"></path>
                            </svg>
                        </div>
                        {openIndex === index && (
                            <ul className='modalSubMenu'>
                                {subCategories[category.mainCateNo] ? (
                                    subCategories[category.mainCateNo].map((subItem, subIndex) => (
                                        <li key={subIndex} onClick={() => handleSubItemClick(subItem.subCateName)}>
                                            {subItem.subCateName}
                                        </li>
                                    ))
                                ) : (
                                    <li>로딩 중...</li>
                                )}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceModal;
