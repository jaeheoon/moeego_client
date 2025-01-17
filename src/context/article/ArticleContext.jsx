import React, { createContext, useState, useEffect, useCallback } from "react";
import apiAxios from "../../api/apiAxios";
import { useLocation, useNavigate } from "react-router-dom";

const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]); // 게시글 목록
    const [hotArticle, setHotArticle] = useState(null); // 인기 게시글
    const [latestArticle, setLatestArticle] = useState([]); // 최신 게시글
    const [articleData, setArticleData] = useState(null); // 게시글 상세 정보
    const [commentData, setCommentData] = useState([]); // 댓글 목록
    const [isLoading, setIsLoading] = useState(true); // 게시글 로딩 상태
    const [isCommentLoading, setIsCommentLoading] = useState(true); // 댓글 로딩 상태
    const [isFetchingMore, setIsFetchingMore] = useState(false); // 댓글 추가 로딩 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 댓글 페이지
    const [totalPages, setTotalPages] = useState(1); // 댓글 총 페이지 수
    const [error, setError] = useState(null); // 에러 상태
    const [images, setImages] = useState([]);
    const [pages, setPages] = useState(1); // 총 페이지 수
    const [articleCurrentPage, setArticleCurrentPage] = useState(1); // 현재 게시글 페이지
    const [reviews, setReviews] = useState([]);

    const navigate = useNavigate();

    const [noticeArticles, setNoticeArticles] = useState([]);
    const [eventArticles, setEventArticles] = useState([]);

    // 게시글 가져오기 (페이지네이션 포함)
    const fetchArticles = useCallback(async (page = 1) => {
        setIsLoading(true);
        try {
            const response = await apiAxios.get(`/api/article?pg=${page}`);
            setArticles(response.data.content);
            setPages(response.data.totalPages);
        } catch (err) { 
            console.error("Error fetching articles:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 최신글 가져오기
    const fetchLatestArticle = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiAxios.get(`/api/article?pg=1`);
            setLatestArticle(response.data.content);
        } catch (err) { 
            console.error("Error fetching articles:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 현재 페이지 변경 함수
    const changePage = (page, category = null) => {
        setArticleCurrentPage(page);
        if (category) {
            // 카테고리별 게시글을 불러오기
            fetchArticlesByCategory(category, page);
            return;
        } else {
            // 전체 게시글을 불러오기
            fetchArticles(page);
        }
    };
    
    // 카테고리별 게시글 가져오기
    const fetchArticlesByCategory = useCallback(async (category, page = 1) => {
        setIsLoading(true);
        const apiUrl = `/api/article/${category}?pg=${page}`; // 페이지 정보 추가
        try {
            const response = await apiAxios.get(apiUrl);
    
            // 카테고리에 따라 상태 업데이트
            switch (category) {
                case "notices":
                    setNoticeArticles(response.data.content);
                    setPages(response.data.totalPages);
                    break;
                case "event":
                    setEventArticles(response.data.content);
                    setPages(response.data.totalPages);
                    break;
                default:
                    setArticles(response.data.content); // 일반 게시글은 articles에 저장
                    setPages(response.data.totalPages);
                    break;
            }
        } catch (err) {
            console.error(`Error fetching articles for category ${category}:`, err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);
    

    // 인기 게시글 가져오기
    useEffect(() => {
        const fetchHotArticles = async () => {
            try {
                const response = await apiAxios.get("/api/article/hot");
                const hotArticles = response.data.content;
                if (hotArticles.length > 0) {
                    setHotArticle(hotArticles[0]);
                }
            } catch (err) {
                console.error("Error fetching hot articles:", err);
                setError(err);
            }
        };
        fetchHotArticles();
    }, []);

    // 특정 게시글 상세 정보 가져오기
    const fetchArticle = useCallback(async (articleNo) => {
        setIsLoading(true);
        try {
            const response = await apiAxios.get(`/api/article/viewpage?article_no=${articleNo}`);
            setArticleData(response.data.article);
            setImages(response.data.images);    //이미지 불러오기
        } catch (err) {
            console.error("Error fetching article:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 특정 게시글의 댓글 가져오기
    const fetchComments = useCallback(async (articleNo, page) => {
        setIsFetchingMore(true);
        try {
            const response = await apiAxios.get(`/api/comment/article?article_no=${articleNo}&pg=${page+1}`);
            const { content = [], totalPages } = response.data; // content 기본값 설정
    
            if (!Array.isArray(content)) {
                throw new Error("Unexpected content format");
            }
    
            // 댓글 데이터 중복을 방지하고 새로운 댓글만 추가하기
            setCommentData((prevData) => {
                if (page === 0) {
                    return content;  // 첫 번째 페이지는 기존 댓글을 덮어씁니다.
                } else {
                    return [...prevData, ...content];  // 두 번째 페이지부터는 새 댓글만 추가
                }
            });
    
            setTotalPages(totalPages);  // 전체 페이지 수 설정
        } catch (err) {
            console.error("Error fetching comments:", err);
            setError(err);
        } finally {
            setIsCommentLoading(false);
            setIsFetchingMore(false);
        }
    }, []);

    const location = useLocation();

    // 페이지가 변경될 때마다 댓글 데이터를 초기화
    useEffect(() => {
        setCommentData([]);  // 댓글 데이터를 초기화
    }, [location, setCommentData]);

    // 게시글 쓰기
    const writeArticle = useCallback(async (formData) => {
        setIsLoading(true);
        try {
            await apiAxios.post("/api/article/write", formData);
            fetchArticles();
            navigate('/article');
        } catch (err) {
            console.error("Error writing article:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [fetchArticles, navigate]);

    // 글 수정
    const updateArticle = useCallback(async (articleNo, updatedData) => {
        setIsLoading(true); // 로딩 상태 시작
        try {
            const response = await apiAxios.put(`/api/article/update/${articleNo}`, updatedData);
            if (response.status === 200) {
                alert("게시글이 성공적으로 수정되었습니다.");
                fetchArticles(); // 수정 후 게시글 목록 갱신
                navigate(`/article/viewpage?article_no=${articleNo}`); // 수정 완료 후 상세 페이지로 이동
            }
        } catch (err) {
            console.error("Error updating article:", err);
            alert("게시글 수정 중 오류가 발생했습니다.");
            setError(err);
        } finally {
            setIsLoading(false); // 로딩 상태 종료
        }
    }, [fetchArticles, navigate]);

    // 글 삭제
    const deleteArticle = async (articleNo) => {
        try {
            // 사용자 확인
            if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
                return;
            }
    
            // 삭제 요청
            const response = await apiAxios.delete(`/api/article/delete/${articleNo}`);
            if (response.status === 200) {
                alert("게시글이 삭제되었습니다.");
                // 삭제 후 필요한 작업 (예: 게시글 목록 갱신 또는 페이지 이동)
                window.location.href = "/article"; // 목록 페이지로 이동
            }
        } catch (err) {
            console.error("Error deleting article:", err);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        }
    };

    // 댓글 입력
    const commentGoWrite = async (commentData) => {
        try {
            const response = await apiAxios.post('/api/comment/write', commentData);
            if (response.status === 200) {
                window.location.reload();
            } else {
                console.error("댓글 작성 실패:", response);
                alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("서버 요청 에러:", error);
            alert("댓글 작성 중 오류가 발생했습니다.");
        }
    };

    // 비로그인 댓글 입력
    const commentGoLogin = (event) => {

        if(event.key === "Enter"){
            if (confirm('댓글을 작성하기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                navigate("/login");
            } else {
                return;
            }
        }
        else{
            if (confirm('댓글을 작성하기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                navigate("/login");
            }
            else {
                return;
            }
        }
    }
    
    // 로그인 대댓글 입력
    const replyCommentWrite = async (commentData) => {
        try {
            const response = await apiAxios.post('/api/comment/write', commentData);
            if (response.status === 200) {
                window.location.reload();
            } else {
                console.error("댓글 작성 실패:", response);
                alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("서버 요청 에러:", error);
            alert("댓글 작성 중 오류가 발생했습니다.");
        }
    };

    // 비로그인 대댓글 입력
    const replyGoLogin = () => {
        if (confirm('답글을 작성하기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
            navigate("/login");
        } else {
            return;
        }
    };
    
    // 댓글 수정
    const updateComment = async (commentNo, content) => {
        try {
            const response = await apiAxios.patch('api/comment/update', {
                commentNo: commentNo,   // 수정할 댓글 ID
                content: content        // 수정할 댓글 내용
            });
    
            // 서버에서 반환된 수정된 댓글 처리
            if (response.data) {
                window.location.reload();
            }
    
        } catch (error) {
            console.error('댓글 수정 실패:', error);
        }
    };

    // 댓글 삭제
    const deleteComment = async (commentNo) => {
        try {
            // Axios를 사용한 PATCH 요청
            const response = await apiAxios.patch('/api/comment/delete', { commentNo });

            if (response.status === 200) {
                console.log("댓글 삭제 성공:", response.data);
                alert("댓글이 삭제되었습니다.");
                window.location.reload(); // 페이지 새로고침 (삭제된 댓글 반영)
            } else {
                console.error("댓글 삭제 실패:", response);
                alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("서버 요청 에러:", error);
            alert("댓글 삭제 중 오류가 발생했습니다.");
        }
    };

    // 로그인 글쓰기 버튼
    const GoWrite = () => {
        navigate("/article/write");
    };

    // 비로그인 글쓰기 버튼
    const GoLogin = () => {
        if (confirm('글을 작성하기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
            navigate("/login");
        } else {
            return;
        }
    };

    // 리뷰 이미지 불러오기
    const reviewImage = async () => {
        setIsLoading(true);
        try {
            const response = await apiAxios.get(`/api/review/images`);
            setImages(response.data.images);
        } catch (err) { 
            console.error("Error fetching articles:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    // 리뷰 쓰기
    const reviewWrite = useCallback(async (formData) => {
        setIsLoading(true);
        try {
            await apiAxios.post("/api/review/write", formData);
            navigate('/mypage/review/0');
        } catch (err) {
            console.error("Error writing article:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // 리뷰 삭제
    const deleteReview = async (reviewNo) => {
        try {
            // 사용자 확인
            if (!window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
                return;
            }
    
            // 삭제 요청
            const response = await apiAxios.delete(`/api/review/delete/${reviewNo}`);
            if (response.status === 200) {
                alert("리뷰가 삭제되었습니다.");
                // 삭제 후 필요한 작업 (예: 게시글 목록 갱신 또는 페이지 이동)
                window.location.href = "/mypage/review/0"; // 목록 페이지로 이동
            }
        } catch (err) {
            console.error("Error deleting article:", err);
            alert("리뷰 삭제 중 오류가 발생했습니다.");
        }
    };

    // 조회수
    const viewUpdate = async (articleNo) => {
        try {
            const response = await apiAxios.put(`/api/article/hit?articleNo=${articleNo}`);
            console.log('조회수 증가 성공:', response.data);
        } catch (error) {
            console.error('조회수 증가 실패:', error);
        }
    };

    // 좋아요
    const likeUpdate = async (articleNo) => {
        try {
            const response = await apiAxios.put(`/api/article/like?articleNo=${articleNo}`);
            console.log('좋아요 증가 성공:', response.data);
        } catch (error) {
            console.error('좋아요 증가 실패:', error);
        }
    };

    const contextValue = {
        articles,
        hotArticle,
        noticeArticles,
        latestArticle,
        eventArticles,
        articleData,
        reviews,
        commentData,
        isLoading,
        isCommentLoading,
        isFetchingMore,
        currentPage,
        totalPages,
        error,
        images,
        pages,
        articleCurrentPage,
        changePage,
        fetchArticles,
        fetchArticlesByCategory,
        fetchArticle,
        fetchComments,
        setCurrentPage,
        writeArticle,
        setCommentData,
        updateArticle,
        deleteArticle,
        commentGoWrite,
        commentGoLogin,
        replyGoLogin,
        replyCommentWrite,
        deleteComment,
        updateComment,
        fetchLatestArticle,
        setArticleCurrentPage,
        reviewWrite,
        reviewImage,
        deleteReview,
        viewUpdate,
        likeUpdate,
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