import React, { useEffect } from 'react';
import PostDetail from "./PostDetail.jsx";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ViewPage = () => {
    return (
        <div className={'community-container'}>
            <div>
                <PostDetail></PostDetail>
            </div>
            <div>

            </div>
        </div>
    );
};

export default ViewPage;