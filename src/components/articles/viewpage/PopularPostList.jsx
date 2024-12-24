import React, { useContext } from "react";
import { ArticleContext } from "../../../context/article/ArticleContext";
import FeedItem from "../FreeBoardForm/FeedItem";
import Loading from "../../loading/loading";


const PopularPostList = () => {
    const { hotArticle, isLoading, error } = useContext(ArticleContext);
    if (isLoading) return <div><Loading/></div>;
    if (error) return <div>서버 연결이 불안정합니다. 잠시 후 다시 시도해주세요.</div>;
    if (!hotArticle) {
        return <div><Loading/></div>; // 대체 로딩 UI
    }
    return (
        <div className="popular-post-list">
            <h3>지금 가장 뜨거운🔥 게시글</h3>
            <FeedItem item={hotArticle} />
        </div>
    );
};

export default PopularPostList;
