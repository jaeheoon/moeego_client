import React from 'react';
import MyArticleItem from './MyArticleItem';
import { Link } from 'react-router-dom';
import MyPaging from './MyPaging';

const MyArticles = ({ articles, totalPages, currentPage, onPageChange }) => {
    return (
        <div className="myArticlesPage">
            {articles.map(item => (
                <Link key={item.articleNo} to={`/article/viewpage?article_no=${item.articleNo}`}>
                    <MyArticleItem item={item} />
                </Link>
            ))}
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