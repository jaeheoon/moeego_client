import React from "react";

function Locations() {
  return (
    <div className="locationsWrap">
        <h2>전국 분포 달인</h2>
        <p>방문하실 수 있는 모든 도시와 함께하세요</p>
        <div className="city-listWrap">
            <span>서울</span> <span>세종</span> <span>강원</span> <span>인천</span>
            <span>경기</span> <span>충북</span> <span>충남</span> <span>경북</span>
            <span>대전</span>
            <span className="start-new-row">대구</span>
            <span>전북</span> <span>경남</span>
            <span>울산</span> <span>광주</span> <span>부산</span> <span>전남</span>
            <span>제주</span>
        </div>
    </div>
  );
}

export default Locations;