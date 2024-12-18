import React, { useContext } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';

const MyCommentItem = ({ item }) => {
    // '@사용자1 내용'에서 '@사용자1 ' 제거
    const cleanContent = item.content.replace(/^@\S+\s*/, '');
    const { deleteComment } = useContext(ArticleContext);

    const isDeleted = item.commentStatus === 'DELETED';
    const isEdited = item.commentStatus === 'EDITED';

    const handleDeleteClick = (e) => {
        e.preventDefault(); // Link의 기본 동작 차단
        e.stopPropagation(); // 이벤트 전파 차단
        const isCheck = confirm('정말 댓글을 삭제하시겠습니까?');
        if (isCheck) {
            deleteComment(item.commentNo);
        } else {
            return;
        }
    };

    return (
        <div className='MyCommentItem'>
            {isDeleted ? (
                // 삭제된 댓글인 경우
                <div className='MyCommentItemDeleted'><span style={{ color: '#828282' }}>(작성자가 삭제한 댓글입니다.)</span></div>
            ) : (
                // 삭제되지 않은 댓글인 경우
                <>
                    <div className='MyCommentItemContentWrap'>
                        <div className='MyCommentItemContent'>{cleanContent}</div>
                        <div className='MyCommentItemTitle'>{item.articleSubject}</div>
                        <div className='MyCommentItemDate'>
                            {item.elapsedTime} {isEdited && <span className='MyCommentEdited'>(수정됨)</span>}
                        </div>
                    </div>
                    <div className='MyCommentDeleteBtnWrap'>
                        <button className='MyCommentDeleteBtn' onClick={handleDeleteClick}>
                            삭제
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyCommentItem;