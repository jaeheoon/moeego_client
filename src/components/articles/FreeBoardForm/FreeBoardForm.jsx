import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import LifeTopic from "./LifeTopic.jsx";
import "../../../css/articles/FreeBoardForm.css";
import GuideBanner from "./GuideBanner.jsx";
import FeedList from "./FeedList.jsx";
import Service_area from '../../ProSearch/service_area.jsx';
import { ArticleContext } from '../../../context/article/ArticleContext.jsx';
import Loading from '../../loading/loading.jsx';
import { AuthContext } from '../../../context/member/AuthContext.jsx';
import Paging from '../Paging.jsx';

const FreeBoardForm = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const {
        articles,
        fetchArticlesByCategory,
        isLoading,
        GoWrite, 
        GoLogin,
        articleCurrentPage,
        setArticleCurrentPage // articleCurrentPage 초기화 할 함수 추가
    } = useContext(ArticleContext);
    const { isLoggedIn, loginEmail, loginUser, loginStatus } = useContext(AuthContext);

    // 카테고리에 따른 데이터 요청 및 카테고리 변경 시 페이지 초기화
    useEffect(() => {
        const category = location.pathname.split("/").pop(); // "hot", "review", "free", etc.
        setSelectedCategoryId(category);
        setArticleCurrentPage(1); // 카테고리 변경 시 page를 1로 초기화
        fetchArticlesByCategory(category, 1); // 페이지를 1로 설정하여 첫 번째 게시글을 불러옴
    }, [location.pathname, setArticleCurrentPage, fetchArticlesByCategory]);

    if (isLoading) return <div><Loading /></div>;

    return (
        <div className={'free-board-container'}>
            <div className={'free-board-wrap'}>
                <div className='TopContainer'>
                    <h1>커뮤니티</h1>
                    <div className="ButtonWrap">
                        {isLoggedIn ? (
                            <button type="button" id="articleWriteBtn" onClick={GoWrite}>
                                <svg fill="#b2b2b2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-2 -2 24.00 24.00" enableBackground="new 0 0 20 20" xmlSpace="preserve" stroke="#b2b2b2" strokeWidth="0.0002" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M18,20H2c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S18.6,20,18,20z"></path>
                                        <path d="M7,16H3c-0.6,0-1-0.4-1-1v-4c0-0.3,0.1-0.5,0.3-0.7l10-10c0.4-0.4,1-0.4,1.4,0l4,4c0.4-0.4,0.4,1,0,1.4l-10,10 C7.5,15.9,7.3,16,7,16z M4,14h2.6l9-9L13,2.4l-9,9V14z"></path>
                                    </g>
                                </svg>
                                글쓰기
                            </button>
                        ) : (
                            <button type="button" id="articleWriteBtn" onClick={GoLogin}>
                                <svg fill="#b2b2b2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-2 -2 24.00 24.00" enableBackground="new 0 0 20 20" xmlSpace="preserve" stroke="#b2b2b2" strokeWidth="0.0002" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M18,20H2c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S18.6,20,18,20z"></path>
                                        <path d="M7,16H3c-0.6,0-1-0.4-1-1v-4c0-0.3,0.1-0.5,0.3-0.7l10-10c0.4-0.4,1-0.4,1.4,0l4,4c0.4-0.4,0.4,1,0,1.4l-10,10 C7.5,15.9,7.3,16,7,16z M4,14h2.6l9-9L13,2.4l-9,9V14z"></path>
                                    </g>
                                </svg>글쓰기
                            </button>
                        )}
                    </div>
                </div>

                <div className={'MainContainer'}>
                    <div className={'Main-LeftContainer'}>
                        <LifeTopic />
                    </div>

                    <div className="Main-RightContainer">
                        <GuideBanner />
                        <Service_area />
                        <div className='FeedContainer'>
                            <FeedList articles={articles} />
                        </div>
                        <div className='articlePaging'>
                            <Paging categoryId={selectedCategoryId || null} /> {/* categoryId가 없으면 전체 게시글로 처리 */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeBoardForm;
