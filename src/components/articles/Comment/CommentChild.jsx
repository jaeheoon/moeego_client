import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/member/AuthContext';
import { ArticleContext } from '../../../context/article/ArticleContext';

const CommentChild = ({ item }) => {
    const username = localStorage.getItem("username");
    const userNo = localStorage.getItem("userno");
    const { isLoggedIn } = useContext(AuthContext);
    const { replyGoLogin, replyCommentWrite } = useContext(ArticleContext);

    // 상태 관리: 답글 입력창 표시 여부 및 입력된 내용
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

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

    // 답글 버튼 클릭 핸들러
    const handleReplyClick = () => {
        if (isLoggedIn) {
            setIsReplying(!isReplying); // 토글로 입력창 열고 닫기
            setReplyContent(`@${item.memberName}  `); // 초기 입력값으로 @사용자 추가
        } else {
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

        console.log("답글 내용:", replyCommentData);

        // 서버로 데이터 전송
        replyCommentWrite(replyCommentData);

        // 상태 초기화
        setReplyContent(""); // 입력 초기화
        setIsReplying(false); // 입력창 닫기
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
                        <p className="commentContent">{formatContent(item.content)}</p>
                        <p className="commentDate">{item.elapsedTime}</p>
                    </div>
                    {
                        username === item.memberName ? (
                            <div className='replyBtnWrap'>
                                <button className='replyUpdateBtn'>수정</button>
                                <button className='replyDeleteBtn'>삭제</button>
                                <button className='replyBtn' onClick={handleReplyClick}>답글 달기</button>
                            </div>
                        ) : (
                            <div className='replyBtnWrap'>
                                <button className='replyBtn' onClick={handleReplyClick}>답글 달기</button>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* 답글 입력창 */}
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
