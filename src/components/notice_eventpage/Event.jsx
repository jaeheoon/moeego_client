import React, { useContext, useEffect } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';
import { Link } from 'react-router-dom';
import Notice_eventItem from './Notice_eventItem';

const Notice = () => {
    const mainCateNo = 'event'; // 공지사항 카테고리 번호
    const { fetchArticlesByCategory, eventArticles, isLoading } = useContext(ArticleContext);

    // 컴포넌트가 마운트될 때 공지사항 데이터를 가져옴
    useEffect(() => {
        fetchArticlesByCategory(mainCateNo);
    }, [fetchArticlesByCategory, mainCateNo]);

    return (
        <div className='eventPage'>
            <h1>이벤트</h1>
            {isLoading ? (
                <p>로딩 중...</p>
            ) : (
                <div className='eventList'>
                    {eventArticles.length > 0 ? (
                        eventArticles.map((item) => (
                            <Link key={item.articleNo} to={`/noticeview?article_no=${item.articleNo}`}>
                                <Notice_eventItem item={item} />
                            </Link>
                        ))
                    ) : (
                        <p>이벤트가 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notice;
