import React from 'react';
import Detail_category from './Detail_category';
import "../../css/detail_category/Detail_category.css";

const Outsourcing = () => {
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
                        <li>디자인 / 모델링</li>
                        <li>개발 / 데이터</li>
                        <li>음향 / 더빙</li>
                        <li>이벤트</li>
                        <li>강의 / 컨설팅</li>
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

export default Outsourcing;