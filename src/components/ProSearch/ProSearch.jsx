import React, { useState } from "react";
import Content from "./Content";
import ProSearchFunction from "./ProSearchFunction";
import "../../css/Pro/ProSearch.css";

const ProSearch = () => {
    const [service, setService] = useState("서비스");
    const [area, setArea] = useState("지역");

    const handleServiceAreaChange = (selectedService, selectedArea) => {
        setService(selectedService);
        setArea(selectedArea);
    };

    return (
        <div className="proSearchPage">
            <ProSearchFunction
                service={service}
                area={area}
                onServiceAreaChange={handleServiceAreaChange}
            />
            <Content service={service} area={area} />
        </div>
    );
};

export default ProSearch;
