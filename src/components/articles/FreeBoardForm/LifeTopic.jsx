import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LifeTopic = () => {
    const navigate = useNavigate();
    const memberStatus = localStorage.getItem("memberStatus");

    return (
        <div className='life-topic-layout'>
            <section>
                <ul>
                    <li onClick={() => navigate('/article')}><Link to={'/article'}>전체글</Link></li>
                    <li onClick={() => navigate('/article/hot')}><Link to={'/article/hot'}>인기글</Link></li>
                    <li onClick={() => navigate('/article/review')}><Link to={'/article/review'}>최신리뷰</Link></li>
                    <li onClick={() => navigate('/article/free')}><Link to={'/article/free'}>자유 게시판</Link></li>
                    <li onClick={() => navigate('/article/qna')}><Link to={'/article/qna'}>Q&A</Link></li>
                    {/* 조건부 렌더링: memberStatus가 ROLE_PRO 또는 ROLE_ADMIN일 경우만 보이도록 */}
                    {(memberStatus === 'ROLE_PRO' || memberStatus === 'ROLE_ADMIN') && (
                        <li onClick={() => navigate('/article/pro')}><Link to={'/article/pro'}>달인 게시판</Link></li>
                    )}
                </ul>
            </section>
        </div>
    );
};

export default LifeTopic;