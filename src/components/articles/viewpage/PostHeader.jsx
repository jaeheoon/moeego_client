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