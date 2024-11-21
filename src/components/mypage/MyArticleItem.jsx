import React from 'react';

const MyArticleItem = () => {
    return (
        <div className='myArticleItemPage'>
            <div className='myArticleItemCategory'>자유게시판</div>
            <div className='myArticleItemContentWrap'>
                <div className='myArticleItemTitle'>자유게시판 제목</div>
                <div className='myArticleItemContent'>내용</div>
                <div className='myArticleItemDate'>작성일</div>
            </div>
        </div>
    );
};

export default MyArticleItem;