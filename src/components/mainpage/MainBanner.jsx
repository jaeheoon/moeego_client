import React from "react";
import Detail_category from "../detail_category/Detail_category";

function MainBanner() {

    return (
        <div className="mainBannerWrap">
            <h1>내가 찾던 모든 전문가, 모이고에서 한눈에!</h1>
            <div className="searchCategoryWrap">
                <div className="searchBarWrap">
                    <img src="/image/search.png" alt="검색버튼"/>
                    <input type="text" placeholder="검색어 입력" />
                </div>
                <div>
                    <Detail_category/>
                </div>
            </div>
        </div>
    );
}

export default MainBanner;
