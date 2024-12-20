import React, { useContext } from 'react';
import FeedItem from "./FeedItem.jsx";
import '/src/css/articles/FeedList.css';
import { useNavigate } from 'react-router-dom';
import { ArticleContext } from '../../../context/article/ArticleContext.jsx';

const FeedList = ({ articles }) => { 
    const navigate = useNavigate();
    const { viewUpdate } = useContext(ArticleContext);

    // 조회수 증가 후 상세보기 이동
    const handleArticleClick = async (articleNo) => {
        const localStorageKey = "viewedArticles"; // 로컬 스토리지 키
        const currentTime = new Date().toISOString(); // 현재 시간 ISO 형식

        // 1. 로컬 스토리지에서 데이터 가져오기
        const viewedArticles = JSON.parse(localStorage.getItem(localStorageKey)) || {};

        // 2. 해당 게시글의 마지막 조회 시간 가져오기
        const lastViewedTime = viewedArticles[articleNo];

        // 3. 마지막 조회 시간이 존재하고 24시간 이내인 경우 조회수 증가 차단
        if (lastViewedTime) {
            const lastViewedDate = new Date(lastViewedTime);
            const timeDifference = (new Date() - lastViewedDate) / (1000 * 60 * 60); // 시간 차이 계산

            if (timeDifference < 24) {
                navigate(`/article/viewpage?article_no=${articleNo}`); // 바로 상세 페이지 이동
                return;
            }
        }

        // 4. 24시간이 지났거나 첫 조회인 경우 조회수 증가
        try {
            await viewUpdate(articleNo); // 조회수 증가 요청
            // 로컬 스토리지 갱신
            viewedArticles[articleNo] = currentTime;
            localStorage.setItem(localStorageKey, JSON.stringify(viewedArticles));

            navigate(`/article/viewpage?article_no=${articleNo}`); // 상세보기 페이지로 이동
        } catch (error) {
            console.error("Error updating view count:", error);
        }
    };

    return (
        <div className="FeedList">
            <div className="FeedWrap">
                {articles.length > 0 ? (
                    articles.map(item => (
                        <div 
                            className='FeedItemWrap' 
                            key={item.articleNo} 
                            onClick={() => handleArticleClick(item.articleNo)} // 클릭 이벤트 연결
                        >
                            <FeedItem item={item} />
                        </div>
                    ))
                ) : (
                    <p className="NoArticlesMessage">게시글이 없습니다.</p> // 게시글 없음 메시지
                )}
            </div>
        </div>
    );
};

export default FeedList;
