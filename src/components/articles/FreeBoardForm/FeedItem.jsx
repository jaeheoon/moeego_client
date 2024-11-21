import React from 'react';
import '/src/css/articles/FeedItem.css'

const FeedItem = () => {
    return (
        <div className='viewWrap'>

           {/* <div className='category-wrap'>
                <div className='category-1'>
                    고수에게 묻다
                </div>
                <div className='category-2'>
                    에어컨 및 설치 수리
                </div>
            </div>*/}

            <div className='titleWrap'>
                <div>제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목</div>
                <div><img src="../src/image/next_icon.png" alt="next"/></div>
            </div>
            <div className="contentWrap">
                <div>글내용1, 글내용2, 글내용3, 글내용4, 글내용5글내용1, 글내용2, 글내용3, 글내용4, 글내용5글내용1, 글내용2, 글내용3, 글내용4, 글내용5글내용1, 글내용2,
                    글내용3
                </div>
            </div>


            <div className='imageWrap'>
                <div><img src='../src/image/view_icon.svg' alt='view'/><span>100</span></div>
                <div><img src='../src/image/chat_icon.svg' alt='chat'/><span>100</span></div>
            </div>

           <div className='written-time-warp'>
                <div>30분전</div>
            </div>
        </div>
    );
};

export default FeedItem;