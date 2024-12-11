import React, { useState, useContext } from 'react';
import CommentChild from './CommentChild';
import { AuthContext } from '../../../context/member/AuthContext';
import { ArticleContext } from '../../../context/article/ArticleContext';

const CommentItem = ({ item }) => {
    const username = localStorage.getItem("username");
    const userNo = localStorage.getItem("userno");
    const { isLoggedIn } = useContext(AuthContext);
    const { replyGoLogin, replyCommentWrite, deleteComment, updateComment } = useContext(ArticleContext);

    // 상태 관리: 답글 입력창 표시 여부, 댓글 수정 활성화 여부, 수정된 내용
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // 수정 상태 관리
    const [commentContent, setCommentContent] = useState(item.content); // 댓글 내용 관리
    const [replyContent, setReplyContent] = useState(''); // 답글 내용 관리

    // 답글 버튼 클릭 핸들러
    const handleReplyClick = () => {
        if (isLoggedIn) {
            setIsReplying(!isReplying); // 토글로 입력창 열고 닫기
            if (!isReplying) {
                setReplyContent(`@${item.memberName} `); // 부모 댓글의 작성자 이름을 @OOO 형식으로 넣기
            }
            // 수정 모드가 활성화 되어 있다면, 수정 모드를 종료
            if (isEditing) {
                setIsEditing(false);
                setCommentContent(item.content); // 원래 댓글 내용으로 되돌리기
            }
        } else {
            replyGoLogin();
        }
    };

    // 댓글 수정 버튼 클릭 시 수정 모드로 전환
    const handleEditClick = () => {
        setIsEditing(true); // 수정 모드로 전환
        setIsReplying(false); // 답글 달기 비활성화
    };

    // 댓글 수정 취소
    const handleCancelEdit = () => {
        setIsEditing(false); // 수정 취소
        setCommentContent(item.content); // 원래 내용으로 되돌리기
    };

    // 댓글 수정 제출
    const handleUpdateSubmit = () => {
        if (commentContent !== item.content) {
            // 서버에 수정 요청
            updateComment(item.commentNo, commentContent);
        }
        setIsEditing(false); // 수정 종료
    };

    // 답글 제출 핸들러
    const handleReplySubmit = (e) => {
        if (e) e.preventDefault(); // 엔터키 제출 시 기본 동작 방지
        const replyCommentData = {
            articleNo: item.articleNo,          // 게시글 번호
            memberNo: userNo,                   // 작성자 ID
            parentCommentNo: item.commentNo,    // 부모 댓글 ID
            content: replyContent,              // 댓글 내용
        };
        replyCommentWrite(replyCommentData);
        setReplyContent(''); // 답글 제출 후 내용 초기화
        setIsReplying(false); // 입력창 닫기
    };

    // 댓글이 삭제된 경우 처리
    const isDeleted = item.commentStatus === 'DELETED';
    // 댓글이 수정된 경우 처리
    const isEdited = item.commentStatus === 'EDITED';

    return (
        <div className='commentItemWrap'>
            {/* 기본 댓글 */}
            <div className='commentWriterWrap1'>
                <div className='commentProfileInfo'>
                    <img src='/image/male_icon.png' alt="프로필" className="profileImage" />
                    <span className="commentWriter">{item.memberName}</span>
                </div>
                <div className="commentDetails">
                    {/* 삭제된 댓글 처리 */}
                    {isDeleted ? (
                        <p className="commentContent"><span style={{ color: '#828282' }}>(작성자가 삭제한 댓글입니다.)</span></p>
                    ) : (
                        <>
                            {/* 수정된 댓글 내용 처리 */}
                            {isEditing ? (
                                <div className='replyInputWrap'>
                                    <div className='replyInputDiv'>
                                        <input
                                            type="text"
                                            className="replyInput"
                                            name="comment-content"
                                            placeholder="댓글을 수정하세요."
                                            value={commentContent}
                                            onChange={(e) => setCommentContent(e.target.value)} // 상태 업데이트
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleUpdateSubmit(); // Enter 키 입력 시 수정 제출
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
                                    {/* 댓글 작성 시간 추가 */}
                                    <p className="commentDate">{item.elapsedTime}{isEdited && <span className="editedTag">(수정됨)</span>}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* 삭제된 댓글인 경우 수정/삭제/답글 버튼 숨기기 */}
                {!isDeleted && (
                    <div className='replyBtnWrap'>
                        {/* 수정 버튼 */}
                        {username === item.memberName && (
                            <>
                                {isEditing ? (
                                    <button className='replyUpdateBtn' onClick={handleCancelEdit}>취소</button>
                                ) : (
                                    <button className='replyUpdateBtn' onClick={handleEditClick}>수정</button>
                                )}
                                <button className='replyDeleteBtn' onClick={() => deleteComment(item.commentNo)}>삭제</button>
                            </>
                        )}
                        {/* 답글 버튼: 로그인 여부만 확인 */}
                        {isLoggedIn && (
                            <button className='replyBtn' onClick={handleReplyClick}>
                                답글 달기
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* 답글 입력창 표시 */}
            {isReplying && !isDeleted && (
                <div className='replyInputWrap'>
                    <div className='replyInputDiv'>
                    <input
                        type="text"
                        className="replyInput"
                        name="comment-content"
                        placeholder="답글을 남겨보세요."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)} // 상태 업데이트
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleReplySubmit(e); // Enter 키 입력 시 답글 제출
                            }
                        }}
                    />
                    </div>
                    <button className='replySubmitBtn' onClick={handleReplySubmit}>
                        등록
                    </button>
                </div>
            )}

            {/* 대댓글 재귀적 렌더링 */}
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
