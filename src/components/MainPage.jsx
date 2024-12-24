import React from 'react';
import "../css/Mainpage.css";
import MainBanner from './mainpage/MainBanner';
import Reviews from './mainpage/Reviews';
import KeywordSection from './mainpage/KeywordSection';
import Locations from './mainpage/Locations';

const MainPage = () => {
    return (
        <section className='indexPage'>
            <MainBanner />

            <Reviews />

            <KeywordSection />

            <Locations />

        </section>
    );
};

export default MainPage;