import React, { useState, useEffect, useCallback } from 'react';
import LifeTopic from './LifeTopic';
import ReviewItem from '../../mypage/ReviewItem';
import LatestReviewPaging from './LatestReviewPaging';
import '../../../css/articles/LatestReview.css';
import { Link } from 'react-router-dom';
import apiAxios from '../../../api/apiAxios';

const LatestReview = () => {
    const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const [reviewCurrentPage, setReviewCurrentPage] = useState(1); // 현재 페이지
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // 리뷰 데이터 가져오는 함수
    const fetchReviews = useCallback(async (page = reviewCurrentPage) => {
        setIsLoading(true);
        try {
            const response = await apiAxios.get(`/api/review?pg=${page}`);
            const { content, totalPages, currentPage } = response.data;
            
            setReviews(content);
            setTotalPages(totalPages);
            setReviewCurrentPage(currentPage);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setError(err); 
        } finally {
            setIsLoading(false);
        }
    }, [reviewCurrentPage]);

    // 컴포넌트가 렌더링 될 때 리뷰 데이터 가져오기
    useEffect(() => {
        fetchReviews(reviewCurrentPage);
    }, [fetchReviews, reviewCurrentPage]);

    // 페이지 변경 처리
    const handlePageChange = (page) => {
        setReviewCurrentPage(page);
    };

    return (
        <div className='free-board-container'>
            <div className={'free-board-wrap'}>
                <div className='TopContainer'>
                    <h1>커뮤니티</h1>
                </div>
                <div className={'MainContainer'}>
                    <div className={'Main-LeftContainer'}>
                        <LifeTopic />
                    </div>
                    <div className="Main-RightContainer">
                        <Link className='myReviewPageGo' to='/mypage/review/1'>
                            <div>내 리뷰 보러가기</div>
                            <div><img src="/image/next_icon.png" alt="next" /></div>
                        </Link>
                        <section className='ReviewWrap'>
                            <div className='ReviewListWrap'>
                                <div className="ReviewLIst">
                                    <ul>
                                        {reviews.length > 0 ? (
                                            reviews.map((item) => (
                                                <Link key={item.reviewNo} to='/pro/proview'>
                                                    <li>
                                                        <ReviewItem item={item} />
                                                    </li>
                                                </Link>
                                            ))
                                        ) : (
                                            <li>리뷰가 없습니다.</li>  // 리뷰가 없을 경우
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 페이징 컴포넌트 */}
                        {totalPages > 1 && (
                            <LatestReviewPaging 
                                currentPage={reviewCurrentPage} 
                                totalPages={totalPages} 
                                onPageChange={handlePageChange} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestReview;
