import React from 'react';
import { Link } from 'react-router-dom';

const LifeTopic = () => {
    return (
        <div className={'life-topic-layout'}>
            <div>
                <div></div>
            </div>
            <section>
                <ul>
                    <div>
                        <li><a href={'/'}>전체글</a></li>
                        <li><a href={'/'}>인기글</a></li>
                        <li><a href={'/'}>최신리뷰</a></li>
                        <li><Link to={'/article/free'}>자유게시판</Link></li>
                        <li><a href={'/'}>Q&A</a></li>
                        <li><a href={'/'}>고수 게시판</a></li>
                    </div>
                </ul>
            </section>
        </div>
    );
};

export default LifeTopic;