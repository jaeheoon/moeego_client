import React from 'react';

const MyCommentItem = ({ item }) => {
    // '@사용자1 내용'에서 '@사용자1 ' 제거
    const cleanContent = item.content.replace(/^@\S+\s*/, '');

    return (
        <div className='MyCommentItem'>
            <div className='MyCommentItemContentWrap'>
                <div className='MyCommentItemContent'>{cleanContent}</div>
                <div className='MyCommentItemTitle'>{item.articleSubject}</div>
                <div className='MyCommentItemDate'>{item.elapsedTime}</div>
            </div>
        </div>
    );
};

export default MyCommentItem;