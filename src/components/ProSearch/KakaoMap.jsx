import React, { useEffect, useRef, useState } from "react";
import "../../css/Pro/KakaoMap.css";

const { kakao } = window;

const KakaoMap = () => {
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

          // map 상태로 설정
          setMap(kakaoMap);

          const marker = new kakao.maps.Marker({
            position: userPosition, 
            map: kakaoMap, 
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

  }, []);

  return <div className="mapPage" ref={container}></div>;
};

export default KakaoMap;
