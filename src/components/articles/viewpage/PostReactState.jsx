import React from 'react';
import '/src/css/articles/PostReactState.css';

const PostReactState = () => {
    return (
        <div className="post-react-state">
            <div className="react-item">
                <img
                    src="/src/image/comments.png"
                    alt="좋아요"
                    className="react-icon"
                />
                <span className="react-text">좋아요</span>
            </div>
            <div className="react-item">
                <img
                    src="/src/image/comments.png"
                    alt="댓글"
                    className="react-icon"
                />
                <span className="react-text">댓글</span>
            </div>
        </div>
    );
};

export default PostReactState;
