import React, { useEffect, useRef, useState } from "react";
import "../../css/Pro/KakaoMap.css";
import apiAxios from "../../api/apiAxios";

const { kakao } = window;

const KakaoMap = ({ selectedLocation, onMarkerClick }) => {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  

  // DB에서 데이터 가져오기
  useEffect(() => {
    apiAxios.get("/api/pro/item", {
      params: {
        location: "서울",
      },
    })
      .then((response) => {
        console.log("받은 데이터:", response.data.data);
        setUserInfo(response.data.data); // 받아온 데이터 userInfo에 저장
      })
      .catch((error) => {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      });
  }, []);

  useEffect(() => {
    // Geolocation API로 사용자의 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // 사용자의 위치로 LatLng 객체 생성
          const userPosition = new kakao.maps.LatLng(latitude, longitude);
          const options = {
            center: userPosition, 
            level: 3, 
          };

          // 카카오 맵 초기화
          const kakaoMap = new kakao.maps.Map(container.current, options);
          setMap(kakaoMap);

          // 지도 초기화 후 Geocoder 사용
          if (kakao.maps) {
            const geocoder = new kakao.maps.services.Geocoder();

            // DB에서 받은 여러 항목에 대해 마커 생성
            if (userInfo && userInfo.content) {
              userInfo.content.map((item) => {
                const address = item.address;

                // 주소를 위도, 경도로 변환
                geocoder.addressSearch(address, (result, status) => {
                  if (status === kakao.maps.services.Status.OK) {
                    const position = new kakao.maps.LatLng(result[0].y, result[0].x);
                    
                    // 마커 생성
                    const marker = new kakao.maps.Marker({
                      position: position,
                      map: kakaoMap,
                    });

                    // 클릭 이벤트를 추가하여 클릭 시 해당 위치로 지도 이동
                    kakao.maps.event.addListener(marker, "click", () => {
                      onMarkerClick(item); // 부모 컴포넌트로 클릭된 항목을 전달
                    });
                  } else {
                    console.error("주소 변환 실패:", address);
                  }
                });
              });
            }
          }
        },
        (error) => {
          console.error("위치 정보를 가져오는 데 실패했습니다.", error);
          const defaultPosition = new kakao.maps.LatLng(33.450701, 126.570667);
          const options = {
            center: defaultPosition,
            level: 3,
          };
          const kakaoMap = new kakao.maps.Map(container.current, options);
          setMap(kakaoMap);
        }
      );
    } else {
      alert("현재 위치를 가져올 수 없습니다.");
    }
  }, [userInfo, onMarkerClick]); // userInfo가 업데이트될 때마다 새로 마커를 표시하도록

  useEffect(() => {
    if (selectedLocation && map) {
      const { lat, lng } = selectedLocation;
      const newPosition = new kakao.maps.LatLng(lat, lng);
      map.panTo(newPosition); // 지도 이동
    }
  }, [selectedLocation, map]);

  return <div className="mapPage" ref={container}></div>;
};

export default KakaoMap;
