import React from 'react';
import { Link } from 'react-router-dom';

const LifeTopic = () => {
    return (
        <div className='life-topic-layout'>
            <section>
                <ul>
                    <li><Link to={'/article'}>전체글</Link></li>
                    <li><Link to={'/'}>인기글</Link></li>
                    <li><Link to={'/'}>최신리뷰</Link></li>
                    <li><Link to={'/article/free'}>자유게시판</Link></li>
                    <li><Link to={'/'}>Q&A</Link></li>
                    <li><Link to={'/'}>고수 게시판</Link></li>
                </ul>
            </section>
        </div>
    );
};

export default LifeTopic;