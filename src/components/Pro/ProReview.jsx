import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/Pro/ProReview.css";

const ProReview = ({ proItem, review, service }) => {
    return (
        <section className="reviewsPage">
            <div className="reviewWrap">
                <div className="reviewList">
                    <h3>리뷰</h3>
                    <div className="summary">
                        <div className="avg">
                            {review.length > 0
                                ? Math.floor(review[0].star * 10) / 10
                                : 0}
                        </div>
                        <ul className="rate-star">
                            {[...Array(5)].map((_, index) => (
                                <li key={index}>
                                    {index <
                                        (review.length > 0 ? review[0].star : 0)
                                        ? "★"
                                        : "☆"}
                                </li>
                            ))}
                        </ul>
                        <div className="review-count">{review.length} 리뷰</div>
                    </div>
                    <hr />

                    <div className="all-review">
                        <ul className="review-container">
                            {review.map((reviewItem) => (
                                <li key={reviewItem.reviewNo}>
                                    <article className="user-review">
                                        <section>
                                            <span className="author">
                                                {reviewItem.memberName}
                                            </span>
                                            <div>
                                                <span className="starColor">
                                                    ★
                                                </span>
                                                {Math.floor(
                                                    reviewItem.star * 10
                                                ) / 10}
                                            </div>
                                        </section>
                                        <section>
                                            <div className="review-content">
                                                <p>{reviewItem.subject}</p>
                                                <div className='review-content-detail'>
                                                    {reviewItem.reviewContent}
                                                </div>
                                            </div>
                                            <div className="review-photo">
                                                {reviewItem.imageUuidNames &&
                                                    reviewItem.imageUuidNames
                                                        .length > 0 && (
                                                        <img
                                                            src={`https://kr.object.ncloudstorage.com/moeego/storage/${reviewItem.imageUuidNames[0]}`}
                                                            alt="리뷰사진"
                                                        />
                                                    )}
                                            </div>
                                        </section>
                                        <div>
                                            <span className="date">
                                                {reviewItem.elapsedTime}
                                            </span>
                                        </div>
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
