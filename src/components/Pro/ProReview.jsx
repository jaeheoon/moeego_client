import React, { useEffect } from 'react';
import "../../css/pro/ProReview.css";
import { Link } from 'react-router-dom';

const ProReview = ({ proItem, review, service }) => {
    return (
        <section className="reviewsPage">
            <div className="reviewWrap">
                <div className="reviewList">
                    <h3>리뷰</h3>
                    <div className="summary">
                        <div className="avg">{review.length > 0 ? review[0].star : 0}</div>
                        <ul className="rate-star">
                            {[...Array(5)].map((_, index) => (
                                <li key={index}>
                                    {index < (review.length > 0 ? review[0].star : 0) ? '★' : '☆'}
                                </li>
                            ))}
                        </ul>
                        <div className="review-count">{review.length} 리뷰</div>
                    </div>
                    <hr />

                    <div className="dropdown-btn">
                        <div>
                            <button className="sort-btn">
                                <span className="current-sort">최신순</span>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </button>
                            <ul className="dropdown-menu">
                                <li className="sort-item"><Link to="">최신순</Link></li>
                                <li className="sort-item"><Link to="">별점 높은 순</Link></li>
                                <li className="sort-item"><Link to="">별점 낮은 순</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="all-review">
                        <ul className="review-container">
                            {review.map((reviewItem) => (
                                <li key={reviewItem.reviewNo}>
                                    <article className="user-reivew">
                                        <section>
                                            <span className="author">{reviewItem.memberName}</span>
                                            <div>
                                                <p>{reviewItem.subject}</p>
                                                ⭐ {reviewItem.star}
                                            </div>
                                        </section>
                                        <section>
                                            <div className="review-content">
                                                {reviewItem.reviewContent}
                                            </div>
                                            <div className="review-photo">
                                                {reviewItem.imageUuidNames && reviewItem.imageUuidNames.length > 0 && (
                                                    <img src={`https://kr.object.ncloudstorage.com/moeego/storage/${reviewItem.imageUuidNames[0]}`} alt="리뷰사진" />
                                                )}
                                            </div>
                                        </section>
                                        <div><span className="date">{reviewItem.elapsedTime}</span></div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProReview;