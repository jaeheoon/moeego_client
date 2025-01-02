import React, { useState, useEffect } from "react";
import apiAxios from "../../api/apiAxios";
import "../../css/detail_category/CategoryPro.css";
import { useNavigate } from "react-router-dom";

const CategoryPro = ({ item }) => {
    const [proList, setProList] = useState([]); // subject가 있는 전문가 리스트
    const [proContent, setProContent] = useState([]); // 전문가 내용
    const navigate = useNavigate();

    useEffect(() => {
        if (item?.subCateNo) {
            apiAxios
                .get(`/api/pro/item?subCateNo=${item.subCateNo}`)
                .then((response) => {
                    setProContent(response.data.data.content);
                    const content = response.data.data.content;
                    const filteredProList = content.filter((pro) =>
                        pro.proItems.some(
                            (proItem) =>
                                proItem.subCategory.subCateNo === item.subCateNo &&
                                proItem.subject
                        )
                    );
                    setProList(filteredProList); // subject가 있는 전문가만 설정
                })
                .catch((err) => {
                    console.error("Error fetching professionals:", err);
                });
        }
    }, [item]); // item 변경 시 API 호출

    const handleProViewNavigation = (pro, matchingItem) => {
        const proDetail = proContent.find((content) => content.proNo === pro.proNo); // 클릭된 전문가의 상세 정보
        console.log(proDetail, matchingItem); // 디버깅용 출력
        navigate("/pro/proview", {
            state: { item: proDetail, serviceItem: matchingItem, proNo: pro.proNo },
        });
    };

    return (
        <div className="categoryProWrap">
            <h2>{item.subCateName}</h2>

            <div className="pro-list">
                {proList.length === 0 ? (
                    <p>전문가가 없습니다.</p> // 전문가가 없을 경우 메시지 표시
                ) : (
                    proList.map((pro, index) => {
                        // proItems에서 item.subCateNo와 일치하는 항목을 찾기
                        const matchingItem = pro.proItems.find(
                            (proItem) =>
                                proItem.subCategory.subCateNo === item.subCateNo &&
                                proItem.subject
                        );

                        const subject = matchingItem?.subject;
                        const content = matchingItem?.content;

                        // 프로필 이미지 URL 설정
                        const DEFAULT_PROFILE_IMAGE = '/image/default.svg';
                        let profileImageUrl = DEFAULT_PROFILE_IMAGE;

                        if (pro.profileImage && typeof pro.profileImage === "string") {
                            profileImageUrl = pro.profileImage.startsWith("https://") || pro.profileImage.startsWith("http://")
                                ? pro.profileImage
                                : `https://kr.object.ncloudstorage.com/moeego/profile/${pro.profileImage}`;
                        }

                        return (
                            <div
                                className="pro-card"
                                key={index}
                                onClick={() => handleProViewNavigation(pro, matchingItem)} // 클릭된 전문가와 matchingItem을 넘김
                            >
                                <img
                                    src={profileImageUrl}
                                    alt={`${pro.name} 프로필 이미지`}
                                    className="pro-image"
                                />
                                <h4>{pro.name}</h4>
                                <p>{subject}</p>
                                <p>{content || "소개 정보 없음"}</p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CategoryPro;