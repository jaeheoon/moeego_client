import React from 'react';
import { Link } from 'react-router-dom';

const SearchList = () => {
    return (
        <article className='proSearchListWrap'>
            <div className='proSearchListAWrap'>
                <Link className='proSearchListLink' to="/pro/detail">
                    <div className='proSearchListContentWrap'>
                        {/* 제목 */}
                        <div className='proSearchListTitleWrap'>
                            <h3>
                                삐까뻔쩍홈케어 ⭐️ 5.0 후기가 인증하는 업체입니다⭐
                            </h3>
                        </div>

                        {/* 상세정보 */}
                        <div className='proSearchListProInfoWrap'>
                            <span>⭐️ 5.0</span>
                            <span>(8,100)</span>
                            <span>경력 20년</span>
                        </div>

                        {/* 소개 내용 */}
                        <p className='proSearchListIntro'>
                            달인 소개내용
                            앙기모띠
                        </p>
                    </div>
                </Link>
                {/* 프로필 이미지 */}
                <div className='proSearchListProfileWrap'>
                    <div className="user-profile-picture pro-profile-picture">
                        <img
                            width={150}
                            height={150}
                            src="https://static.cdn.soomgo.com/upload/profile/3d1bfeb9-0261-4ee1-a92e-cffaf31f15d8.png?webp=1&amp;h=320&amp;w=320"
                            alt="프로필 이미지"
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SearchList;
