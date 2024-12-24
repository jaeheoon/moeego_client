import React, { useEffect, useState } from 'react';
import "../../css/mypage/Review.css";
import { Link, useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import apiAxios from '../../api/apiAxios';
import LatestReviewPaging from '../articles/FreeBoardForm/LatestReviewPaging';
import Loading from '../loading/loading';
import ReviewModal from './ReviewModal'; // 모달 컴포넌트 추가

const Review = () => {
    const { num } = useParams();
    const memberNo = localStorage.getItem("userno");

    // 리뷰 데이터 및 상태 관리
    const [reviews, setReviews] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [selectedReview, setSelectedReview] = useState(null); // 선택된 리뷰 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

    // 리뷰 데이터 가져오기
    useEffect(() => {
        setLoading(true); // 로딩 시작
        if (memberNo) {
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

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 리뷰 클릭 시 모달 열기
    const handleReviewClick = (review) => {
        setSelectedReview(review); // 선택된 리뷰 저장
        setIsModalOpen(true); // 모달 열기
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setSelectedReview(null); // 선택된 리뷰 초기화
        setIsModalOpen(false); // 모달 닫기
    };

    // 로딩 상태일 때 로딩 UI 표시
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"><Loading /></div>
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
                                    <li key={index} onClick={() => handleReviewClick(review)}> {/* 클릭 이벤트 추가 */}
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

            {/* 모달 컴포넌트 */}
            {isModalOpen && selectedReview && (
                <ReviewModal review={selectedReview} onClose={handleCloseModal} showDeleteButton={true}/>
            )}
        </div>
    );
};

export default Review;
