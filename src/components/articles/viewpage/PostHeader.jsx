import React from 'react';
import '../../../css/articles/PostHeader.css';
import { Link } from 'react-router-dom';

const PostHeader = () => {
    return (
        <div className="post-header">
            {/* 카테고리 및 제목 */}
            <div className="post-category-subject">
                <ol className="category-breadcrumb">
                    <li className="category-breadcrumb-item">
                        <Link to='/article' className="category-breadcrumb-link">
                            <span>커뮤니티</span>
                        </Link>
                    </li>
                    <span className="breadcrumb-divider">&gt;</span>
                    <li className="category-breadcrumb-item">
                        <Link to='' className="category-breadcrumb-link">
                            <span>Q&A</span>
                        </Link>
                    </li>
                </ol>
            </div>

            {/* 게시물 제목 및 정보 */}
            <div className="post-head-title-wrapper has-service">
                <p className="post-subtitle">리본공예 제작</p>
                <h1 className="post-title">선물 포장 알바 구해요</h1>
                <p className="post-location">서울/강남구</p>
            </div>

            {/* 사용자 정보 및 액션 */}
            <div className="user-profile-bar-container">
                <div className="user-info">
                    <div className="user-profile">
                        <img
                            src="../../src/image/home.png"
                            alt="사용자 프로필"
                            className="user-profile-image"
                        />
                    </div>
                    <div className="user-details">
                        <span className="user-name">손지민</span>
                        <span className="post-meta">2분 전 · 조회 6</span>
                    </div>
                </div>

                <div className="post-actions">
                    {/* 공유 버튼 */}
                    <button className="post-action-button">
                        <img src="/src/image/share.png" alt="공유" className="action-icon" />
                    </button>
                    {/* 옵션 버튼 */}
                    <button className="post-action-button">
                        <img src="/src/image/3dots.png" alt="옵션" className="action-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;