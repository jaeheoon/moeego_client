import React, { useContext, useEffect, useState } from 'react';
import LifeTopic from './FreeBoardForm/LifeTopic';
import "../../css/articles/ArticleMain.css";
import { Link, useNavigate } from 'react-router-dom';
import FeedItem from './FreeBoardForm/FeedItem';
import { ArticleContext } from '../../context/article/ArticleContext';
import Loading from '../loading/loading';
import {AuthContext} from '../../context/member/AuthContext';
import apiAxios from '../../api/apiAxios';

const ArticleMain = () => {
    const { articles, noticeArticles, fetchArticles, fetchArticlesByCategory, isLoading, GoWrite, GoLogin } = useContext(ArticleContext);
    const {isLoggedIn, loginEmail, loginUser, loginStatus} = useContext(AuthContext);
    const [hotArticles, setHotArticles] = useState([]);

    // 인기 게시글
    useEffect(() => {
        const fetchHotArticles = async () => {
            try {
                const response = await apiAxios.get("/api/article/hot");
                const hotArticles = response.data.content;
                setHotArticles(hotArticles); // 상태 업데이트
            } catch (err) {
                console.error("Error fetching hot articles:", err);
                setError(err);
            }
        };
        fetchHotArticles();
    }, []);

    // 전체 게시글 데이터 요청
    useEffect(() => {
        fetchArticles();
        fetchArticlesByCategory('notices');
    }, [fetchArticles]);

    if (isLoading) return <div><Loading/></div>;

    const latestNotice = noticeArticles.length > 0 ? noticeArticles[0] : null;

    return (
        <div className='ArticleMainContainer'>
            <div className="ArticleMainWrap">
                <div className='TopContainer'>
                    <h1>커뮤니티</h1>
                    <div className="ButtonWrap">
                        {isLoggedIn ? (
                            <button type="button" id="articleWriteBtn" onClick={GoWrite}>
                                <svg fill="#b2b2b2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-2 -2 24.00 24.00" enableBackground="new 0 0 20 20" xmlSpace="preserve" stroke="#b2b2b2" strokeWidth="0.0002" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18,20H2c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S18.6,20,18,20z"></path> <path d="M7,16H3c-0.6,0-1-0.4-1-1v-4c0-0.3,0.1-0.5,0.3-0.7l10-10c0.4-0.4,1-0.4,1.4,0l4,4c0.4-0.4,0.4,1,0,1.4l-10,10 C7.5,15.9,7.3,16,7,16z M4,14h2.6l9-9L13,2.4l-9,9V14z"></path></g></svg>글쓰기
                            </button>
                        ) : (
                            <button type="button" id="articleWriteBtn" onClick={GoLogin}>
                                <svg fill="#b2b2b2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-2 -2 24.00 24.00" enableBackground="new 0 0 20 20" xmlSpace="preserve" stroke="#b2b2b2" strokeWidth="0.0002" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18,20H2c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S18.6,20,18,20z"></path> <path d="M7,16H3c-0.6,0-1-0.4-1-1v-4c0-0.3,0.1-0.5,0.3-0.7l10-10c0.4-0.4,1-0.4,1.4,0l4,4c0.4-0.4,0.4,1,0,1.4l-10,10 C7.5,15.9,7.3,16,7,16z M4,14h2.6l9-9L13,2.4l-9,9V14z"></path></g></svg>글쓰기
                            </button>
                        )}
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
                            <div className='MainNotice'>{latestNotice.content}</div>
                            <div><img src="/image/next_icon.png" alt="next" /></div>
                        </div>
                        <div className='HotArticleContainer'>
                            <h3>인기글 모이고</h3>
                            <div className='HotList'>
                            {articles.length > 0 ? (
                                    <>
                                        {hotArticles[0] && (
                                            <Link className='HotWrapA' to={`/article/viewpage?article_no=${hotArticles[0].articleNo}`}>
                                                <div className='HotWrap'>
                                                    <div className='viewWrap'>
                                                        <div className='titleWrap'>
                                                            <div>{hotArticles[0].subject}</div>
                                                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                                                        </div>
                                                        <div className='imageWrap'>
                                                            <div className='imageWrap-icon'><svg width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><path fill="#b2b2b2" fillRule="evenodd" d="M7.596 1.516l-2.56 5.759V14.5h7.475a.75.75 0 00.741-.637l.994-6.55a.75.75 0 00-.741-.862H9.738c-.69 0-1.25-.56-1.25-1.25V2.575c0-.53-.385-.972-.892-1.06zM3.536 14.5V7.866H2.25a.75.75 0 00-.75.75v5.134c0 .414.336.75.75.75h1.287zM3.8 6.366L6.31.716A1.206 1.206 0 017.412 0a2.575 2.575 0 012.576 2.575v2.376h3.517a2.25 2.25 0 012.224 2.588l-.994 6.549A2.25 2.25 0 0112.511 16H2.25A2.25 2.25 0 010 13.75V8.616a2.25 2.25 0 012.25-2.25H3.8z" clipRule="evenodd"/></g></svg><span>{hotArticles[0].likes}</span></div>
                                                            <div className='imageWrap-icon'><img src='/image/view_icon.svg' alt='view' /><span>{hotArticles[0].view}</span></div>
                                                            <div className='imageWrap-icon'><img src='/image/chat_icon.svg' alt='chat' /><span>{hotArticles[0].commentCount}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                        {hotArticles[1] && (
                                            <Link className='HotWrapA' to={`/article/viewpage?article_no=${hotArticles[1].articleNo}`}>
                                                <div className='HotWrap'>
                                                    <div className='viewWrap'>
                                                        <div className='titleWrap'>
                                                            <div>{hotArticles[1].subject}</div>
                                                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                                                        </div>
                                                        <div className='imageWrap'>
                                                            <div className='imageWrap-icon'><svg width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><path fill="#b2b2b2" fillRule="evenodd" d="M7.596 1.516l-2.56 5.759V14.5h7.475a.75.75 0 00.741-.637l.994-6.55a.75.75 0 00-.741-.862H9.738c-.69 0-1.25-.56-1.25-1.25V2.575c0-.53-.385-.972-.892-1.06zM3.536 14.5V7.866H2.25a.75.75 0 00-.75.75v5.134c0 .414.336.75.75.75h1.287zM3.8 6.366L6.31.716A1.206 1.206 0 017.412 0a2.575 2.575 0 012.576 2.575v2.376h3.517a2.25 2.25 0 012.224 2.588l-.994 6.549A2.25 2.25 0 0112.511 16H2.25A2.25 2.25 0 010 13.75V8.616a2.25 2.25 0 012.25-2.25H3.8z" clipRule="evenodd"/></g></svg><span>{hotArticles[1].likes}</span></div>
                                                            <div className='imageWrap-icon'><img src='/image/view_icon.svg' alt='view' /><span>{hotArticles[1].view}</span></div>
                                                            <div className='imageWrap-icon'><img src='/image/chat_icon.svg' alt='chat' /><span>{hotArticles[1].commentCount}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <p>인기 글이 없습니다.</p>
                                )}
                            </div>
                        </div>
                        <div className='LatestArticleContainer'>
                            <h3>최신글 모이고</h3>
                            <div className='LatestList'>
                                {articles.length > 0 ? (
                                    <>
                                        {articles[0] && (
                                            <Link className='LatestWrapA' to={`/article/viewpage?article_no=${articles[0].articleNo}`}>
                                                <div className='LatestWrap'>
                                                    <div className='viewWrap'>
                                                        <div className='titleWrap'>
                                                            <div>{articles[0].subject}</div>
                                                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                                                        </div>
                                                        <div className='imageWrap'>
                                                            <div className='imageWrap-icon'><svg width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><path fill="#b2b2b2" fillRule="evenodd" d="M7.596 1.516l-2.56 5.759V14.5h7.475a.75.75 0 00.741-.637l.994-6.55a.75.75 0 00-.741-.862H9.738c-.69 0-1.25-.56-1.25-1.25V2.575c0-.53-.385-.972-.892-1.06zM3.536 14.5V7.866H2.25a.75.75 0 00-.75.75v5.134c0 .414.336.75.75.75h1.287zM3.8 6.366L6.31.716A1.206 1.206 0 017.412 0a2.575 2.575 0 012.576 2.575v2.376h3.517a2.25 2.25 0 012.224 2.588l-.994 6.549A2.25 2.25 0 0112.511 16H2.25A2.25 2.25 0 010 13.75V8.616a2.25 2.25 0 012.25-2.25H3.8z" clipRule="evenodd"/></g></svg><span>{articles[0].likes}</span></div>
                                                            <div className='imageWrap-icon'><img src='/image/view_icon.svg' alt='view' /><span>{articles[0].view}</span></div>
                                                            <div className='imageWrap-icon'><img src='/image/chat_icon.svg' alt='chat' /><span>{articles[0].commentCount}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                        {articles[1] && (
                                            <Link className='LatestWrapA' to={`/article/viewpage?article_no=${articles[1].articleNo}`}>
                                                <div className='LatestWrap'>
                                                    <div className='viewWrap'>
                                                        <div className='titleWrap'>
                                                            <div>{articles[1].subject}</div>
                                                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                                                        </div>
                                                        <div className='imageWrap'>
                                                            <div className='imageWrap-icon'><svg width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><path fill="#b2b2b2" fillRule="evenodd" d="M7.596 1.516l-2.56 5.759V14.5h7.475a.75.75 0 00.741-.637l.994-6.55a.75.75 0 00-.741-.862H9.738c-.69 0-1.25-.56-1.25-1.25V2.575c0-.53-.385-.972-.892-1.06zM3.536 14.5V7.866H2.25a.75.75 0 00-.75.75v5.134c0 .414.336.75.75.75h1.287zM3.8 6.366L6.31.716A1.206 1.206 0 017.412 0a2.575 2.575 0 012.576 2.575v2.376h3.517a2.25 2.25 0 012.224 2.588l-.994 6.549A2.25 2.25 0 0112.511 16H2.25A2.25 2.25 0 010 13.75V8.616a2.25 2.25 0 012.25-2.25H3.8z" clipRule="evenodd"/></g></svg><span>{articles[1].likes}</span></div>
                                                            <div className='imageWrap-icon'><img src='/image/view_icon.svg' alt='view' /><span>{articles[1].view}</span></div>
                                                            <div className='imageWrap-icon'><img src='/image/chat_icon.svg' alt='chat' /><span>{articles[1].commentCount}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <p>최신 글이 없습니다.</p>
                                )}
                            </div>
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
