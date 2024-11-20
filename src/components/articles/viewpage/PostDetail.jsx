import React from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostReactState from './PostReactState';
import PostComment from './PostComment';
import PopularPost from './PopularPost';
import '/src/css/articles/PostDetail.css'

const PostDetail = () => {
    return (
        <div className="post-detail">
            <div className="post-detail-wrap">
                <section className="post-detail-container">
                    <PostHeader />
                    <br/>
                    <PostContent />
                    <PostReactState />
                    <hr />
                    <PostComment />
                    <PopularPost />
                </section>
            </div>
        </div>
    );
};

export default PostDetail;