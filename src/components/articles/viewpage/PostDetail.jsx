import React, { useEffect, useContext, useState } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostReactState from "./PostReactState";
import PostComment from "./PostComment";
import CommentList from "../Comment/CommentList";
import PopularPostList from "./PopularPostList";
import Loading from "../../loading/loading";
import "/src/css/articles/PostDetail.css";
import { ArticleContext } from "../../../context/article/ArticleContext";
import { useSearchParams } from "react-router-dom";

const PostDetail = () => {
    const [searchParams] = useSearchParams();  // 쿼리 파라미터를 가져옵니다.
    const articleNo = searchParams.get('article_no');  // 'article_no'를 받아옵니다.
    
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
        setCommentData,
        deleteArticle,
    } = useContext(ArticleContext);

    const [isArticleLoaded, setIsArticleLoaded] = useState(false);

    // 게시글 데이터 가져오기
    useEffect(() => {
        if (articleNo) {
            fetchArticle(articleNo);
            setIsArticleLoaded(false);  // 데이터 로딩 시작 시 isArticleLoaded 초기화
        }
    }, [articleNo, fetchArticle]);

    // 댓글 데이터 가져오기
    useEffect(() => {
        if (articleNo && currentPage === 0) {
            fetchComments(articleNo, 0);  // 첫 번째 페이지의 댓글을 가져옵니다.
        }
    }, [articleNo, fetchComments, currentPage]);

    // 무한 스크롤 처리
    useEffect(() => {
        const handleScroll = () => {
            // 스크롤이 끝에 도달했을 때, 더 이상 데이터를 불러올 수 없으면 요청하지 않음
            if (
                window.innerHeight + document.documentElement.scrollTop + 10 >=
                document.documentElement.scrollHeight
            ) {
                if (
                    !isFetchingMore &&
                    currentPage < totalPages - 1 && // 현재 페이지가 마지막 페이지보다 적을 때만 요청
                    commentData.length > 0 // 댓글 데이터가 있으면 더 불러오고 없으면 무한 로딩 방지
                ) {
                    setCurrentPage((prevPage) => prevPage + 1);  // 현재 페이지 증가
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isFetchingMore, currentPage, totalPages, commentData, setCurrentPage]);

    // 추가 댓글 요청
    useEffect(() => {
        if (currentPage > 0) {
            fetchComments(articleNo, currentPage); // 추가 댓글 요청
        }
    }, [currentPage, fetchComments, articleNo]);

    // 로딩 중일 때 로딩 컴포넌트 표시
    if (isLoading && !isArticleLoaded) {
        return (
            <div className="loadingPage">
                <Loading />
            </div>
        );
    }

    // articleData가 없을 때는 "게시글을 찾을 수 없습니다." 표시
    if (!articleData) {
        return <div className="noArticle">게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="post-detail">
            <section className="post-detail-container">
                <PostHeader articleData={articleData} deleteArticle={deleteArticle}/>
                <PostContent articleData={articleData} />
                <PostReactState articleData={articleData} />
                <PostComment articleData={articleData} articleNo={articleNo} />
                <CommentList
                    commentData={commentData}
                    isCommentLoading={isCommentLoading}
                    isFetchingMore={isFetchingMore}
                    setCommentData={setCommentData}
                />
                <PopularPostList />
            </section>
        </div>
    );
};

export default PostDetail;