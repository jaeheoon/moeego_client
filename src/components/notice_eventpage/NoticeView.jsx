import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArticleContext } from '../../context/article/ArticleContext';

const NoticeView = () => {
    const { fetchArticle, articleData, isLoading } = useContext(ArticleContext);
    const [searchParams] = useSearchParams(); // 쿼리 파라미터를 가져옴
    const articleNo = searchParams.get("article_no"); // article_no 값을 추출

    // 날짜 형식 변환 함수
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = String(date.getFullYear()).slice(2); // 연도의 뒤 두 자리
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월
        const day = String(date.getDate()).padStart(2, "0"); // 일
        return `[${year}.${month}.${day}]`;
    };

    // 컴포넌트가 마운트될 때 게시글 데이터를 가져옴
    useEffect(() => {
        if (articleNo) {
            fetchArticle(articleNo);
        }
    }, [articleNo, fetchArticle]);

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    if (!articleData) {
        return <p>게시글을 불러올 수 없습니다.</p>;
    }

    return (
        <div className="noticeView">
            <h2>{articleData.type === 0 ? '공지사항' : '이벤트'}</h2>
            <h1>{formatDate(articleData.writeDate)}{articleData.subject}</h1>
            <p>작성자: {articleData.memberName}</p>
            <div className="content">{articleData.content}</div>
        </div>
    );
};

export default NoticeView;