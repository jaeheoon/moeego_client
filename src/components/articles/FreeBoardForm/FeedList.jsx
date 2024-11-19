import React from 'react';
import FeedItem from "./FeedItem.jsx";

const FeedList = () => {
    return (
        <article>
            <ul>
                <li><FeedItem></FeedItem></li>
                <li><FeedItem></FeedItem></li>
                <li><FeedItem></FeedItem></li>
                <li><FeedItem></FeedItem></li>
                <li><FeedItem></FeedItem></li>
                <li><FeedItem></FeedItem></li>
            </ul>
            <div>
                <div>
                    <div></div>
                </div>
            </div>
        </article>

    );
};

export default FeedList;