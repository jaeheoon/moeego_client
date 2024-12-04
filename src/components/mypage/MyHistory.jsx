import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyArticles from './MyArticles';
import MyComments from './MyComments';
import '../../css/mypage/MyHistory.css';
import Loading from '../loading/loading';
import apiAxios from '../../api/apiAxios';

const MyHistory = () => {
    const [activeTab, setActiveTab] = useState('myarticle'); // 기본 탭을 'myarticle'로 설정
    const [articles, setArticles] = useState([]);
    const [comment, setComment] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 글 로딩 상태

    //게시글 불러오기
    useEffect(() => {
        apiAxios
            .get(`/api/article/myPage?member_no=1`)
            .then((response) => {
                setArticles(response.data.content);
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 완료
            });
    }, []);

    //댓글 불러오기
    useEffect(() => {
        apiAxios
            .get(`/api/comment/myPage?member_no=1`)
            .then((response) => {
                setComment(response.data.content);
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 완료
            });
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
                return <MyArticles articles={articles}/>;
            case 'mycomment':
                return <MyComments comment={comment}/>;
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
