import React from 'react';
import {Link} from "react-router-dom";
import "/src/css/articles/PopularPostList.css";

const PopularPostList = () => {
    return (
        <section>
            <div>
                <h3>지금 가장 뜨거운🔥커뮤니티 게시글</h3>

                <><Link to="">
                    <div className='PopularPostListContainer'>
                        <div className='AllList'>
                            <div className='AllWrap'>
                                <div className='viewWrap'>
                                    <div className='titleWrap'>
                                        <div>제목</div>
                                    </div>
                                    <div className="contentWrap">
                                        <div>글내용1, 글내용2, 글내용3, 글내용4, 글내용5</div>
                                    </div>
                                    <div className='imageWrap'>
                                        <div><img src='../src/image/view_icon.svg' alt='view'/><span>100</span></div>
                                        <div><img src='../src/image/chat_icon.svg' alt='chat'/><span>100</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                </>
            </div>
        </section>
    );
};

export default PopularPostList;