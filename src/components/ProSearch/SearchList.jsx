import React from 'react';
import { Link } from 'react-router-dom';

const SearchList = ({ id, name, rating, reviews, experience, intro, img_main }) => {
    return (
        <article className='proSearchListWrap'>
            <div className='proSearchListAWrap'>
                {/* <Link className='proSearchListLink' to={`/pro/proview/proNo=${id}`}> */}
                <Link className='proSearchListLink' to={`/pro/proview?proNo=${id}`}>
                    <div className='proSearchListContentWrap'>
                        {/* 제목 */}
                        <div className='proSearchListTitleWrap'>
                            <h3>
                                {name}
                            </h3>
                        </div>

                        {/* 상세정보 */}
                        <div className='proSearchListProInfoWrap'>
                            <span>⭐️ {rating}</span>
                            <span>({reviews})</span>
                            <span>경력 {experience}년</span>
                        </div>

                        {/* 소개 내용 */}
                        <p className='proSearchListIntro'>
                            {intro}
                        </p>
                    </div>
                </Link>
                {/* 프로필 이미지 */}
                <div className='proSearchListProfileWrap'>
                    <div className="user-profile-picture">
                        <img
                            src={img_main}
                            width={150}
                            height={150}
                            alt={name}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SearchList;
