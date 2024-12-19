import React from 'react';
import SearchHeader from './SearchHeader';
import Content from './Content';
import '../../css/Pro/ProSearch.css';
const ProSearch = () => {
    return (
        <div className='proSearchPage'>
            <SearchHeader />
            <Content />
        </div>
    );
};

export default ProSearch;

/*
    Prosearch
        ㄴ SearchHeader
            ㄴ Service_area
        ㄴ content
            ㄴ SearchBar
            ㄴ SearchList
*/