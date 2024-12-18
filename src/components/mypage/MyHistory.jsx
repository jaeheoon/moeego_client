import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyArticles from './MyArticles';
import MyComments from './MyComments';
import '../../css/mypage/MyHistory.css';
import Loading from '../loading/loading';
import apiAxios from '../../api/apiAxios';

const MyHistory = () => {
    const [activeTab, setActiveTab] = useState('myarticle'); // 기본 탭을 'myarticle'로 설정
    const [articleData, setArticleData] = useState({
        content: [],
        totalPages: 0,
        currentPage: 1,
    });
    const [commentData, setCommentData] = useState({
        content: [],
        totalPages: 0,
        currentPage: 1,
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 글 로딩 상태
    const memberNo = localStorage.getItem("userno");

    // 게시글 불러오기
    const fetchArticles = (page = 1) => {
        setIsLoading(true);
        apiAxios
            .get(`/api/article/mypage?member_no=${memberNo}&pg=${page}`)
            .then((response) => {
                setArticleData({
                    content: response.data.content,
                    totalPages: response.data.totalPages,
                    currentPage: response.data.currentPage,
                });
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 완료
            });
    };

    // 댓글 불러오기
    const fetchComments = (page = 1) => {
        setIsLoading(true);
        apiAxios
            .get(`/api/comment/myPage?member_no=${memberNo}&pg=${page}`)
            .then((response) => {
                setCommentData({
                    content: response.data.content,
                    totalPages: response.data.totalPages,
                    currentPage: response.data.currentPage,
                });
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 완료
            });
    };
    useEffect(() => {
        // 기본적으로 첫 페이지의 데이터를 불러옴
        fetchArticles();
        fetchComments();
    }, []);
    
    if (isLoading) {
        return (
            <div className="loadingPage">
                <Loading />
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'myarticle':
                return (
                    <MyArticles
                        articles={articleData.content}
                        totalPages={articleData.totalPages}
                        currentPage={articleData.currentPage}
                        onPageChange={fetchArticles}
                    />
                );
            case 'mycomment':
                return (
                    <MyComments
                        comments={commentData.content}
                        totalPages={commentData.totalPages}
                        currentPage={commentData.currentPage}
                        onPageChange={fetchComments}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className='myHistoryPage'>
            <div className='myHistoryWrap'>
                <div className='PageTitle'>
                    <Link to="/mypage" className='prev'>
                        <img src="/image/prev_icon.png" alt="prev" className='prev' />
                    </Link>
                    <h1>커뮤니티 작성글/댓글</h1>
                </div>

                <div className='myHistoryLinkWrap'>
                    <Link to="#" onClick={() => setActiveTab('myarticle')}>
                        <div className={activeTab === 'myarticle' ? 'active' : ''}>작성 글</div>
                    </Link>
                    <Link to="#" onClick={() => setActiveTab('mycomment')}>
                        <div className={activeTab === 'mycomment' ? 'active' : ''}>작성 댓글</div>
                    </Link>
                </div>
                <hr className='divider' />
                <div className='myArticlesChangeDiv'>
                    {renderContent()} {/* 현재 활성화된 탭에 따라 내용 렌더링 */}
                </div>
            </div>
        </div>
    );
};

export default MyHistory;