import React from 'react';
import GuideBanner from "./GuideBanner.jsx";
import ServiceArea from "./ServiceArea.jsx";
import FeedList from "./FeedList.jsx";

const Content = () => {
    return (
        <div className={'community-content-layout'}>
            <GuideBanner></GuideBanner>
            <div></div>
            <section>
                <ServiceArea></ServiceArea>
            </section>
            <article>
                <FeedList></FeedList>
            </article>
        </div>
    );
};

export default Content;