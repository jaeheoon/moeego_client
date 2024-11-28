import React from 'react';
import Detail_category from './Detail_category';
import "../../css/detail_category/Detail_category.css";

const Hobby = () => {
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
                        <li>음악 / 악기</li>
                        <li>운동 / 대회</li>
                        <li>연기 / 댄스</li>
                        <li>미술 / 사진</li>
                        <li>요리 / 베이킹</li>
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
                                    <img src='/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='/image/cleaning.png' alt='정리' />
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
                                    <img src='/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='/image/cleaning.png' alt='정리' />
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
                                    <img src='/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='/image/cleaning.png' alt='정리' />
                                </div>
                                <div className='detailCardContent'>
                                    <h4>정리수납 컨설팅</h4>
                                    <p>312,300명 요청</p>
                                </div>
                            </div>
                            <div className='detailCard'>
                                <div className='detailCardImg'>
                                    <img src='/image/cleaning.png' alt='정리' />
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

export default Hobby;