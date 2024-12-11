import React, { useState, useContext } from 'react';
import '../../../../src/css/articles/PostComment.css';
import { AuthContext } from '../../../context/member/AuthContext';
import { ArticleContext } from '../../../context/article/ArticleContext';

const PostComment = ({ articleData, articleNo }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { commentGoWrite, commentGoLogin } = useContext(ArticleContext);
  const [commentContent, setCommentContent] = useState(""); // 입력값 관리
  const userNo = localStorage.getItem("userno");

  const commentWrite = () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    // 댓글 데이터 생성
    const commentData = {
      articleNo: articleNo,       // 게시글 번호
      memberNo: userNo,        // 작성자 ID
      parentCommentNo: 0,          // 부모 댓글 ID
      content: commentContent, // 댓글 내용
    };

    commentGoWrite(commentData); // Axios 요청
    setCommentContent(""); // 입력 필드 초기화
  }
  const commentEnterWrite = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방지

      if (!commentContent.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
      }

      // 댓글 데이터 생성
      const commentData = {
        articleNo: articleNo,       // 게시글 번호
        memberNo: userNo,        // 작성자 ID
        parentCommentNo: 0,          // 부모 댓글 ID
        content: commentContent, // 댓글 내용
      };

      commentGoWrite(commentData); // Axios 요청
      setCommentContent(""); // 입력 필드 초기화
    }
  };

  return (
    <div className="post-comment">
      
        {isLoggedIn ? (
            <div className="comment-input-container">
                <input
                    type="text"
                    className="comment-input"
                    name="comment-content"
                    placeholder="댓글을 남겨보세요."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)} // 상태 업데이트
                    onKeyUp={commentEnterWrite} // 엔터 키 이벤트 핸들링
                />
                <button className='commentSubmitBtn' onClick={commentWrite}>
                    등록
                </button>
            </div>
        ) : (
            <div className="comment-input-container">
                <input
                    type="text"
                    className="comment-input"
                    placeholder="로그인 후에 댓글을 남길 수 있습니다."
                    onKeyUp={commentGoLogin}
                />
                <button className='replySubmitBtn' onClick={commentGoLogin}>
                    등록
                </button>
            </div>
        )}
    </div>
  );
};

export default PostComment;