import React, { useContext, useState } from 'react';
import CommentChild from './CommentChild';
import { AuthContext } from '../../../context/member/AuthContext';
import { ArticleContext } from '../../../context/article/ArticleContext';

const CommentItem = ({ item }) => {
    const username = localStorage.getItem("username");
    const userNo = localStorage.getItem("userno");
    const {isLoggedIn} = useContext(AuthContext);
    const {replyGoLogin, replyCommentWrite} = useContext(ArticleContext);

    // 상태 관리: 답글 입력창 표시 여부
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    // 답글 버튼 클릭 핸들러
    const handleReplyClick = () => {
        if(isLoggedIn){
            setIsReplying(!isReplying); // 토글로 입력창 열고 닫기
            setReplyContent(`@${item.memberName}  `);
        }
        else{
            replyGoLogin();
        }
    };

    // 답글 제출 핸들러
    const handleReplySubmit = () => {
        const replyCommentData = {
            articleNo: item.articleNo,          // 게시글 번호
            memberNo: userNo,                   // 작성자 ID
            parentCommentNo: item.commentNo,    // 부모 댓글 ID
            content: replyContent,              // 댓글 내용
          };
        console.log("답글 내용:", replyContent);
        replyCommentWrite(replyCommentData);
        setReplyContent(""); // 제출 후 입력 내용 초기화
        setIsReplying(false); // 입력창 닫기
    };

    return (
        <div className='commentItemWrap'>
            {/* 기본 댓글 */}
            <div className='commentWriterWrap1'>
                <div className='commentProfileInfo'>
                    <img src='/image/male_icon.png' alt="프로필" className="profileImage" />
                    <span className="commentWriter">{item.memberName}</span>
                </div>
                <div className="commentDetails">
                    <p className="commentContent">{item.content}</p>
                    <p className="commentDate">{item.elapsedTime}</p>
                </div>
                {username === item.memberName ? (
                    <div className='replyBtnWrap'>
                        <button className='replyUpdateBtn'>수정</button>
                        <button className='replyDeleteBtn'>삭제</button>
                        <button className='replyBtn' onClick={handleReplyClick}>
                            답글 달기
                        </button>
                    </div>
                ) : (
                    <div className='replyBtnWrap'>
                        <button className='replyBtn' onClick={handleReplyClick}>
                            답글 달기
                        </button>
                    </div>
                )}
            </div>
            {/* 답글 입력창 표시 */}
            {isReplying && (
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
