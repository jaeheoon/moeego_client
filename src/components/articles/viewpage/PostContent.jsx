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
            </div>
        </div>
    );
};

export default PostContent;
