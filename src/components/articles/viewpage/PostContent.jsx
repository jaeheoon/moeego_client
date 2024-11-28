import React from 'react';
import '/src/css/articles/PostContent.css'

const PostContent = ({articleData}) => {
    const content =
        `${articleData.content}`;

    return (
        <div className="post-content">
            <p style={{ whiteSpace: 'pre-wrap' }} className="post-text">
                {content}
            </p>
            <div className="post-image-wrapper">
                <img src="/image/home.png" alt="게시글 이미지" className="post-image" />
                <img src="/image/home.png" alt="게시글 이미지" className="post-image" />
                <img src="/image/home.png" alt="게시글 이미지" className="post-image" />
                <img src="/image/home.png" alt="게시글 이미지" className="post-image" />
                <img src="/image/home.png" alt="게시글 이미지" className="post-image" />
            </div>
        </div>
    );
};

export default PostContent;
