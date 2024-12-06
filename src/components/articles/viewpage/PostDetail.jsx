import React, { useEffect, useContext } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostReactState from "./PostReactState";
import PostComment from "./PostComment";
import CommentList from "../Comment/CommentList";
import PopularPostList from "./PopularPostList";
import Loading from "../../loading/loading";
import "/src/css/articles/PostDetail.css";
import { ArticleContext } from "../../../context/article/ArticleContext";

const PostDetail = ({ articleNo }) => {
    const {
        articleData,
        commentData,
        isLoading,
        isCommentLoading,
        isFetchingMore,
        currentPage,
        totalPages,
        fetchArticle,
        fetchComments,
        setCurrentPage,
    } = useContext(ArticleContext);

    // 게시글 데이터 가져오기
    useEffect(() => {
        if (articleNo) {
            fetchArticle(articleNo);
        }
    }, [articleNo, fetchArticle]);

    // 댓글 데이터 가져오기
    useEffect(() => {
        if (articleNo) {
            fetchComments(articleNo, 0);
        }
    }, [articleNo, fetchComments]);

    // 무한 스크롤 처리
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 10 >=
                document.documentElement.scrollHeight
            ) {
                if (!isFetchingMore && currentPage < totalPages - 1) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isFetchingMore, currentPage, totalPages, setCurrentPage]);

    useEffect(() => {
        if (currentPage > 0) {
            fetchComments(articleNo, currentPage);
        }
    }, [currentPage, fetchComments, articleNo]);

    // 로딩 중일 때 로딩 컴포넌트 표시
    if (isLoading) {
        return (
            <div className="loadingPage">
                <Loading />
            </div>
        );
    }

    // articleData가 없을 때는 로딩 화면 또는 "게시글을 찾을 수 없습니다." 표시
    if (!articleData) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="post-detail">
            <section className="post-detail-container">
                <PostHeader articleData={articleData} />
                <PostContent articleData={articleData} />
                <PostReactState articleData={articleData} />
                <PostComment articleData={articleData} />
                <CommentList
                    commentData={commentData}
                    isCommentLoading={isCommentLoading}
                    isFetchingMore={isFetchingMore}
                />
                <PopularPostList />
            </section>
        </div>
    );
};

export default PostDetail;
