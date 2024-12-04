import React from 'react';
import MyCommentItem from './MyCommentItem';
import { Link } from 'react-router-dom';

const MyComments = ({comment}) => {
    return (
        <div className='myCommentsPage'>
            {
                comment.map(item => <Link key={item.commentNo} to={`/article/viewpage?article_no=${item.articleNo}`}>
                    <MyCommentItem item={item}/>
                    </Link>)
            }
        </div>
    );
};

export default MyComments;