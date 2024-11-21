import React from 'react';
import MyArticleItem from './MyArticleItem';

const MyArticles = () => {
    return (
        <div className='myArticlesPage'>
            <MyArticleItem/>
            <MyArticleItem/>
            <MyArticleItem/>
        </div>
    );
};

export default MyArticles;