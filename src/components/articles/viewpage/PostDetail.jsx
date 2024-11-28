import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostReactState from './PostReactState';
import PostComment from './PostComment';
import PopularPostList from './PopularPostList';
import '/src/css/articles/PostDetail.css';
import apiAxios from '../../../api/apiAxios';

const PostDetail = ({ articleNo }) => {
    const [articleData, setArticleData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    
    useEffect(() => {
        if (!articleNo) return;
        setIsLoading(true);
        // axios 요청
        apiAxios
            .get(`/api/article/viewpage?article_no=${articleNo}`)
            .then((response) => {
                setArticleData(response.data);
            })
            .catch((err) => {
                console.error('Error fetching article:', err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 완료
            });
    }, [articleNo]);

    if (isLoading) {
        return <div className='loadingPage'></div>;
    }

    return (
        <div className="post-detail">
            <div className="post-detail-wrap">
                <section className="post-detail-container">
                    <PostHeader articleData={articleData} />
                    <br />
                    <PostContent articleData={articleData} />
                    <PostReactState articleData={articleData} />
                    <br />
                    <PostComment articleData={articleData} />
                    <br />
                    <br />
                    <br />
                    <PopularPostList />
                </section>
            </div>
        </div>
    );
};

export default PostDetail;
