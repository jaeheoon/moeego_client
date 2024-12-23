import React, { useEffect, useRef, useState } from "react";
import "../../css/Pro/KakaoMap.css";

const { kakao } = window;

const KakaoMap = ({ items, onMarkerClick }) => {
  const container = useRef(null);
  const [map, setMap] = useState(null);

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

          // 사용자의 위치에 마커 추가
          const marker = new kakao.maps.Marker({
            position: userPosition,
            map: kakaoMap,
          });

          // fetchedItems로부터 마커 추가
          items.forEach((item, index) => {
            const position = new kakao.maps.LatLng(item.lat, item.lng);
            const marker = new kakao.maps.Marker({
              position: position,
              map: kakaoMap,
            });

            // 클릭 이벤트를 추가하여 클릭 시 해당 위치로 지도 이동
            kakao.maps.event.addListener(marker, "click", () => {
              onMarkerClick(item); // 부모 컴포넌트로 클릭된 항목을 전달
            });
          });
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
  }, [items, onMarkerClick]);

  return <div className="mapPage" ref={container}></div>;
};

export default KakaoMap;
