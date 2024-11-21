import React from 'react';
import FeedItem from "./FeedItem.jsx";
import '/src/css/articles/FeedList.css'

const FeedList = () => {
    return (
        <div className="FeedList">
            <div className="FeedWrap">
                <FeedItem/>
                <FeedItem/>
                <FeedItem/>
                <FeedItem/>
                <FeedItem/>
                <FeedItem/>
            </div>
        </div>

    );
};

export default FeedList;