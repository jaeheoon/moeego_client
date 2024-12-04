import React from 'react';

const MyArticleItem = ({item}) => {
    
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
    return (
        <div className='myArticleItemPage'>
            <div className='myArticleItemCategory'>{getCategoryName(item.type)}</div>
            <div className='myArticleItemContentWrap'>
                <div className='myArticleItemTitle'>{item.subject}</div>
                <div className='myArticleItemContent'>{item.content}</div>
                <div className='myArticleItemDate'>{item.elapsedTime}</div>
            </div>
        </div>
    );
};

export default MyArticleItem;