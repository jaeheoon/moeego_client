import React, { useState, useContext } from 'react';
import '../../../css/articles/PostHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/member/AuthContext';

const PostHeader = ({ articleData, deleteArticle }) => {
    const { loginUser } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const userNo = localStorage.getItem("userno");
    
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleEdit = (articleNo) => {
        navigate(`/article/update/${articleNo}`);
    };

    const handleDelete = () => {
        deleteArticle(articleData.articleNo) // 삭제 API 호출
    };
    
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
                <h1 className="post-title">{articleData.subject}</h1>
                <p className="post-location">서울/강남구</p>
            </div>

            {/* 사용자 정보 및 액션 */}
            <div className="user-profile-bar-container">
                <div className="user-info">
                    <div className="user-profile">
                        <img
                            src="/image/home.png"
                            alt="사용자 프로필"
                            className="user-profile-image"
                        />
                    </div>
                    <div className="user-details">
                        <span className="user-name">{articleData.memberName}</span>
                        <span className="post-meta">{articleData.elapsedTime} · 조회 {articleData.view}</span>
                    </div>
                </div>

                <div className="post-actions">
                    {/* 공유 버튼 */}
                    <button className="post-action-button">
                        <img src="/image/share.png" alt="공유" className="action-icon" />
                    </button>

                    {/* 옵션 버튼 및 드롭다운 */}
                    {userNo == articleData.memberNo && (           //글 쓴 사람이랑 로그인한 사람 같으면 옵션 버튼 나옴
                        <div className="post-dropdown-container">
                            <button
                                className="post-action-button"
                                onClick={toggleDropdown}
                            >
                                <img src="/image/3dots.png" alt="옵션" className="action-icon" />
                            </button>
                            {isDropdownOpen && (
                                <ul className="post-dropdown-menu">
                                    <li onClick={() => handleEdit(articleData.articleNo)}>글 수정</li>
                                    <li onClick={handleDelete}>글 삭제</li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostHeader;
