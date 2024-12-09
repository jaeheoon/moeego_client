import React, { useContext } from "react";
import { ArticleContext } from "../../../context/article/ArticleContext";
import FeedItem from "../FreeBoardForm/FeedItem";
import Loading from "../../loading/loading";


const PopularPostList = () => {
    const { hotArticle, isLoading, error } = useContext(ArticleContext);
    console.log("PopularPostList :"+hotArticle);
    if (isLoading) return <div><Loading/></div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!hotArticle) {
        return <div></div>; // 대체 로딩 UI
    }
    return (
        <div className="popular-post-list">
            <h3>지금 가장 뜨거운🔥 게시글</h3>
            <FeedItem item={hotArticle} />
        </div>
    );
};

export default PopularPostList;
