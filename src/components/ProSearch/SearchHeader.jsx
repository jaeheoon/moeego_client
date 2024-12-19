import React from 'react';
import Service_area from './Service_area';

const SearchHeader = () => {
    return (
        <header className='searchHeaderWrap'>
            <h1>달인찾기</h1>
            <Service_area />
        </header>
    );
};

export default SearchHeader;