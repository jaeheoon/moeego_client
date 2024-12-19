import React, { useContext, useEffect } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';
import { Link } from 'react-router-dom';
import Notice_eventItem from './Notice_eventItem';

const Notice = () => {
    const mainCateNo = 'notices'; // 공지사항 카테고리 번호
    const { fetchArticlesByCategory, noticeArticles, isLoading } = useContext(ArticleContext);

    // 컴포넌트가 마운트될 때 공지사항 데이터를 가져옴
    useEffect(() => {
        fetchArticlesByCategory(mainCateNo);
    }, [fetchArticlesByCategory, mainCateNo]);
    console.log(noticeArticles);
    return (
        <div className='noticePage'>
            <h1>공지사항</h1>
            {isLoading ? (
                <p>로딩 중...</p>
            ) : (
                <div className='noticeList'>
                    {noticeArticles.length > 0 ? (
                        noticeArticles.map((item) => (
                            <Link key={item.articleNo} to={`/noticeview?article_no=${item.articleNo}`}>
                                <Notice_eventItem item={item} />
                            </Link>
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
