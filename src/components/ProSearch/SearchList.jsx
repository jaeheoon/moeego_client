import React from 'react';
import { Link } from 'react-router-dom';

const SearchList = ({ item }) => {
    return (
        <article className='proSearchListWrap'>
            <div className='proSearchListAWrap'>
                <Link className='proSearchListLink' to={`/pro/proview?proNo=${item.proNo}`}>
                    <div className='proSearchListContentWrap'>
                        {/* 제목 */}
                        <div className='proSearchListTitleWrap'>
                            <h3>
                                {item.name}
                            </h3>
                        </div>

                        {/* 상세정보 */}
                        <div className='proSearchListProInfoWrap'>
                            <span>⭐️ 5.0</span>
                        </div>

                        {/* 소개 내용 */}
                        <p className='proSearchListIntro'>
                            {item.oneIntro}dddddddddddddddddddddddddddddddddddddd
                        </p>
                    </div>
                </Link>
                {/* 프로필 이미지 */}
                <div className='proSearchListProfileWrap'>
                    <div className="user-profile-picture">
                        <img
                            src={`https://kr.object.ncloudstorage.com/moeego/profile/${item.profileImage}`}
                            width={150}
                            height={150}
                            alt={item.name}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SearchList;