import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiAxios from '../../api/apiAxios';
import "../../css/Pro/ProSubMoblie.css";

const ProjoinSub = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [checkCategories, setCheckCategories] = useState([]);
    const { mainCateNo } = useParams();
    const navigate = useNavigate();

    const goJoin = () => {
        // 선택된 체크박스 값들을 상태로 전달하고, mainCateNo만 URL에 포함시킴
        navigate(`/pro/signup/main/${mainCateNo}/sub`, {
            state: { checkCategories } // 체크된 카테고리 배열을 state로 전달
        });
    };

    const goBack = () => {
        navigate("/pro/signup/main");
    }

    useEffect(() => {
        apiAxios
            .get(`/api/sub_category/${mainCateNo}`)
            .then((response) => {
                setSubCategories(response.data); // 서브 카테고리 데이터 설정
            })
            .catch((err) => {
                console.error("Error fetching subcategories:", err);
            });
    }, [mainCateNo]);

    // 체크박스 변경 이벤트 핸들러
    const handleCheckboxChange = (subCateNo) => {
        setCheckCategories((prev) => {
            if (prev.includes(subCateNo)) {
                return prev.filter((item) => item !== subCateNo);
            } else {
                return [...prev, subCateNo];
            }
        });
    };

    return (
        <div className="ProJoinSubPage">
            <div id="projoinSub_container">
                <form id="ProJoinSubForm" className="ProJoinSub_box">
                    <br />
                    <h2>어떤 서비스를 제공할 수 있나요?</h2>
                    <div className="detail-wrap">
                        {subCategories.map((category) => (
                            <div key={category.subCateNo} className="detail-item">
                                <input
                                    type="checkbox"
                                    id={`${category.subCateNo}`}
                                    checked={checkCategories.includes(category.subCateNo)}
                                    onChange={() => handleCheckboxChange(category.subCateNo)}
                                />
                                <label htmlFor={`${category.subCateNo}`}>{category.subCateName}</label>
                            </div>
                        ))}
                    </div>
                </form>
                <div className='moveBtn'>
                    <span>
                        <button className="prevBtn" onClick={goBack}>이전</button>
                    </span>
                    <span>
                        <button className="nextBtn" onClick={goJoin}>다음</button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProjoinSub;