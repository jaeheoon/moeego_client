import React from 'react';
import SearchHeader from './SearchHeader';
import Content from './Content';

const ProSearch = () => {
    return (
        <div>
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