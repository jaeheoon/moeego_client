import React, { useEffect, useState } from 'react';
import "/src/css/articles/PopularPostList.css";
import FeedItem from '../FreeBoardForm/FeedItem';
import apiAxios from '../../../api/apiAxios';

const PopularPostList = () => {
    const [hotArticle, setHotArticle] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    
    useEffect(() => {
        setIsLoading(true);
        // 인기 게시글 요청
        apiAxios
            .get('/api/article/hot')
            .then((response) => {
                const hotArticles = response.data;
                if (hotArticles.length > 0) {
                    setHotArticle(hotArticles[0]);
                }
            })
            .catch((err) => {
                console.error("Error fetching hot articles:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 완료
            });
    }, []);

    if (isLoading) {
        return <div className='loadingPage'></div>;
    }
    return (
        <section>
            <div className="popularPost">
                <h3>지금 가장 뜨거운🔥커뮤니티 게시글</h3>
                <FeedItem item={hotArticle} />
            </div>
        </section>
    );
};

export default PopularPostList;
