import React from 'react';
import "../css/Mainpage.css";
import MainBanner from './mainpage/MainBanner';
import Banner from './mainpage/Banner';
import Reviews from './mainpage/Reviews';
import CleaningSection from './mainpage/CleaningSection';
import Locations from './mainpage/Locations';

const MainPage = () => {
    return (
        <section className='indexPage'>
            <MainBanner/>

            <Banner/>

            <Reviews/>
                
            <CleaningSection/>

            <Locations/>

        </section>
    );
};

export default MainPage;