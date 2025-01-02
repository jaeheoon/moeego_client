import React, { useState, useContext } from 'react';
import CommentChild from './CommentChild';
import { AuthContext } from '../../../context/member/AuthContext';
import { ArticleContext } from '../../../context/article/ArticleContext';

const CommentItem = ({ item }) => {
    const username = localStorage.getItem("username");
    const userNo = localStorage.getItem("userno");
    const { isLoggedIn } = useContext(AuthContext);
    const { replyGoLogin, replyCommentWrite, deleteComment, updateComment } = useContext(ArticleContext);

    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [commentContent, setCommentContent] = useState(item.content);
    const [replyContent, setReplyContent] = useState('');

    const maxCharacters = 200; // 최대 글자 수

    const handleReplyClick = () => {
        if (isLoggedIn) {
            setIsReplying(!isReplying);
            if (!isReplying) {
                setReplyContent(`@${item.memberName} `);
            }
            if (isEditing) {
                setIsEditing(false);
                setCommentContent(item.content);
            }
        } else {
            replyGoLogin();
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setIsReplying(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCommentContent(item.content);
    };

    const handleUpdateSubmit = () => {
        if (commentContent !== item.content) {
            updateComment(item.commentNo, commentContent);
        }
        setIsEditing(false);
    };

    const handleReplySubmit = (e) => {
        if (e) e.preventDefault();
        if (replyContent.length > maxCharacters) return; // 글자 수 초과 시 제출 방지
        const replyCommentData = {
            articleNo: item.articleNo,
            memberNo: userNo,
            parentCommentNo: item.commentNo,
            content: replyContent,
        };
        replyCommentWrite(replyCommentData);
        setReplyContent('');
        setIsReplying(false);
    };

    const isDeleted = item.commentStatus === 'DELETED';
    const isEdited = item.commentStatus === 'EDITED';

    // 프로필 이미지 URL 처리 로직
    const DEFAULT_PROFILE_IMAGE = '/image/default.svg';
    let profileImageUrl = DEFAULT_PROFILE_IMAGE;

    if (item.memberProfileImage && typeof item.memberProfileImage === "string") {
        const imageUrl = item.memberProfileImage.startsWith("https://") || item.memberProfileImage.startsWith("http://")
            ? item.memberProfileImage
            : "https://kr.object.ncloudstorage.com/moeego/profile/" + item.memberProfileImage;
        profileImageUrl = imageUrl;
    }

    return (
        <div className='commentItemWrap'>
            <div className='commentWriterWrap1'>
                <div className='commentProfileInfo'>
                    <img src={profileImageUrl} alt="프로필" className="profileImage" />
                    <span className="commentWriter">{item.memberName}</span>
                </div>
                <div className="commentDetails">
                    {isDeleted ? (
                        <p className="commentContent"><span style={{ color: '#828282' }}>(작성자가 삭제한 댓글입니다.)</span></p>
                    ) : (
                        <>
                            {isEditing ? (
                                <div className='replyInputWrap'>
                                    <div className='replyInputDiv'>
                                        <input
                                            type="text"
                                            className="replyInput"
                                            name="comment-content"
                                            placeholder="댓글을 수정하세요."
                                            value={commentContent}
                                            maxLength={maxCharacters} // 글자 수 제한
                                            onChange={(e) => setCommentContent(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleUpdateSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                    <button className="replySubmitBtn" onClick={handleUpdateSubmit}>수정</button>
                                </div>
                            ) : (
                                <div className="commentContentWrap">
                                    <p className="commentContent">
                                        {item.content}
                                    </p>
                                    <p className="commentDate">{item.elapsedTime}{isEdited && <span className="editedTag">(수정됨)</span>}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {!isDeleted && (
                    <div className='replyBtnWrap'>
                        {userNo === item.memberNo && (
                            <>
                                {isEditing ? (
                                    <button className='replyUpdateBtn' onClick={handleCancelEdit}>취소</button>
                                ) : (
                                    <button className='replyUpdateBtn' onClick={handleEditClick}>수정</button>
                                )}
                                <button className='replyDeleteBtn' onClick={() => deleteComment(item.commentNo)}>삭제</button>
                            </>
                        )}
                        {isLoggedIn && (
                            <button className='replyBtn' onClick={handleReplyClick}>
                                답글 달기
                            </button>
                        )}
                    </div>
                )}
            </div>

            {isReplying && !isDeleted && (
                <div className='replyInputWrap'>
                    <div className='replyInputDiv'>
                        <input
                            type="text"
                            className="replyInput"
                            name="comment-content"
                            placeholder="답글을 남겨보세요."
                            value={replyContent}
                            maxLength={maxCharacters} // 글자 수 제한
                            onChange={(e) => setReplyContent(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleReplySubmit(e);
                                }
                            }}
                        />
                    </div>
                    <button className='replySubmitBtn' onClick={handleReplySubmit}>
                        등록
                    </button>
                </div>
            )}

            {item.children && item.children.length > 0 && (
                <div className='childCommentWrap'>
                    {item.children.map((child) => (
                        <CommentChild key={child.commentNo} item={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;