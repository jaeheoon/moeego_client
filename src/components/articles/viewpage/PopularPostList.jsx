import React, { useContext } from "react";
import { ArticleContext } from "../../../context/article/ArticleContext";
import Loading from "../../loading/loading";
import PopularPostItem from "./PopularPostItem";
import { Link, useNavigate } from "react-router-dom";

const PopularPostList = () => {
    const { hotArticle, isLoading, error, viewUpdate } = useContext(ArticleContext);
    const navigate = useNavigate();

    const handleArticleClick = async (articleNo) => {
        const localStorageKey = "viewedArticles"; // 로컬 스토리지 키
        const currentTime = new Date().toISOString(); // 현재 시간 ISO 형식
    
        // 1. 로컬 스토리지에서 데이터 가져오기
        const viewedArticles = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    
        // 2. 해당 게시글의 마지막 조회 시간 가져오기
        const lastViewedTime = viewedArticles[articleNo];
    
        // 3. 마지막 조회 시간이 존재하고 24시간 이내인 경우 조회수 증가 차단
        if (lastViewedTime) {
            const lastViewedDate = new Date(lastViewedTime);
            const timeDifference = (new Date() - lastViewedDate) / (1000 * 60 * 60); // 시간 차이 계산
    
            if (timeDifference < 24) {
                navigate(`/article/viewpage?article_no=${articleNo}`); // 바로 상세 페이지 이동
                return;
            }
        }
    
        // 4. 24시간이 지났거나 첫 조회인 경우 조회수 증가
        try {
            await viewUpdate(articleNo); // 조회수 증가 요청
            // 로컬 스토리지 갱신
            viewedArticles[articleNo] = currentTime;
            localStorage.setItem(localStorageKey, JSON.stringify(viewedArticles));
    
            navigate(`/article/viewpage?article_no=${articleNo}`); // 상세보기 페이지로 이동
        } catch (error) {
            console.error("Error updating view count:", error);
        }
    };

    if (isLoading) return <div><Loading/></div>;
    if (error) return <div>서버 연결이 불안정합니다. 잠시 후 다시 시도해주세요.</div>;
    if (!hotArticle) {
        return <div><Loading/></div>; // 대체 로딩 UI
    }

    return (
        <div 
            className="popular-post-list" 
            onClick={() => handleArticleClick(hotArticle.articleNo)}
            style={{ cursor: "pointer" }} // 클릭 가능하도록 스타일 추가
        >
            <h3>지금 가장 뜨거운🔥 게시글</h3>
            <PopularPostItem item={hotArticle} />
        </div>
    );
};

export default PopularPostList;