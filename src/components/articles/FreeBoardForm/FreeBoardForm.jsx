import React from 'react';
import { Route, Routes } from "react-router-dom";
import Observer from "./Observer.jsx";
import LifeTopic from "./LifeTopic.jsx";
import Content from "./Content.jsx";

const FreeBoardForm = () => {
    return (
        <div>
            <div>
                <div>
                    <section>
                        <Observer />
                        <div className={'community-layout'}>
                            <LifeTopic />
                            <Content />
                            <a href={'/'}>위로가기 버튼</a>
                        </div>
                    </section>
                    <div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FreeBoardForm;