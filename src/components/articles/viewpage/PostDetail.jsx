import React from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostReactState from './PostReactState';
import PostComment from './PostComment';
import '/src/css/articles/PostDetail.css'
import PopularPostList from "./PopularPostList.jsx";

const PostDetail = () => {
    return (
        <div className="post-detail">
            <div className="post-detail-wrap">
                <section className="post-detail-container">
                    <PostHeader/>
                    <br/>
                    <PostContent/>
                    <PostReactState/>
                    <br/>
                    <PostComment/>
                    <br/>
                    <br/>
                    <br/>
                    <PopularPostList/>
                </section>
            </div>
        </div>
    );
};

export default PostDetail;