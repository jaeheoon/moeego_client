import React, { useEffect, useRef, useState } from "react";
import "../../css/Pro/KakaoMap.css";

const { kakao } = window;

const KakaoMap = ({ items, onMarkerClick, selectedLocation, center }) => {
  const container = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const kakaoMap = new kakao.maps.Map(container.current, {
      center: center, // prop로 받은 중심 좌표
      level: 6,
    });
    setMap(kakaoMap);

    const geocoder = new kakao.maps.services.Geocoder();
    items.forEach((item) => {
      const address = item.address;
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const position = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            position: position,
            map: kakaoMap,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            onMarkerClick(item);
            kakaoMap.panTo(position);
            kakaoMap.setLevel(5);
          });
        }
      });
    });
  }, [items, center, onMarkerClick]);

  useEffect(() => {
    if (selectedLocation && map) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(selectedLocation.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const position = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.panTo(position);
          map.setLevel(5);

          const marker = new kakao.maps.Marker({
            position: position,
            map: map,
          });
        }
      });
    }
  }, [selectedLocation, map]);

  useEffect(() => {
    if (map && center) {
      map.setCenter(center); // 중심 좌표 변경
    }
  }, [center, map]);

  return <div className="mapPage" ref={container}></div>;
};

export default KakaoMap;
