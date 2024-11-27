import React from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';

const Content = () => {
    return (
        <div className='ContentWrap'>
            <section>
                <SearchBar />
                <SearchList />
                <SearchList />
                <SearchList />
                <SearchList />
                <SearchList />
            </section>
        </div>
    );
};

export default Content;