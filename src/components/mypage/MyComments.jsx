import React from 'react';
import MyCommentItem from './MyCommentItem';
import { Link } from 'react-router-dom';
import MyPaging from './MyPaging';

const MyComments = ({ comments, totalPages, currentPage, onPageChange }) => {
    return (
        <div className='myCommentsPage'>
            {/* 댓글이 없을 경우 메시지 출력 */}
            {comments.length === 0 ? (
                <p>작성한 댓글이 없습니다.</p>
            ) : (
                comments.map(item => (
                    <Link key={item.commentNo} to={`/article/viewpage?article_no=${item.articleNo}`}>
                        <MyCommentItem item={item} />
                    </Link>
                ))
            )}
            {/* 페이징 */}
            <MyPaging
                totalItems={totalPages}
                currentPage={currentPage + 1}
                itemsPerPage={10} // 서버에서 데이터가 10개씩 제공된다고 가정
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default MyComments;