import React from 'react';

const ProReview = () => {
    return (
        <section id="reviews">
            <div>
                <h2>리뷰</h2>
                <div class="summary">
                    <div class="avg">5.0</div>
                        <ul class="rate-star">
                            <li>⭐</li>
                            <li>⭐</li>
                            <li>⭐</li>
                            <li>⭐</li>
                            <li>⭐</li>
                        </ul>
                        <div class="review-count">15개 리뷰</div>
                </div>
                <br/>
                <hr/>

                <ul>
                    <li class="checkbox">
                    <svg  width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z" fill="#dedede"></path> </g></svg>
                    사진 리뷰</li>
                </ul>
                <div class="dropdown-btn">
                    <div>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        <button class="sort-btn"><span class="current-sort">최신순</span></button>
                        <ul class="dropdown-menu">
                            <li class="sort-item"><a href="#">최신순</a></li>
                            <li class="sort-item"><a href="#">별점 높은 순</a></li>
                            <li class="sort-item"><a href="#">별점 낮은 순</a></li>
                        </ul>
                    </div>
                </div>

                <div class="all-review">
                    <ul class="review-container">
                        <li>
                            <article class="user-reivew">
                                <section>
                                    <span class="author">홍**</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div class="review-photo">
                                    <img src="../src/image/review1.webp" alt="리뷰사진1" width="100" height="100"/>
                                    </div>
                                    <div class="review-content">
                                        덕분에 너무 즐거운 체육대회였습니다^^<br/>
                                        진행을 재밌게 잘 해주셨어요<br/>
                                        많이 웃고 즐기는 체육대회가 되었습니다
                                    </div>
                                </section>
                                <div><span class="date">2024.10.15</span></div>
                                </article>
                        </li>
                    </ul>
                    <ul class="review-container">
                        <li>
                            <article class="user-reivew">
                                <section>
                                    <span class="author">박**</span>
                                    <div>
                                        <p>행사MC</p>
                                        ⭐ 5.0
                                    </div>
                                </section>
                                <section>
                                    <div class="review-photo">
                                    <img src="../src/image/review2.webp" alt="리뷰사진2" width="100" height="100"/>
                                    </div>
                                    <div class="review-content">
                                        저희는 500명 워크샵을 진행했는데요<br/>
                                        일단 너무 가성비 좋게 진행했어요! 이 가격에<br/>
                                        이런 퀄리티를 제공받을 수 있나 생각했구요.<br/>
                                        mc님이 요규사항 친절하게 들어주셔서 감사했어요ㅠㅠ
                                    </div>
                                </section>
                                <div><span class="date">2024.09.08</span></div>
                            </article>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default ProReview;