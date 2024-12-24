import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/member/AuthContext';
import { ArticleContext } from '../../../context/article/ArticleContext';

const CommentChild = ({ item }) => {
    const username = localStorage.getItem("username");
    const userNo = localStorage.getItem("userno");
    const { isLoggedIn } = useContext(AuthContext);
    const { replyGoLogin, replyCommentWrite, deleteComment, updateComment } = useContext(ArticleContext);

    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [commentContent, setCommentContent] = useState(item.content);
    const [replyContent, setReplyContent] = useState("");

    const handleReplyClick = () => {
        if (isLoggedIn) {
            setIsReplying(!isReplying);
            setReplyContent(`@${item.memberName} `);
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

    const formatContent = (content) => {
        const regex = /(@\S+)/g;
        const parts = content.split(regex);

        return parts.map((part, index) => {
            if (part.startsWith('@')) {
                return <span key={index} className="mention">{part}</span>;
            }
            return part;
        });
    };

    // 프로필 이미지 처리 로직
    const profileImageUrl = item.memberProfileImage.includes('phinf.pstatic.net')
        ? item.memberProfileImage
        : `https://kr.object.ncloudstorage.com/moeego/profile/${item.memberProfileImage}`;

    return (
        <div className='childCommentWrap'>
            <div className='commentWriterWrap'>
                <div className='commentLeftWrap'></div>
                <div className='commentRightWrap'>
                    <div className='commentProfileWrap'>
                        <img src={profileImageUrl} alt="프로필" className="profileImage" />
                        <span className="commentWriter">{item.memberName}</span>
                    </div>
                    <div className="commentDetails2">
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
                                    <p className="commentContent">
                                        {formatContent(item.content)}
                                    </p>
                                )}
                                <p className="commentDate">
                                    {item.elapsedTime}
                                    {isEdited && <span className="editedTag">(수정됨)</span>}
                                </p>
                            </>
                        )}
                    </div>

                    {!isDeleted && username === item.memberName && (
                        <div className='replyBtnWrap'>
                            {isEditing ? (
                                <button className='replyUpdateBtn' onClick={handleCancelEdit}>취소</button>
                            ) : (
                                <button className='replyUpdateBtn' onClick={handleEditClick}>수정</button>
                            )}
                            <button className='replyDeleteBtn' onClick={() => deleteComment(item.commentNo)}>
                                삭제
                            </button>
                            <button className='replyBtn' onClick={handleReplyClick}>답글 달기</button>
                        </div>
                    )}

                    {!isDeleted && username !== item.memberName && (
                        <div className='replyBtnWrap'>
                            <button className='replyBtn' onClick={handleReplyClick}>답글 달기</button>
                        </div>
                    )}
                </div>
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
                        onChange={(e) => setReplyContent(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleReplySubmit(e);
                            }
                        }}
                    />
                    </div>
                    <button className='replySubmitBtn' onClick={handleReplySubmit}>등록</button>
                </div>
            )}

            {item.children && item.children.length > 0 && (
                <div className='childCommentWrap'>
                    {item.children.map((subChild) => (
                        <CommentChild key={subChild.commentNo} item={subChild} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentChild;