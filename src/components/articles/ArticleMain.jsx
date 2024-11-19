import React from 'react';
import LifeTopic from './FreeBoardForm/LifeTopic';

const ArticleMain = () => {
    return (
        <div className='ArticleMainContainer'>
            <div className='TopContainer'>
                <h1>커뮤니티</h1>
                <div>
                    <input type="button" value="글쓰기" />
                </div>
            </div>
            <div className='MainContainer'>
                <div className="Main-LeftContainer">
                    <LifeTopic />
                </div>
                <div className="Main-RightContainer">
                    <div className='NotionContainer'>
                        <div>공지</div>
                        <div>모이고 생활 가이드</div>
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
                                        <div><img src='' alt='view'></img></div>
                                        <div><img src='' alt='comments'></img></div>
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
                                        <div><img src='' alt='view'></img></div>
                                        <div><img src='' alt='conments'></img></div>
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
                                        <div><img src='' alt='view'></img></div>
                                        <div><img src='' alt='conments'></img></div>
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
                                        <div><img src='' alt='view'></img></div>
                                        <div><img src='' alt='conments'></img></div>
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