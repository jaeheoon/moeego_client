import React, { useContext, useState, useEffect } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';
import '../../css/reviewmodal/ReviewModal.css';

const ReviewModal = ({ review, onClose, showDeleteButton }) => {
    const { deleteReview } = useContext(ArticleContext);
    const [selectedImage, setSelectedImage] = useState(null); // 클릭된 이미지를 저장

    // 모달이 열렸을 때 스크롤 방지
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // 스크롤 비활성화
        return () => {
            document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 복원
        };
    }, []);

    const handleDelete = () => {
        deleteReview(review.reviewNo); // 해당 리뷰 ID를 deleteReview 함수에 전달
    };

    // 별을 채울 개수 계산
    const fullStars = Math.floor(review.star); // 별의 정수 부분
    const emptyStars = 5 - fullStars; // 빈 별은 총 5개에서 채운 별을 뺀 값

    return (
        <div
            className="review-modal-overlay"
            onClick={onClose} // 모달 바깥 클릭 시 닫기
        >
            <div
                className="review-modal-content"
                onClick={(e) => e.stopPropagation()} // 내부 클릭 이벤트 전파 막기
            >
                <article>
                    <section>
                        {/* 달인 이름 */}
                        <span>{review.subject}</span>&nbsp;-&nbsp;<span>{review.proName}</span>
                    </section>
                    <section>
                        <p>
                            {/* 별 아이콘 */}
                            {[...Array(fullStars)].map((_, index) => (
                                <span key={index} style={{ color: '#f39c12' }}>★</span> // 채운 별
                            ))}
                            {[...Array(emptyStars)].map((_, index) => (
                                <span key={index} style={{ color: '#ddd' }}>★</span> // 빈 별
                            ))}&nbsp;&nbsp;{review.star}
                        </p>
                    </section>
                    <section>
                        {/* 이미지 목록 출력 */}
                        <div className="ImageFeat">
                            {review.imageUuidName && review.imageUuidName.map((uuid, index) => (
                                <img
                                    key={index}
                                    src={`https://kr.object.ncloudstorage.com/moeego/storage/${uuid}`}
                                    alt={`리뷰 이미지`}
                                    onClick={() => setSelectedImage(`https://kr.object.ncloudstorage.com/moeego/storage/${uuid}`)} // 클릭 시 이미지 저장
                                    style={{ cursor: 'pointer', margin: '5px' }}
                                />
                            ))}
                        </div>
                    </section>
                    <section>
                        <p className="content" style={{ whiteSpace: 'pre-wrap' }}>{review.reviewContent}</p>
                    </section>
                    <section className='writer_date'>
                        <span>작성자 : {review.memberName}</span>
                        <span>{review.elapsedTime}</span>
                    </section>
                    {showDeleteButton && ( // showDeleteButton이 true일 때만 삭제 버튼 표시
                        <section>
                            <button onClick={handleDelete} className="deleteReviewBtn">
                                삭제
                            </button>
                        </section>
                    )}
                    <button onClick={onClose} className="closeModalBtn">&times;</button>
                </article>

                {/* 큰 이미지 모달 */}
                {selectedImage && (
                    <div className="imageModalOverlay" onClick={() => setSelectedImage(null)}>
                        <div className="imageModalContent">
                            <img src={selectedImage} alt="확대 이미지" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewModal;
