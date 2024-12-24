import React, { useEffect } from 'react';
import PostDetail from "./PostDetail.jsx";
import { useParams, useSearchParams } from 'react-router-dom';

const ViewPage = () => {
    const [searchParams] = useSearchParams();
    const articleNo = searchParams.get("article_no");
    
    return (
        <div className={'community-container'}>
            <div>
                <PostDetail articleNo={articleNo}/>
            </div>
        </div>
    );
};

export default ViewPage;