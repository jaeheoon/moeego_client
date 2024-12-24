import React, { useState, useEffect } from "react";
import apiAxios from "../../api/apiAxios";
import axios from 'axios';

function Locations() {
  const [activeCity, setActiveCity] = useState(null);
  const [map, setMap] = useState(null); // DB에서 가져올 데이터
  const [userinfo, setUserinfo] = useState(null);

  const citiesData = {
    서울: { lat: 37.566855, lng: 126.9786938, region: "서울" },
    세종: { lat: 36.480210, lng: 127.289202, region: "세종" },
    강원: { lat: 37.885568, lng: 127.729808, region: "강원" },
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
    전남: { lat: 34.816177, lng: 126.462756, region: "전남" },
    제주: { lat: 33.4996, lng: 126.5312, region: "제주" },
  };

  // DB에서 데이터 가져오기
  useEffect(() => {
    apiAxios.get("/api/pro/item", {
      params: {
        location: "서울",
      },
    })
      .then((response) => {
        console.log("받은 데이터:", response.data.data);
        setUserinfo("response.data.data"); // 받아온 데이터 map에 저장
        //setMap("서울특별시 서대문구 통일로39가길 57"); 
      })
      .catch((error) => {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      });
  }, []);

  // 주소를 위도, 경도로 변환
  const convertAddressToLatLng = async (address) => {
    try {
      if (!address || address.trim() === "") {
        console.error("잘못된 주소가 전달되었습니다. 주소를 확인해 주세요.");
        return null;  // 빈 주소일 경우 처리
      }

      console.log("요청한 주소:", address); // 주소가 제대로 전달되는지 확인

      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
  
      //const response = await apiAxios.get(
        //`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_REACT_APP_JAVA_SCRIPT_KEY}`,
          },
        }
      );
      if (response.data.documents.length > 0) {
        const { x, y } = response.data.documents[0]; // x는 경도, y는 위도
        return { lat: parseFloat(y), lng: parseFloat(x) };
      } else {
        console.error("주소를 찾을 수 없습니다.");
        return null;
      }
    } catch (error) {
      console.error("주소 변환 실패:", error);
      return null;
    }
  };

  // 지도 초기화 함수
  const initializeMap = (lat, lng) => {
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng), // 중심 좌표
      level: 6, // 줌 레벨
    };
    const mapInstance = new window.kakao.maps.Map(container, options);

    // DB에서 가져온 마커 데이터로 마커 추가
    if (map && activeCity) {
      const cityData = map[activeCity];  // 첫 번째 데이터가 기본적으로 선택되도록 처리
      if (cityData && cityData.address) {
        // DB에서 가져온 주소를 위도/경도로 변환하여 지도에 표시
        convertAddressToLatLng(cityData.address).then((coordinates) => {
          if (coordinates) {
            const markerPosition = new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(mapInstance);
          }
        });
      }
    }
  };

  const handleCityClick = (city) => {
    setActiveCity(city === activeCity ? null : city);
  };

  // activeCity가 변경될 때마다 지도 업데이트
  useEffect(() => {
    if (activeCity) {
      const { lat, lng } = citiesData[activeCity];
      initializeMap(lat, lng); // 클릭된 도시의 지도 표시
    }
  }, [activeCity]);

  // DB에서 가져온 주소를 변환하여 지도에 표시
  useEffect(() => {
    if (map && activeCity) {
      const cityData = map[activeCity]; // 첫 번째 데이터로 처리
      if (cityData && cityData.address) {
        convertAddressToLatLng(cityData.address).then((coordinates) => {
          if (coordinates) {
            initializeMap(coordinates.lat, coordinates.lng);
          }
        });
      }
    }
  }, [activeCity, map]);

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