import React from 'react';
import '/src/css/articles/PostContent.css'

const PostContent = () => {
    return (
        <div className="post-content">
            <p className="post-text">
                안녕하세요~날씨가 많이 추워졌네요~따뜻한 커피 한잔 드시고 일 시작하세요 ☕<br />
                저희 집은 단독주택인데 1층 같은 2층 구조이고요 아래에서 실외기 자리까지 손이 닿는 위치입니다.
                에어컨 자리가 정중앙 위치돼 있어서 가구 배치가 어려워서 실외기 있는 자리로 옮기고 싶은데
                얼마정도 나오는지 궁금합니다. 친절한 답변 부탁드려요!!
            </p>
            <div className="post-image-wrapper">
                <img
                    src="/src/image/home.png"
                    alt="게시글 이미지"
                    className="post-image"
                />
            </div>
        </div>
    );
};

export default PostContent;
