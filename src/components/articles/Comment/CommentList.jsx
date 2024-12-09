import React from 'react';
import CommentItem from './CommentItem';
import Loading from '../../loading/loading';

const CommentList = ({ commentData, isCommentLoading, isFetchingMore }) => {
    if (isCommentLoading) {
        return (
            <div className="loadingPage">
                <Loading />
            </div>
        );
    }

    if (!commentData || commentData.length === 0) {
        return <div></div>;
    }

    return (
        <div className="commentListWrap">
            {commentData.map((item) => (
                <CommentItem key={item.commentNo} item={item} />
            ))}
            {isFetchingMore && (
                <div className="loadingMore">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default CommentList;
