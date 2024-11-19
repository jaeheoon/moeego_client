import React from 'react';
import Detail_category from './Detail_category';
import "../../css/detail_category/Detail_category.css";

const Home_interior = () => {
    return (
        <div className='detailCategoryListPage'>
            <h1>견적 요청</h1>
            {/* 최상단 카테고리 */}
            <div className='detail_categoryWrap'>
                <Detail_category />
            </div>
            {/* 좌측 메뉴와 우측 콘텐츠 */}
            <div className='detailContentWrap'>
                {/* 좌측 메뉴 */}
                <div className='detailCategoryListWrap'>
                    <ul>
                        <li>이사 / 청소</li>
                        <li>설치 / 수리</li>
                        <li>철거 / 폐기</li>
                        <li>인테리어 / 시공</li>
                        <li>가구 리폼 / 운반</li>
                    </ul>
                </div>

                {/* 우측 콘텐츠 */}
                <div className='detailRightWrap'>
                    <h2>인테리어 / 시공</h2>
                    <div className='detailCardWrap'>
                        {/* 슬라이드 버튼 */}
                        <button className='slideButton left'>{'<'}</button>
                        
                        {/* 카드 리스트 */}
                        <div className='detailCardList'>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* 슬라이드 버튼 */}
                        <button className='slideButton right'>{'>'}</button>
                    </div>
                    <h2>인테리어 / 시공</h2>
                    <div className='detailCardWrap'>
                        {/* 슬라이드 버튼 */}
                        <button className='slideButton left'>{'<'}</button>
                        
                        {/* 카드 리스트 */}
                        <div className='detailCardList'>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* 슬라이드 버튼 */}
                        <button className='slideButton right'>{'>'}</button>
                    </div>
                    <h2>가구 리폼 / 운반</h2>
                    <div className='detailCardWrap'>
                        {/* 슬라이드 버튼 */}
                        <button className='slideButton left'>{'<'}</button>
                        
                        {/* 카드 리스트 */}
                        <div className='detailCardList'>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='../../src/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* 슬라이드 버튼 */}
                        <button className='slideButton right'>{'>'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home_interior;