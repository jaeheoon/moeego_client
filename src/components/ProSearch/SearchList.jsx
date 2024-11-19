import React from 'react';

const SearchList = () => {
    return (
        <article>
            <div>
                <span data-v-27f6e79d="">바로 답변 가능한 고수</span>
            </div>
            <div>
                {/* 나중에 달인 상세보기/id={id}로 링크 수정 */}
                <a href="#">
                    <div>
                        <div><h5>삐까뻔쩍홈케어 ⭐️ 5.0 후기가 인증하는 업체입니다⭐</h5></div>
                        <div>
                            <span>
                                <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m7.496 1.596 1.407 2.742 3.145.44c.91.127 1.275 1.204.615 1.822l-2.276 2.134.538 3.015c.155.872-.797 1.538-1.612 1.126L6.5 11.452l-2.813 1.423c-.815.412-1.767-.254-1.612-1.126l.538-3.015L.337 6.6c-.66-.618-.296-1.695.615-1.822l3.145-.44 1.407-2.742C5.912.8 7.088.8 7.496 1.596" fill="#FFCE21"></path>
                                </svg>
                            </span>
                            <span>5.0</span>
                            <span>(8,100)</span>
                            <span>경력 20년</span>
                        </div>
                        <div>
                            <div class="user-profile-picture pro-profile-picture">
                                <img width={64} height={64} src="https://static.cdn.soomgo.com/upload/profile/3d1bfeb9-0261-4ee1-a92e-cffaf31f15d8.png?webp=1&amp;h=320&amp;w=320"/>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </article>
    );
};

export default SearchList;