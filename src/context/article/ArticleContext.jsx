import React, { createContext, useState, useEffect, useCallback } from "react";
import apiAxios from "../../api/apiAxios";
import { useNavigate } from "react-router-dom";

const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]); // 게시글 목록
    const [hotArticle, setHotArticle] = useState(null); // 인기 게시글
    const [articleData, setArticleData] = useState(null); // 게시글 상세 정보
    const [commentData, setCommentData] = useState([]); // 댓글 목록
    const [isLoading, setIsLoading] = useState(true); // 게시글 로딩 상태
    const [isCommentLoading, setIsCommentLoading] = useState(true); // 댓글 로딩 상태
    const [isFetchingMore, setIsFetchingMore] = useState(false); // 댓글 추가 로딩 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 댓글 페이지
    const [totalPages, setTotalPages] = useState(1); // 댓글 총 페이지 수
    const [error, setError] = useState(null); // 에러 상태
    const navigate = useNavigate();

    // 전체 게시글 가져오기
    const fetchArticles = useCallback(() => {
        setIsLoading(true);
        apiAxios
            .get("/api/article")
            .then((response) => {
                setArticles(response.data.content);
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // 카테고리별 게시글 가져오기
    const fetchArticlesByCategory = useCallback((category) => {
        setIsLoading(true);
        const apiUrl = `/api/article/${category}`;
        apiAxios
            .get(apiUrl)
            .then((response) => {
                setArticles(response.data.content);
            })
            .catch((err) => {
                console.error(`Error fetching articles for category ${category}:`, err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // 인기 게시글 가져오기
    useEffect(() => {
        apiAxios
            .get("/api/article/hot")
            .then((response) => {
                const hotArticles = response.data.content;
                if (hotArticles.length > 0) {
                    setHotArticle(hotArticles[0]);
                }
            })
            .catch((err) => {
                console.error("Error fetching hot articles:", err);
                setError(err);
            });
    }, []);

    // 특정 게시글 상세 정보 가져오기
    const fetchArticle = useCallback((articleNo) => {
        setIsLoading(true);
        apiAxios
            .get(`/api/article/viewpage?article_no=${articleNo}`)
            .then((response) => {
                setArticleData(response.data);
            })
            .catch((err) => {
                console.error("Error fetching article:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // 특정 게시글의 댓글 가져오기
    const fetchComments = useCallback((articleNo, page) => {
        setIsFetchingMore(true);
        apiAxios
            .get(`/api/comment/article?article_no=${articleNo}&page=${page}`)
            .then((response) => {
                const { content, totalPages } = response.data;
                setCommentData((prevData) => [...prevData, ...content]);
                setTotalPages(totalPages);
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
                setError(err);
            })
            .finally(() => {
                setIsCommentLoading(false);
                setIsFetchingMore(false);
            });
    }, []);

    // 로그인 글쓰기 버튼
    const GoWrite = () => {
        navigate("/article/write");
    };

    // 비로그인 글쓰기 버튼
    const GoLogin = () => {
        if(confirm('글을 작성하기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
            navigate("/login");
        } else {
            return;
        }        
    };

    const contextValue = {
        articles,
        hotArticle,
        articleData,
        commentData,
        isLoading,
        isCommentLoading,
        isFetchingMore,
        currentPage,
        totalPages,
        error,
        fetchArticles,
        fetchArticlesByCategory,
        fetchArticle,
        fetchComments,
        setCurrentPage,
        GoWrite,
        GoLogin
    };

    return (
        <ArticleContext.Provider value={contextValue}>
            {children}
        </ArticleContext.Provider>
    );
};

export { ArticleContext, ArticleProvider };
