import React from 'react';

const PostHeader = () => {
    return (
        <div>
            <div className={'post-category-subject'}>
                <ol>
                    <li>
                        <a>
                            <span>커뮤니티</span>
                        </a>
                    </li>
                    <p></p>
                    <li><a>
                        <span>고수에게 묻다</span>
                    </a></li>
                </ol>
            </div>
            <div className={'post-head-title-wrapper has-service'}>
                <p>리본공예 제작</p>
                <h1>선물 포장 알바 구해요</h1>
                <p>서울/강남구</p>
            </div>
            <div className={'user-profile-bar-container'}>
                <div>
                    <div>
                    <span><svg>
                    <path></path>
                </svg></span>명예고수
                    </div>
                    <div>
                        <div>
                            <div><img></img></div>
                            <div></div>
                        </div>
                        <span>손지민</span>
                        <span>2분전 조회 6</span>
                    </div>
                    <div className={'post-actions'}>
                        <img></img>
                        <div>
                            <button></button>
                            <ul>
                                <li><a>게시물 신고하기</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;