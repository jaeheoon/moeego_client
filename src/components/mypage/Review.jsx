import React, { useEffect, useState } from 'react';
import "../../css/mypage/Review.css";
import { Link, useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import apiAxios from '../../api/apiAxios';
import LatestReviewPaging from '../articles/FreeBoardForm/LatestReviewPaging';
import Loading from '../loading/loading';

const Review = () => {
    const { num } = useParams();
    const memberNo = localStorage.getItem("userno");

    // State to store reviews and pagination data
    const [reviews, setReviews] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);  // 로딩 상태 추가

    // Fetch reviews when component mounts
    useEffect(() => {
        setLoading(true); // API 요청 전에 로딩 시작
        // Check if memberNo is available
        if (memberNo) {
            // Axios request to fetch reviews
            apiAxios
                .get('api/review/mypage', { 
                    params: {
                        member_no: memberNo,
                        pg: currentPage
                    }
                })
                .then(response => {
                    const data = response.data;
                    setReviews(data.content);
                    setTotalPages(data.totalPages);
                    setCurrentPage(data.currentPage);
                })
                .catch(error => {
                    console.error('Error fetching reviews:', error);
                })
                .finally(() => {
                    setLoading(false); // 로딩 끝
                });
        }
    }, [memberNo, currentPage]);

    // Handle page change for pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        // 로딩 중이면 로딩 페이지를 보여줌
        return (
            <div className="loading-container">
                <div className="loader"><Loading/></div> {/* 로딩 UI */}
            </div>
        );
    }

    return (
        <div className='ReviewPage'>
            <section className='ReviewWrap'>
                <div className='ReviewListWrap'>
                    <div className='PageTitle'>
                        {num === '0' ? (
                            <Link className="prev" to="/mypage">
                                <img src="/image/prev_icon.png" alt="prev" />
                            </Link>
                        ) : (
                            <Link className="prev" to="/article/review">
                                <img src="/image/prev_icon.png" alt="prev" />
                            </Link>
                        )}

                        <h1>리뷰 내역</h1>
                    </div>
                    <div className="ReviewLIst">
                        <ul>
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <li key={index}>
                                        <ReviewItem item={review} showDeleteButton={true} />
                                    </li>
                                ))
                            ) : (
                                <li>No reviews found.</li>
                            )}
                        </ul>
                        {/* 페이징 컴포넌트 */}
                        {totalPages > 1 && (
                            <LatestReviewPaging 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={handlePageChange} 
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Review;