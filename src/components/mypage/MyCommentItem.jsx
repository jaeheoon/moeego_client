import React from 'react';

const MyCommentItem = () => {
    return (
        <div className='MyCommentItem'>
            <div className='MyCommentItemContentWrap'>
                <div className='MyCommentItemContent'>작성내용</div>
                <div className='MyCommentItemTitle'>작성된글제목</div>
                <div className='MyCommentItemDate'>작성일</div>
            </div>
        </div>
    );
};

export default MyCommentItem;