import React from 'react';
import PopularPostList from "./PopularPostList.jsx";

const PopularPost = () => {
    return (
        <section>
            <div>
                <h2>지금 가장 뜨거운 커뮤니티 게시글</h2>
            </div>
            <PopularPostList/>
        </section>


    );
};

export default PopularPost;