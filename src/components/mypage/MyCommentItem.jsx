import React from 'react';

const MyCommentItem = ({item}) => {
    return (
        <div className='MyCommentItem'>
            <div className='MyCommentItemContentWrap'>
                <div className='MyCommentItemContent'>{item.content}</div>
                <div className='MyCommentItemTitle'>{item.articleSubject}</div>
                <div className='MyCommentItemDate'>{item.writeDate}</div>
            </div>
        </div>
    );
};

export default MyCommentItem;