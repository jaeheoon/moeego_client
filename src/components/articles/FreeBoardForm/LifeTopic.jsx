import React from 'react';
import { Link } from 'react-router-dom';

const LifeTopic = () => {
    return (
        <div className='life-topic-layout'>
            <section>
                <ul>
                    <li><Link to={'/article'}>전체글</Link></li>
                    <li><Link to={'/article/hot'}>인기글</Link></li>
                    <li><Link to={'/article/review'}>최신리뷰</Link></li>
                    <li><Link to={'/article/free'}>자유게시판</Link></li>
                    <li><Link to={'/article/qna'}>Q&A</Link></li>
                    <li><Link to={'/article/pro'}>고수 게시판</Link></li>
                </ul>
            </section>
        </div>
    );
};

export default LifeTopic;