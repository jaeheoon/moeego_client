import React from 'react';
import MyCommentItem from './MyCommentItem';

const MyComments = () => {
    return (
        <div className='myCommentsPage'>
            <MyCommentItem />
            <MyCommentItem />
            <MyCommentItem />
        </div>
    );
};

export default MyComments;