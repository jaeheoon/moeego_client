import React, { useContext, useEffect } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';
import { useNavigate } from 'react-router-dom';
import Notice_eventItem from './Notice_eventItem';

const Notice = () => {
    const mainCateNo = 'notices'; // 공지사항 카테고리 번호
    const { fetchArticlesByCategory, noticeArticles, isLoading, viewUpdate } = useContext(ArticleContext);
    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때 공지사항 데이터를 가져옴
    useEffect(() => {
        fetchArticlesByCategory(mainCateNo);
    }, [fetchArticlesByCategory, mainCateNo]);

    // 조회수 증가 후 상세보기 이동
    const handleNoticeClick = async (articleNo) => {
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
                navigate(`/noticeview?article_no=${articleNo}`); // 바로 상세 페이지 이동
                return;
            }
        }

        // 4. 24시간이 지났거나 첫 조회인 경우 조회수 증가
        try {
            await viewUpdate(articleNo); // 조회수 증가 요청
            // 로컬 스토리지 갱신
            viewedArticles[articleNo] = currentTime;
            localStorage.setItem(localStorageKey, JSON.stringify(viewedArticles));

            navigate(`/noticeview?article_no=${articleNo}`); // 상세보기 페이지로 이동
        } catch (error) {
            console.error("Error updating view count:", error);
        }
    };

    return (
        <div className='noticePage'>
            <h1>공지사항</h1>
            {isLoading ? (
                <p>로딩 중...</p>
            ) : (
                <div className='noticeList'>
                    {noticeArticles.length > 0 ? (
                        noticeArticles.map((item) => (
                            <div
                                key={item.articleNo}
                                className='noticeItem'
                                onClick={() => handleNoticeClick(item.articleNo)}
                            >
                                <Notice_eventItem item={item} />
                            </div>
                        ))
                    ) : (
                        <p>공지사항이 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notice;