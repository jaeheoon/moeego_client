import React, { useEffect, useState, useCallback } from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostReactState from './PostReactState';
import PostComment from './PostComment';
import PopularPostList from './PopularPostList';
import '/src/css/articles/PostDetail.css';
import apiAxios from '../../../api/apiAxios';
import CommentList from '../Comment/CommentList';
import Loading from '../../loading/loading';

const PostDetail = ({ articleNo }) => {
    const [articleData, setArticleData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 글 로딩 상태
    const [isCommentLoading, setIsCommentLoading] = useState(true); // 댓글 초기 로딩 상태
    const [isFetchingMore, setIsFetchingMore] = useState(false); // 추가 댓글 로딩 상태
    const [commentData, setCommentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

    useEffect(() => {
        if (!articleNo) return;

        // 상세 글 조회
        setIsLoading(true);
        apiAxios
            .get(`/api/article/viewpage?article_no=${articleNo}`)
            .then((response) => {
                setArticleData(response.data);
            })
            .catch((err) => {
                console.error('Error fetching article:', err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 완료
            });
    }, [articleNo]);

    const fetchComments = useCallback(
        (page) => {
            setIsFetchingMore(true);
            apiAxios
                .get(`/api/comment/article?article_no=${articleNo}&page=${page}`)
                .then((response) => {
                    const { content, totalPages, totalElements } = response.data;
                    setCommentData((prevData) => [...prevData, ...content]); // 기존 댓글과 병합
                    setTotalPages(totalPages); // 총 페이지 수 업데이트
                    console.log(`Page ${page} fetched with ${totalElements} comments.`);
                })
                .catch((err) => {
                    console.error('Error fetching comments:', err);
                    setError(err);
                })
                .finally(() => {
                    setIsCommentLoading(false);
                    setIsFetchingMore(false); // 추가 로딩 완료
                });
        },
        [articleNo]
    );
    

    useEffect(() => {
        if (!articleNo) return;
        setIsCommentLoading(true);
        fetchComments(0); // 초기 페이지 가져오기
    }, [articleNo, fetchComments]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 10 >=
            document.documentElement.scrollHeight
        ) {
            // 스크롤이 끝에 도달한 경우
            if (!isFetchingMore && currentPage < totalPages - 1) { // totalPages - 1 체크
                setCurrentPage((prevPage) => prevPage + 1); // 페이지 증가
            }
        }
    }, [isFetchingMore, currentPage, totalPages]);
    
    
    useEffect(() => {
        if (currentPage > 0) {
            fetchComments(currentPage); // currentPage가 변경될 때마다 fetchComments 호출
        }
    }, [currentPage, fetchComments]); // currentPage가 변경될 때마다 실행
    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    if (isLoading) {
        return (
            <div className="loadingPage">
                <Loading />
            </div>
        );
    }

    return (
        <div className="post-detail">
            <div className="post-detail-wrap">
                <section className="post-detail-container">
                    <PostHeader articleData={articleData} />
                    <br />
                    <PostContent articleData={articleData} />
                    <PostReactState articleData={articleData} />
                    <br />
                    <PostComment articleData={articleData} />
                    <br />
                    <CommentList
                        commentData={commentData}
                        isCommentLoading={isCommentLoading}
                        isFetchingMore={isFetchingMore}
                    />
                    <br />
                    <br />
                    <PopularPostList />
                </section>
            </div>
        </div>
    );
};

export default PostDetail;
