import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyArticles from './MyArticles';
import MyComments from './MyComments';
import '../../css/mypage/MyHistory.css';

const MyHistory = () => {
    const [activeTab, setActiveTab] = useState('myarticle'); // 기본 탭을 'myarticle'로 설정

    const renderContent = () => {
        switch (activeTab) {
            case 'myarticle':
                return <MyArticles />;
            case 'mycomment':
                return <MyComments />;
            default:
                return null;
        }
    };

    return (
        <div className='myHistoryPage'>
            <div className='PageTitle'>
                <Link to="/mypage"><img src="../../src/image/prev_icon.png" alt="prev" /></Link>
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
    );
};

export default MyHistory;
