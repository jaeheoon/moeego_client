import React, { useEffect, useRef, useState } from "react";
import "../../css/Pro/KakaoMap.css";
import { useUserInfo } from "../../context/pro/UserInfoContext";

const { kakao } = window;

const KakaoMap = ({ selectedLocation, onMarkerClick }) => {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const { userInfo } = useUserInfo();
  const [image, setImage] = useState("");

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

          // DB에서 받은 여러 항목에 대해 마커 생성
          if (userInfo && userInfo.content) {
            userInfo.content.map((item) => {
              const address = item.address;
              setImage(item.profileImage);

              // 위도, 경도로 변환
              geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  const position = new kakao.maps.LatLng(result[0].y, result[0].x);

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
                  // 마커 생성
                  const customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: markerContent,
                    yAnchor: 1,
                  });

                  customOverlay.setMap(kakaoMap);

                  //클릭 시 해당 위치로 지도 이동
                  kakao.maps.event.addListener(customOverlay, "click", () => {
                    onMarkerClick(item); // 부모 컴포넌트로 클릭된 항목을 전달
                    const newPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
                    kakaoMap.panTo(newPosition);
                    kakaoMap.setLevel(5);
                  });
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
            level: 6,
          };
          const kakaoMap = new kakao.maps.Map(container.current, options);
          setMap(kakaoMap);
        }
      );
    } else {
      alert("현재 위치를 가져올 수 없습니다.");
    }
  }, [userInfo, selectedLocation]);

  useEffect(() => {
    if (selectedLocation && map) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(selectedLocation.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const position = new kakao.maps.LatLng(result[0].y, result[0].x);

          const markerContent = `
                    <div class="custom-marker">
                      <div class="marker-circle">
                        <img src="${selectedLocation.profileImage
              ? selectedLocation.profileImage.startsWith("https://")
                ? selectedLocation.profileImage
                : `https://kr.object.ncloudstorage.com/moeego/profile/${selectedLocation.profileImage}`
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
          customOverlay.setMap(map);
          map.panTo(position);
          map.setLevel(5);
        }
      });
    }
  }, [selectedLocation, map, userInfo]);

  return <div className="mapPage" ref={container}></div>;
};

export default KakaoMap;