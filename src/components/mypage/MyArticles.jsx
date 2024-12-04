import React from 'react';
import MyArticleItem from './MyArticleItem';
import { Link } from 'react-router-dom';

const MyArticles = ({articles}) => {
    return (
        <div className='myArticlesPage'>
            {
            articles.map(item => <Link key={item.articleNo} to={`/article/viewpage?article_no=${item.articleNo}`}>
                    <MyArticleItem item={item}/>
                    </Link>)
            }
        </div>
    );
};

export default MyArticles;