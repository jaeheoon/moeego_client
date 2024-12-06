import React, { useContext, useEffect } from 'react';
import LifeTopic from './FreeBoardForm/LifeTopic';
import "../../css/articles/ArticleMain.css";
import { Link, useNavigate } from 'react-router-dom';
import FeedItem from './FreeBoardForm/FeedItem';
import { ArticleContext } from '../../context/article/ArticleContext';
import Loading from '../loading/loading';

const ArticleMain = () => {
    const { articles, fetchArticles, isLoading } = useContext(ArticleContext);
    const navigate = useNavigate();

    // 글쓰기 버튼
    const GoWrite = () => {
        navigate("/article/write");
    };

    // 전체 게시글 데이터 요청
    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    if (isLoading) return <div><Loading/></div>;

    return (
        <div className='ArticleMainContainer'>
            <div className="ArticleMainWrap">
                <div className='TopContainer'>
                    <h1>커뮤니티</h1>
                    <div className="ButtonWrap">
                        <button type="button" id="articleWriteBtn" onClick={GoWrite}>
                            <svg fill="#b2b2b2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-2 -2 24.00 24.00" enableBackground="new 0 0 20 20" xmlSpace="preserve" stroke="#b2b2b2" strokeWidth="0.0002" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18,20H2c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S18.6,20,18,20z"></path> <path d="M7,16H3c-0.6,0-1-0.4-1-1v-4c0-0.3,0.1-0.5,0.3-0.7l10-10c0.4-0.4,1-0.4,1.4,0l4,4c0.4-0.4,0.4,1,0,1.4l-10,10 C7.5,15.9,7.3,16,7,16z M4,14h2.6l9-9L13,2.4l-9,9V14z"></path></g></svg>글쓰기
                        </button>
                    </div>
                </div>
                <div className='MainContainer'>
                    <div className="Main-LeftContainer">
                        <LifeTopic />
                    </div>
                    <div className="Main-RightContainer">
                        <div className='NotionContainer'>
                            <div>
                                <h4>공지</h4>
                            </div>
                            <div>모이고 생활 가이드 공지물을 올려봤습니다. 필독필독필독필독필독필독필독필독필독필독필독필독필독필독필독</div>
                            <div><img src="/image/next_icon.png" alt="next" /></div>
                        </div>
                        <div className='HotArticleContainer'>
                            <h3>인기글 모이고</h3>
                            {/* 나머지 인기글 구현 */}
                        </div>
                        <div className='AllArticleContainer'>
                            <h3>전체글 모이고</h3>
                            {
                                articles.map(item => (
                                    <div className='FeedItemWrap' key={item.articleNo}>
                                        <Link className='FeedItemLink' to={`/article/viewpage?article_no=${item.articleNo}`}>
                                            <FeedItem item={item} />
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleMain;
