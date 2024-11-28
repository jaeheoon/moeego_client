import React from 'react';
import '/src/css/articles/PostComment.css';

const PostComment = ({articleData}) => {
    return (
        <div className="post-comment">
            <div className="comment-input-container">
                {/* 카메라 아이콘 */}
                <label className="upload-icon-container">
                    <img
                        src="/image/camera.png"
                        alt="사진 업로드"
                        className="upload-icon"
                    />
                </label>
                {/* 댓글 입력창 */}
                <input
                    type="text"
                    className="comment-input"
                    placeholder="댓글을 남겨보세요."
                />
            </div>
        </div>
        
    );
};

export default PostComment;
