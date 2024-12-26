import React, { useEffect, useState } from "react";
import apiAxios from "../../api/apiAxios";

const { kakao } = window;

function Locations() {
  const [userInfo, setUserInfo] = useState(null);
  const [activeCity, setActiveCity] = useState("");
  const [error, setError] = useState(""); // 에러 상태 추가

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

  const handleCityClick = (city) => {
    setActiveCity(city);
    setError(""); // 새로운 도시 클릭 시 이전 에러 메시지 초기화

    apiAxios.get("/api/pro/item", {
      params: {
        location: city,
      },
    })
      .then((response) => {
        setUserInfo(response.data.data); // 받아온 데이터 userInfo에 저장
      })
      .catch((error) => {
        console.error("데이터를 가져오는데 실패했습니다.", error);
        setError("데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해 주세요."); // 에러 메시지 설정
      });
  };

  useEffect(() => {
    if (!activeCity || !citiesData[activeCity]) return; // activeCity가 없거나, 해당 도시 정보가 없으면 리턴

    const { lat, lng } = citiesData[activeCity];
    const initialPosition = new kakao.maps.LatLng(lat, lng);
    const options = {
      center: initialPosition,
      level: 9,
    };

    // 카카오 맵 초기화
    const container = document.getElementById("map");
    const kakaoMap = new kakao.maps.Map(container, options);

    // Geocoder 사용하여 주소로 위도, 경도 검색
    const geocoder = new kakao.maps.services.Geocoder();

    // DB에서 받은 여러 항목에 대해 마커 생성
    if (userInfo && userInfo.content) {
      userInfo.content.forEach((item) => {
        const address = item.address;

        // 주소가 비어있지 않은지 확인
        if (!address) {
          console.error("주소가 없습니다:", item);
          setError("주소가 제공되지 않았습니다.");
          return; // 주소가 없으면 계속 진행하지 않음
        }

        // 주소를 위도, 경도로 변환
        geocoder.addressSearch(address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const position = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 마커 생성 (커스텀 마커)
            const markerContent = `
              <div class="custom-marker">
                <div class="marker-circle">
                  <img src="${item.profileImage 
                          ? item.profileImage.startsWith("https://") 
                            ? item.profileImage 
                            : `https://kr.object.ncloudstorage.com/moeego/profile/${item.profileImage}` 
                          : '/image/default.svg'}" 
                          class="marker-image" />
                </div>
                <div class="marker-arrow"></div>
              </div>
            `;

            const customOverlay = new kakao.maps.CustomOverlay({
              position: position,
              content: markerContent,
              yAnchor: 1,
            });

            customOverlay.setMap(kakaoMap);

            // 마커 클릭 시 해당 위치로 이동
            kakao.maps.event.addListener(customOverlay, "click", () => {
              console.log(`마커 클릭됨: ${item.name}, ${item.mainCateName}, ${item.address}`);
              kakaoMap.panTo(position);
              kakaoMap.setLevel(5);
            });
          } else {
            console.error("주소 변환 실패:", address, status);
            setError("주소 변환에 실패했습니다.");
          }
        });
      });
    }
  }, [activeCity, userInfo]); // activeCity 또는 userInfo가 변경될 때마다 실행

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
            {/* {error && <p style={{ color: "red" }}>{error}</p>}  */}
            <div id="map"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Locations;
