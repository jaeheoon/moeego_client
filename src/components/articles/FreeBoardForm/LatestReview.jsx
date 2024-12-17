import React, { useContext, useEffect } from 'react';
import LifeTopic from './LifeTopic';
import ReviewItem from '../../mypage/ReviewItem';
import '../../../css/articles/LatestReview.css';
import { Link } from 'react-router-dom';
import { ArticleContext } from '../../../context/article/ArticleContext';

const LatestReview = () => {
    const {fetchReviews, reviews} = useContext(ArticleContext);
    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);
    
    return (
        <div className='LatestReviewPage'>
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
                                        {
                                            reviews.map(item => <Link key={item.reviewNo} to='pro/proview' >
                                                <li>
                                                    <ReviewItem item={item}/>
                                                </li>
                                            </Link>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestReview;