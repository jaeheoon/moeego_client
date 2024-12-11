import React, { useEffect, useState } from 'react';
import "../../css/Pro/ProMain.css";
import { Link } from 'react-router-dom';
import apiAxios from '../../api/apiAxios';

const ProjoinMain = () => {
    const [categories, setCategories] = useState([]);

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
    }, [])

    return (
        <div className="ProJoinPage">
            <div id="projoinMain_container">
                <form id="ProJoinForm" className="ProJoinbox">
                    <br />
                    <h2>어떤 달인으로 활동하실건가요?</h2>
                    <ul className="category-wrapper">
                        {
                            categories.map(item => (
                                <li className="category1" key={item.mainCateNo}>
                                    <Link to={`/pro/signup/main/${item.mainCateNo}`}>
                                        <div className="category-list">
                                            <img src="../../src/image/home.png" alt="홈/인테리어" width="40" height="40" />
                                            <h1 className="category-title">{item.mainCateName}</h1>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </form>
            </div>
        </div>
    );
};

export default ProjoinMain;