import React from 'react';
import ProInfo from './ProInfo';
import ProDetail from './ProDetail';
import ProReview from './ProReview';
import Reservation from './Reservation';
import "../../css/pro/ProView.css";

const ProView = () => {
    return (
        <section class="detail-view">
            <section class="dalin-photo">
                <div class="dalin-photo-background">
                    <img src="../src/image/mc.jpg" alt="긴딩동" width="100" height="100" />
                </div>
                <div class="dalin-photo-main">
                    <img src="../src/image/mc.jpg" alt="딩동" width="100" height="100" />
                </div>
            </section>
            <section className='detail-view-wrap'>
                <section class="dalin-mainpage">
                    <div className='leftWrap'>
                        <ProInfo />
                        <ProDetail />
                        <ProReview />
                    </div>
                    <div className='rightWrap'>
                        <div className='relativeWrap'>
                            <Reservation />
                        </div>
                    </div>
                </section>
            </section>
        </section >
    );
};

export default ProView;