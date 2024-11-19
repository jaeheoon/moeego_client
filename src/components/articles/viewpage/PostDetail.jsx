import React from 'react';
import PostHeader from "./PostHeader.jsx";
import PostContent from "./PostContent.jsx";
import PostReactState from "./PostReactState.jsx";
import PostComment from "./PostComment.jsx";
import PopularPost from "./PopularPost.jsx";

const PostDetail = () => {
    return (
        <section>
            <div>
                <PostHeader></PostHeader>
                <hr/>
                <PostContent></PostContent>
                <PostReactState></PostReactState>
                <hr/>
                <PostComment></PostComment>
                <PopularPost></PopularPost>
                </div>
        </section>

    );
};

export default PostDetail;