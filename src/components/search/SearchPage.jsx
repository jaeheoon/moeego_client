import React from 'react';
import '../../css/search/Search.css';
import SearchProItem from './SearchProItem';
import SearchArticleItem from './SearchArticleItem';

const SearchPage = () => {

    return (
        <div className="searchPage">
            <div className="searchPageWrap">
                <div className="searchPageHeader">
                    <h1>검색결과</h1>
                </div>

                {/* 전문가 리스트 */}
                <div className="searchProListHeader">
                    <h2>달인찾기</h2>
                </div>
                <div>
                    <SearchProItem/>
                    <SearchProItem/>
                    <SearchProItem/>
                </div>
                <div className='searchBtnWrap'>
                    <button>더보기</button>
                </div>

                {/* 커뮤니티 리스트 */}
                <div className="articleListWrap">
                    <div className="articleListHeader">
                        <h2>커뮤니티</h2>
                    </div>
                    <div className="articleListContent">
                        <SearchArticleItem/>
                        <SearchArticleItem/>
                        <SearchArticleItem/>
                    </div>
                    <div className="searchBtnWrap">
                        <button>더보기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;