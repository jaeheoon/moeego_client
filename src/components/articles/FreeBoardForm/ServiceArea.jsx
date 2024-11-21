import React from 'react';
import '/src/css/articles/ServiceArea.css'

const ServiceArea = () => {
    return (
       <section className="service-area">
           <button className={'service-button'}><span>서비스</span></button>
           <button className={'region-button'}><span>지역</span></button>
       </section>
    );
};

export default ServiceArea;