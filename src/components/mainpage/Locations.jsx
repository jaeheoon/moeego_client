import React, { useState, useEffect } from "react";

function Locations() {

  const [activeCity, setActiveCity] = useState(null);
  

  const citiesData = {
    서울: { lat: 37.566855, lng: 126.9786938, region: "서울" },
    세종: { lat: 36.480210, lng: 127.289202, region: "세종" },
    강원: { lat: 37.885568, lng: 127.729808, region: "강원"},
    인천: { lat: 37.456135, lng: 126.705185, region: "인천" },
    경기: { lat: 37.289489, lng: 127.053553, region: "경기" },
    충북: { lat: 36.6356, lng: 127.4914, region: "충북" },
    충남: { lat: 36.658923, lng: 126.672829, region: "충남" },
    경북: { lat: 36.576193, lng: 128.505606, region: "경북" },
    대전: { lat: 36.3506, lng: 127.3847, region: "대전" },
    대구: { lat: 35.8714, lng: 128.6018, region: "대구" },
    전북: { lat: 35.820501, lng: 127.108813, region: "전북" },
    경남: { lat: 35.237985, lng: 128.691954, region: "경남" },
    울산: { lat: 35.5396, lng: 129.3116, region: "울산" },
    광주: { lat: 35.160136, lng: 126.851539, region: "광주" },
    부산: { lat: 35.1798, lng: 129.0751, region: "부산" },
    전남: { lat: 34.816177, lng: 126.462756, region: "전남"},
    제주: { lat: 33.4996, lng: 126.5312, region: "제주" },
  };

  useEffect(() => {
    if (window.kakao) return;

    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("카카오 맵 로드 완료");
      });
    };
  }, []);

  // 지도 초기화 함수
  const initializeMap = (lat, lng) => {
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng), // 중심 좌표
      level: 6, // 줌 레벨
    };
    const map = new window.kakao.maps.Map(container, options); // 지도 생성

    // 마커 추가
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
    });
    marker.setMap(map);
  };

  const handleCityClick = (city) => {
    setActiveCity(city === activeCity ? null : city); 
  };

  useEffect(() => {
    if (activeCity) {
      const { lat, lng } = citiesData[activeCity];
      initializeMap(lat, lng); // 클릭된 도시의 지도 표시
    }
  }, [activeCity]);

  return (
    <div className="locationsWrap">
      <h2>전국 분포 달인</h2>
      <p>방문하실 수 있는 모든 도시와 함께하세요</p>
      <div className="city-listWrap">
        {Object.keys(citiesData).map((city) => (
          <div
            key={city}
            className={`city-item ${activeCity === city ? "active" : ""}`}
            onClick={() => handleCityClick(city)}
          >
            <span>{city}</span>
          </div>
        ))}
      </div>

      <div className="city-box-container">
        {activeCity && (
          <div className="city-box">
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Locations;
