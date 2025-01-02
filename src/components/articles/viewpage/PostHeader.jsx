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
        deleteArticle(articleData.articleNo); // 삭제 API 호출
    };
    
    const getTypeLabel = (type) => {
        switch (type) {
            case 0: return "공지사항";
            case 1: return "이벤트";
            case 2: return "자유게시판";
            case 3: return "Q&A";
            case 4: return "고수게시판";
            default: return "알 수 없음";
        }
    };
    const getTypePath = (type) => {
        switch (type) {
            case 2: return "/article/free";
            case 3: return "/article/qna";
            case 4: return "/article/pro";
            default: return "/"; // 기본 경로
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: articleData.subject,
                text: `${articleData.subject} - ${articleData.memberName}님의 게시글`,
                url: window.location.href,
            })
            .catch((error) => console.error("공유 실패", error));
        } else {
            // 공유 기능이 없는 경우 대체 UI 제공
            const fallbackUrl = window.location.href;
            alert(`공유 기능이 지원되지 않는 브라우저입니다. 아래 URL을 복사하세요:\n${fallbackUrl}`);
        }
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
                        <Link to={getTypePath(articleData.type)} className="category-breadcrumb-link">
                            <span>{getTypeLabel(articleData.type)}</span>
                        </Link>
                    </li>
                </ol>
            </div>

            {/* 게시물 제목 및 정보 */}
            <div className="post-head-title-wrapper has-service">
                <h1 className="post-title">{articleData.subject}</h1>
                <p className="post-location">
                {(!articleData.service || articleData.service === '서비스') &&
                (!articleData.area || articleData.area === '지역')
                    ? "" 
                    : !articleData.service || articleData.service === '서비스'
                    ? articleData.area 
                    : !articleData.area || articleData.area === '지역'
                    ? articleData.service 
                    : `${articleData.service}  ·  ${articleData.area}`}
                </p>
            </div>

            {/* 사용자 정보 및 액션 */}
            <div className="user-profile-bar-container">
                <div className="user-info">
                    <div className="user-profile">
                    <img 
                        src={articleData.profileImage 
                            ? articleData.profileImage.startsWith("https://") || articleData.profileImage.startsWith("http://")
                                ? articleData.profileImage 
                                : `https://kr.object.ncloudstorage.com/moeego/profile/${articleData.profileImage}`
                            : 'https://kr.object.ncloudstorage.com/moeego/profile/default.svg'} 
                        alt="프로필사진" 
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
                    <button className="post-action-button" onClick={handleShare}>
                        <svg width="2rem" height="2rem" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M811.3 938.7H217.5c-71.5 0-129.8-58.2-129.8-129.8V215.1c0-71.6 58.2-129.8 129.8-129.8h296.9c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7H217.5c-24.5 0-44.4 19.9-44.4 44.4v593.8c0 24.5 19.9 44.4 44.4 44.4h593.8c24.5 0 44.4-19.9 44.4-44.4V512c0-23.6 19.1-42.7 42.7-42.7S941 488.4 941 512v296.9c0 71.6-58.2 129.8-129.7 129.8z" fill="#00000000000"/><path d="M898.4 405.3c-23.6 0-42.7-19.1-42.7-42.7V212.9c0-23.3-19-42.3-42.3-42.3H663.7c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h149.7c70.4 0 127.6 57.2 127.6 127.6v149.7c0 23.7-19.1 42.8-42.6 42.8z" fill="#000000000005F6379"/><path d="M373.6 712.6c-10.9 0-21.8-4.2-30.2-12.5-16.7-16.7-16.7-43.7 0-60.3L851.2 132c16.7-16.7 43.7-16.7 60.3 0 16.7 16.7 16.7 43.7 0 60.3L403.8 700.1c-8.4 8.3-19.3 12.5-30.2 12.5z" fill="#000000000005F6379"/></g></svg>
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