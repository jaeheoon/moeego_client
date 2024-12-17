import React, { useState } from 'react';
import "../../css/mypage/Review.css";
import { Link, useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';

const Review = () => {
    const {num} = useParams();
    return (
        <div className='ReviewPage'>
            <section className='ReviewWrap'>
                <div className='ReviewListWrap'>
                    <div className='PageTitle'>
                        {num == 0 ? 
                        (<Link className="prev" to="/mypage">
                            <img src="/image/prev_icon.png" alt="prev" />
                        </Link>) : 
                        (<Link className="prev" to="/article/review">
                            <img src="/image/prev_icon.png" alt="prev" />
                        </Link>)}

                        <h1>리뷰 내역</h1>
                    </div>
                    <div className="ReviewLIst">
                        <ul>    
                            <li>
                                <ReviewItem/>
                            </li>
                            <li>
                                <ReviewItem/>
                            </li>
                            <li>
                                <ReviewItem/>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Review;