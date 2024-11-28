import React from 'react';
import FeedItem from "./FeedItem.jsx";
import '/src/css/articles/FeedList.css'
import { Link } from 'react-router-dom';

const FeedList = ({ articles }) => {
    return (
        <div className="FeedList">
            <div className="FeedWrap">

                {
                    articles.map(item => <Link key={item.articleNo} to={`/article/viewpage?article_no=${item.articleNo}` }><div className='FeedItemWrap' key={item.articleNo}>
                        <FeedItem item={item}/>
                    </div>
                    </Link>)
                }
            </div>
        </div>

    );
};

export default FeedList;