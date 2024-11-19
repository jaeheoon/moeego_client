import React from 'react';
import { Link } from 'react-router-dom';

const MyHistory = () => {
    return (
        <div className='myArticlesPage'>
            <div className='PageTitle'>
                <Link to="/mypage"><img src="../../src/image/prev_icon.png" alt="prev"></img></Link>
                <h1>모이고 커뮤니티 작성글/댓글</h1>
            </div>

            <div>
                <Link to="/mypage/myhistory/myarticle"><span>작성 글</span></Link>
                <Link to="/mypage/myhistory/mycomment"><span>작성 댓글</span></Link>
                <hr />

            </div>

        </div>
    );
};

export default MyHistory;