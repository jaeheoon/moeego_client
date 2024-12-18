import React, { useContext } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';
import apiAxios from '../../api/apiAxios';

const MyArticleItem = ({item}) => {
    const deleteArticle = async (articleNo) => {
        try {
            // 사용자 확인
            if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
                return;
            }
    
            // 삭제 요청
            const response = await apiAxios.delete(`/api/article/delete/${articleNo}`);
            if (response.status === 200) {
                alert("게시글이 삭제되었습니다.");
                // 삭제 후 필요한 작업 (예: 게시글 목록 갱신 또는 페이지 이동)
                window.location.href = "/mypage/myhistory"; // 목록 페이지로 이동
            }
        } catch (err) {
            console.error("Error deleting article:", err);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        }
    };
    const getCategoryName = (type) => {
        switch (type) {
            case 0:
                return '공지 게시판';
            case 1:
                return '이벤트 게시판';
            case 2:
                return '자유 게시판';
            case 3:
                return 'Q&A 게시판';
            case 4:
                return '달인 게시판';
            case 5:
                return '달인 신청 게시판';
            default:
                return '기타 게시판';
        }
    };

    const handleDeleteClick = (e) => {
        e.preventDefault(); // Link의 기본 동작 차단
        e.stopPropagation(); // 이벤트 전파 차단
        deleteArticle(item.articleNo);
    }
    return (
        <div className='myArticleItemPage'>
            <div className='myArticleItemCategory'>{getCategoryName(item.type)}</div>
            <div className='myArticleItemContentWrap'>
                <div className='myArticleItemTitle'>{item.subject}</div>
                <div className='myArticleItemContent'>{item.content}</div>
                <div className='myArticleItemDate'>{item.elapsedTime}</div>
            </div>
            <div className='myArticleDeleteBtnWrap'>
                <button className='myArticleDeleteBtn' onClick={handleDeleteClick}>
                    삭제
                </button>
            </div>
        </div>
    );
};

export default MyArticleItem;