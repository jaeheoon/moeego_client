import React, { useEffect, useRef, useState } from "react";
import "../../css/Pro/KakaoMap.css";
import { useUserInfo } from "../../context/pro/UserInfoContext";

const { kakao } = window;

const KakaoMap = ({ items, onMarkerClick, selectedLocation }) => {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    // Geolocation API로 사용자의 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPosition = new kakao.maps.LatLng(latitude, longitude);
          const options = {
            center: userPosition,
            level: 6,
          };

          // 카카오 맵 초기화
          const kakaoMap = new kakao.maps.Map(container.current, options);
          setMap(kakaoMap);

          // 지도 초기화 후 Geocoder 사용
          const geocoder = new kakao.maps.services.Geocoder();
          const addedMarkers = new Set(); // 이미 추가된 마커 위치를 추적

          // DB에서 받은 여러 항목에 대해 마커 생성
          if (userInfo && userInfo.content) {
            userInfo.content.forEach((item) => {
              const address = item.address;

              // 주소를 위도, 경도로 변환
              geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  const position = new kakao.maps.LatLng(result[0].y, result[0].x);

                  // 이미 해당 위치에 마커가 추가되었는지 확인
                  const markerKey = `${position.getLat()}-${position.getLng()}`;
                  if (!addedMarkers.has(markerKey)) {
                    // 마커 생성
                    const marker = new kakao.maps.Marker({
                      position: position,
                      map: kakaoMap,
                    });

                    // 클릭 이벤트를 추가하여 클릭 시 해당 위치로 지도 이동
                    kakao.maps.event.addListener(marker, "click", () => {
                      onMarkerClick(item); // 부모 컴포넌트로 클릭된 항목을 전달
                      kakaoMap.panTo(position); // 클릭된 마커 위치로 지도 이동
                      kakaoMap.setLevel(5);
                    });

                    // 마커 위치를 addedMarkers에 추가하여 중복 마커 방지
                    addedMarkers.add(markerKey);
                  }
                } else {
                  console.error("주소 변환 실패:", address);
                }
              });
            });
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
  }, [userInfo, onMarkerClick]);

  useEffect(() => {
    if (selectedLocation && map) {
      const { address } = selectedLocation;
      const geocoder = new kakao.maps.services.Geocoder();

      // 주소를 위도, 경도로 변환하여 해당 위치로 이동
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const position = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.panTo(position); // 지도 이동
          map.setLevel(5); // 줌 레벨 설정
          
          // 해당 위치에 마커 표시
          const marker = new kakao.maps.Marker({
            position: position,
            map: map,
          });
        }
      });
    }
  }, [selectedLocation, map]);

  return <div className="mapPage" ref={container}></div>;
};

export default KakaoMap;
