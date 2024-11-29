import React from 'react';
import CommentChild from './CommentChild';

const CommentItem = ({ item }) => {
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
                </div>
            </div>

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
