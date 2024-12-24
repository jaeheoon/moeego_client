import React from 'react';
import MyArticleItem from './MyArticleItem';
import { Link } from 'react-router-dom';
import MyPaging from './MyPaging';

const MyArticles = ({ articles, totalPages, currentPage, onPageChange }) => {
    return (
        <div className="myArticlesPage">
            {/* 글이 없을 경우 메시지 출력 */}
            {articles.length === 0 ? (
                <p>작성한 글이 없습니다.</p>
            ) : (
                articles.map(item => (
                    <Link key={item.articleNo} to={`/article/viewpage?article_no=${item.articleNo}`}>
                        <MyArticleItem item={item} />
                    </Link>
                ))
            )}
            {/* 페이징 */}
            <MyPaging
                totalItems={totalPages}
                currentPage={currentPage}
                itemsPerPage={10} // 서버에서 데이터가 10개씩 제공된다고 가정
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default MyArticles;