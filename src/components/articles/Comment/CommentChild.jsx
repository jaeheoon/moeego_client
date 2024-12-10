import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/member/AuthContext';
import { ArticleContext } from '../../../context/article/ArticleContext';

const CommentChild = ({ item }) => {
    const username = localStorage.getItem("username");
    const userNo = localStorage.getItem("userno");
    const { isLoggedIn } = useContext(AuthContext);
    const { replyGoLogin, replyCommentWrite, deleteComment, updateComment } = useContext(ArticleContext);

    // 상태 관리: 답글 입력창 표시 여부, 댓글 수정 활성화 여부, 수정된 내용
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // 수정 상태 관리
    const [commentContent, setCommentContent] = useState(item.content); // 댓글 내용 관리
    const [replyContent, setReplyContent] = useState(""); // 답글 내용 관리

    // 답글 버튼 클릭 핸들러
    const handleReplyClick = () => {
        if (isLoggedIn) {
            setIsReplying(!isReplying); // 토글로 입력창 열고 닫기
            setReplyContent(`@${item.memberName} `); // 부모 댓글의 작성자 이름을 @OOO 형식으로 넣기
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
    const handleReplySubmit = () => {
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

    // 댓글 상태 확인
    const isDeleted = item.commentStatus === 'DELETED';
    const isEdited = item.commentStatus === 'EDITED';

    // content에서 @사용자1 부분을 강조하기 위한 함수
    const formatContent = (content) => {
        const regex = /(@\S+)/g; // @로 시작하는 단어를 찾는 정규 표현식
        const parts = content.split(regex); // 정규 표현식에 따라 문자열 분리
        
        return parts.map((part, index) => {
            // @로 시작하는 부분에 스타일 적용
            if (part.startsWith('@')) {
                return <span key={index} className="mention">{part}</span>; // @부분 span으로 묶고 mention 클래스 네임 추가
            }
            return part; // 나머지 부분은 그대로 리턴
        });
    };

    return (
        <div className='childCommentWrap'>
            {/* 대댓글 */}
            <div className='commentWriterWrap'>
                <div className='commentLeftWrap'></div>
                <div className='commentRightWrap'>
                    <div className='commentProfileWrap'>
                        <img src='/image/male_icon.png' alt="프로필" className="profileImage" />
                        <span className="commentWriter">{item.memberName}</span>
                    </div>
                    <div className="commentDetails2">
                        {/* 삭제된 댓글 처리 */}
                        {isDeleted ? (
                            <p className="commentContent"><span style={{ color: '#828282' }}>(작성자가 삭제한 댓글입니다.)</span></p>
                        ) : (
                            <>
                                {/* 댓글 수정 처리 */}
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

                    {/* 삭제된 댓글이 아닌 경우만 버튼 표시 */}
                    {!isDeleted && username === item.memberName && (
                        <div className='replyBtnWrap'>
                            {/* 수정 버튼을 취소 버튼으로 바꿈 */}
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

                    {/* 삭제된 댓글이 아닌 경우만 답글 버튼 표시 */}
                    {!isDeleted && username !== item.memberName && (
                        <div className='replyBtnWrap'>
                            <button className='replyBtn' onClick={handleReplyClick}>답글 달기</button>
                        </div>
                    )}
                </div>
            </div>

            {/* 답글 입력창 */}
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
                        />
                    </div>
                    <button className='replySubmitBtn' onClick={handleReplySubmit}>등록</button>
                </div>
            )}

            {/* 대댓글의 자식 대댓글 */}
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