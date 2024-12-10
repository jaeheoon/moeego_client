import React from 'react';
import "../../css/pro/ProReview.css";
import { Link } from 'react-router-dom';

const ProReview = () => {
    return (
        <section className="reviews">
            <div className="review-wrap">
            <div className="review-list">
                <h3>리뷰</h3>
                <div className="summary">
                    <div className="avg">5.0</div>
                    <ul className="rate-star">
                        <li>⭐</li>
                        <li>⭐</li>
                        <li>⭐</li>
                        <li>⭐</li>
                        <li>⭐</li>
                    </ul>
                    <div className="review-count">15개 리뷰</div>
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
                        <li>
                            <article className="user-reivew">
                                <section>
                                    <span className="author">홍**</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div className="review-content">
                                        덕분에 너무 즐거운 체육대회였습니다^^<br />
                                        진행을 재밌게 잘 해주셨어요<br />
                                        많이 웃고 즐기는 체육대회가 되었습니다
                                    </div>
                                    <div className="review-photo">
                                        <img src="/src/image/review1.webp" alt="리뷰사진1" />
                                    </div>
                                </section>
                                <div><span className="date">2024.10.15</span></div>
                            </article>
                        </li>
                        <li>
                            <article className="user-reivew">
                                <section>
                                    <span className="author">홍**</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div className="review-content">
                                        덕분에 너무 즐거운 체육대회였습니다^^<br />
                                        진행을 재밌게 잘 해주셨어요<br />
                                        많이 웃고 즐기는 체육대회가 되었습니다
                                    </div>
                                    <div className="review-photo">
                                        <img src="/src/image/review1.webp" alt="리뷰사진1" width="100" height="100" />
                                    </div>
                                </section>
                                <div><span className="date">2024.10.15</span></div>
                            </article>
                        </li>
                        <li>
                            <article className="user-reivew">
                                <section>
                                    <span className="author">홍재헌</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div className="review-content">
                                        덕분에 너무 즐거운 체육대회였습니다^^<br />
                                        진행을 재밌게 잘 해주셨어요<br />
                                        많이 웃고 즐기는 체육대회가 되었습니다
                                    </div>
                                    <div className="review-photo">
                                        <img src="/src/image/review1.webp" alt="리뷰사진1" width="100" height="100" />
                                    </div>
                                </section>
                                <div><span className="date">2024.10.15</span></div>
                            </article>
                        </li>
                        <li>
                            <article className="user-reivew">
                                <section>
                                    <span className="author">홍**</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div className="review-content">
                                        덕분에 너무 즐거운 체육대회였습니다^^<br />
                                        진행을 재밌게 잘 해주셨어요<br />
                                        많이 웃고 즐기는 체육대회가 되었습니다
                                    </div>
                                    <div className="review-photo">
                                        <img src="/src/image/review1.webp" alt="리뷰사진1" width="100" height="100" />
                                    </div>
                                </section>
                                <div><span className="date">2024.10.15</span></div>
                            </article>
                        </li>
                        <li>
                            <article className="user-reivew">
                                <section>
                                    <span className="author">홍**</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div className="review-content">
                                        덕분에 너무 즐거운 체육대회였습니다^^<br />
                                        진행을 재밌게 잘 해주셨어요<br />
                                        많이 웃고 즐기는 체육대회가 되었습니다
                                    </div>
                                    <div className="review-photo">
                                        <img src="/src/image/review1.webp" alt="리뷰사진1" width="100" height="100" />
                                    </div>
                                </section>
                                <div><span className="date">2024.10.15</span></div>
                            </article>
                        </li>
                        <li>
                            <article className="user-reivew">
                                <section>
                                    <span className="author">홍**</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div className="review-content">
                                        덕분에 너무 즐거운 체육대회였습니다^^<br />
                                        진행을 재밌게 잘 해주셨어요<br />
                                        많이 웃고 즐기는 체육대회가 되었습니다
                                    </div>
                                    <div className="review-photo">
                                        <img src="/src/image/review1.webp" alt="리뷰사진1" width="100" height="100" />
                                    </div>
                                </section>
                                <div><span className="date">2024.10.15</span></div>
                            </article>
                        </li>
                        <li>
                            <article className="user-reivew">
                                <section>
                                    <span className="author">홍**</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div className="review-content">
                                        덕분에 너무 즐거운 체육대회였습니다^^<br />
                                        진행을 재밌게 잘 해주셨어요<br />
                                        많이 웃고 즐기는 체육대회가 되었습니다
                                    </div>
                                    <div className="review-photo">
                                        <img src="/src/image/review1.webp" alt="리뷰사진1" width="100" height="100" />
                                    </div>
                                </section>
                                <div><span className="date">2024.10.15</span></div>
                            </article>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </section>
    );
};

export default ProReview;