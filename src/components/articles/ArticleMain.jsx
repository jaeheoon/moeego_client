import React from 'react';
import LifeTopic from './FreeBoardForm/LifeTopic';
import "../../css/articles/ArticleMain.css";

const ArticleMain = () => {
    return (
        <div className='ArticleMainContainer'>
            <div className="ArticleMainWrap">
                <div className='TopContainer'>
                    <h1>커뮤니티</h1>
                    <div className="ButtonWrap">
                        <button type="button" id="articleWriteBtn"><svg fill="#b2b2b2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-2 -2 24.00 24.00" enable-background="new 0 0 20 20" xml:space="preserve" stroke="#b2b2b2" stroke-width="0.0002" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18,20H2c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S18.6,20,18,20z"></path> <path d="M7,16H3c-0.6,0-1-0.4-1-1v-4c0-0.3,0.1-0.5,0.3-0.7l10-10c0.4-0.4,1-0.4,1.4,0l4,4c0.4,0.4,0.4,1,0,1.4l-10,10 C7.5,15.9,7.3,16,7,16z M4,14h2.6l9-9L13,2.4l-9,9V14z"></path></g></svg>글쓰기</button>
                    </div>
                </div>
                <div className='MainContainer'>
                    <div className="Main-LeftContainer">
                        <LifeTopic />
                    </div>
                    <div className="Main-RightContainer">
                        <div className='NotionContainer'>
                            <div>
                                <h4>공지</h4>
                            </div>
                            <div>모이고 생활 가이드</div>
                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                        </div>
                        <div className='HotArticleContainer'>
                            <h3>인기글 모이고</h3>
                            <div className='HotList'>
                                <div className='HotWrap'>
                                    <div className='viewWrap'>
                                        <div className='titleWrap'>
                                            <div>제목</div>
                                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                                        </div>
                                        <div className='imageWrap'>
                                            <div><img src='../src/image/view_icon.svg' alt='view' /><span>100</span></div>
                                            <div><img src='../src/image/chat_icon.svg' alt='chat' /><span>100</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='HotWrap'>
                                    <div className='viewWrap'>
                                        <div className='titleWrap'>
                                            <div>제목</div>
                                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                                        </div>
                                        <div className='imageWrap'>
                                            <div><img src='../src/image/view_icon.svg' alt='view' /><span>100</span></div>
                                            <div><img src='../src/image/chat_icon.svg' alt='chat' /><span>100</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='LatestArticleContainer'>
                            <h3>최신글 모이고</h3>
                            <div className='LatestList'>
                                <div className='LatestWrap'>
                                    <div className='viewWrap'>
                                        <div className='titleWrap'>
                                            <div>제목</div>
                                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                                        </div>
                                        <div className='imageWrap'>
                                            <div><img src='../src/image/view_icon.svg' alt='view' /><span>100</span></div>
                                            <div><img src='../src/image/chat_icon.svg' alt='chat' /><span>100</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='LatestWrap'>
                                    <div className='viewWrap'>
                                        <div className='titleWrap'>
                                            <div>제목</div>
                                            <div><img src="../src/image/next_icon.png" alt="next" /></div>
                                        </div>
                                        <div className='imageWrap'>
                                            <div><img src='../src/image/view_icon.svg' alt='view' /><span>100</span></div>
                                            <div><img src='../src/image/chat_icon.svg' alt='chat' /><span>100</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleMain;