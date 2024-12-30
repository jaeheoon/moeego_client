import React, { useState, useContext, useEffect } from 'react';
import { ProContext } from "../../context/pro/ProContext";
import KakaoMap from './KakaoMap';
import { useUserInfo } from "../../context/pro/UserInfoContext";
import { useNavigate } from 'react-router-dom';
import "../../css/Pro/KakaoMap.css";

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // 첫 번째 모달 상태
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);  // 두 번째 모달 상태
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 위치
  const [selectedItem, setSelectedItem] = useState(null); // 상세보기 클릭한 아이템
  const { keyword, setKeyword, area, setArea } = useContext(ProContext);
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setKeyword(event.target.value); // 키워드를 업데이트
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = isModalOpen ? "auto" : "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // 상세보기 모달 열기
  const openDetailModal = (item) => {
    setSelectedItem(item);  // 상세보기 클릭한 아이템 설정
    setIsDetailModalOpen(true);  // 두 번째 모달 열기
  };

  // 상세보기 모달 닫기
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);  // 두 번째 모달 닫기
  };

  const handleMarkerClick = (item) => {
    setSelectedLocation(item); // 선택된 위치 업데이트
  };

  const handleListClick = (item) => {
    setSelectedLocation(item); // 리스트에서 클릭된 항목 업데이트
  };

  // 지역에 맞는 카카오맵 중심 좌표 설정
  const getMapCenter = () => {
    switch (area) {
      case '서울':
        return new kakao.maps.LatLng(37.566826004661, 126.978652258309); // 서울
      case '세종':
        return new kakao.maps.LatLng(36.4800649113762, 127.289195324698); // 세종
      case '강원':
        return new kakao.maps.LatLng(37.8853257858209, 127.729829010354); // 강원
      case '인천':
        return new kakao.maps.LatLng(37.4560044656444, 126.705258070068); // 인천
      case '경기':
        return new kakao.maps.LatLng(37.2749769872425, 127.00892996953); // 경기
      case '충북':
        return new kakao.maps.LatLng(36.6353581959954, 127.491457326501); // 충북
      case '충남':
        return new kakao.maps.LatLng(36.6588292532864, 126.672776193822); // 충남
      case '경북':
        return new kakao.maps.LatLng(36.5759962255808, 128.505799255401); // 경북
      case '대전':
        return new kakao.maps.LatLng(36.3505388992836, 127.38483484675); // 대전
      case '대구':
        return new kakao.maps.LatLng(35.8713802646197, 128.601805491072); // 대구
      case '전북':
        return new kakao.maps.LatLng(35.8201963639272, 127.108976712011); // 전북
      case '경남':
        return new kakao.maps.LatLng(35.2377742104522, 128.69189688916); // 경남
      case '울산':
        return new kakao.maps.LatLng(35.5395955247058, 129.311603446508); // 울산
      case '광주':
        return new kakao.maps.LatLng(37.4293941934866, 127.255138719721); // 광주
      case '부산':
        return new kakao.maps.LatLng(35.1798200522868, 129.075087492149); // 부산
      case '전남':
        return new kakao.maps.LatLng(34.8160821478848, 126.462788333376); // 전남
      case '제주':
        return new kakao.maps.LatLng(33.4889179032603, 126.498229141199); // 제주
      case '전국':
        return new kakao.maps.LatLng(37.566826004661, 126.978652258309); // 전국 기본 서울
      default:
        return new kakao.maps.LatLng(37.566826004661, 126.978652258309); // 기본 서울
    }
  };

  // 지역에 맞는 아이템 필터링
  const filteredItems = userInfo ? userInfo.content.filter(item => {
    if (area === '지역' || area === '전국') {
      return true; // '지역' 또는 '전국'일 때 모든 항목 표시
    }
    return item.address.includes(area); // 선택한 지역을 포함한 항목만 표시
  }) : [];

  // 상세보기 페이지로 이동하는 함수
  const goProView = (pro, service) => {
    const proNo = pro.proNo;  // 전문가 번호
    const serviceItem = service;  // 전문가의 서비스 항목들
    const item = pro;  // 전체 전문가 정보 (userInfo 대신 data로 변경)

    // 페이지 이동
    navigate("/pro/proview", { state: { item: item, proNo: proNo, serviceItem: serviceItem } });
  };

  return (
    <div className='proSearchBarWrap'>
      <div className='proSearchInputBarWrap'>
        <img src="/image/search.png" alt="검색버튼" />
        <input
          type="text"
          placeholder='어떤 서비스가 필요하세요?'
          maxLength={30}
          value={keyword}
          onChange={handleSearch}
          onKeyDown={handleKeyPress} // 엔터 키 눌렀을 때 검색 실행
        />
      </div>
      <div className='mapBtnWrap'>
        <button className='mapBtn' onClick={toggleModal}>
          <i className="icon">
            <svg width="20" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="prisma-icon primary" category="contents">
              <path d="M21.25 5.57258V17.7169C21.25 18.4977 20.7327 19.1841 19.982 19.3992L15.6477 20.641C15.3287 20.7324 14.9903 20.7313 14.672 20.6376L9.01265 18.9734C8.9633 18.9589 8.91067 18.96 8.86195 18.9765L5.06119 20.2633C3.92652 20.6474 2.75 19.8036 2.75 18.6057V6.44955C2.75 5.68666 3.24421 5.01167 3.97148 4.78127L8.39965 3.37841C8.73568 3.27195 9.09602 3.26945 9.43349 3.37124L15.0845 5.07559C15.1324 5.09005 15.1836 5.08978 15.2313 5.07483L18.9773 3.90246C20.1043 3.54974 21.25 4.39165 21.25 5.57258ZM19.75 17.7169V5.57258C19.75 5.40388 19.5863 5.2836 19.4253 5.33399L15.8136 6.46434L15.8136 19.0332L19.5689 17.9572C19.6761 17.9265 19.75 17.8284 19.75 17.7169ZM14.3136 18.9687L9.62701 17.5906L9.62702 4.99634L14.3136 6.40983L14.3136 18.9687ZM8.12701 17.6417L8.12702 5.03825L4.4245 6.21123C4.3206 6.24414 4.25 6.34057 4.25 6.44955L4.25 18.6057C4.25 18.7768 4.41807 18.8974 4.58017 18.8425L8.12701 17.6417Z" fill="white"></path>
            </svg>
          </i>
          <span className='mapTitle'>지도</span>
        </button>
      </div>

      {/* 첫 번째 모달: 카카오맵과 필터링된 아이템 리스트 */}
      {isModalOpen && (
        <div className={`map-modalOverlay ${isModalOpen ? 'show' : 'hide'}`} onClick={closeModal}>
          <div className="map-modalContent" onClick={(e) => e.stopPropagation()}>
            <div className='mapName'>
              <h2>주변 달인</h2>
              <button onClick={closeModal}>닫기</button>
            </div>
            <KakaoMap
              items={filteredItems}
              center={getMapCenter()}
              onMarkerClick={handleMarkerClick}
              selectedLocation={selectedLocation}
            />
            <ul className="map-content-wrap">
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  className={`map-content-wrap-list ${selectedLocation && selectedLocation.address === item.address ? 'selected' : ''}`}
                  onClick={() => handleListClick(item)}
                >
                  <div className='item-wrap'>
                    <div className='item-wrap-in'>
                      <span className="item-image">
                        <img className="item-image-img"
                          src={item.profileImage && (item.profileImage.startsWith('https://') || item.profileImage.startsWith('http://'))
                            ? item.profileImage
                            : item.profileImage ? 'https://kr.object.ncloudstorage.com/moeego/profile/' + item.profileImage : '/image/default.svg'}
                          alt=''
                        />
                      </span>
                      <div className="item-Div">
                        <span className="item-name">{item.name}</span> •
                        <span className="item-category">{item.mainCateName}</span> •
                        <span className="item-star"><span className='rating-star'>★</span>{Math.floor(item.star * 10) / 10}</span> •
                        <span className="item-address">{item.address}</span>
                      </div>
                    </div>
                    {/* 상세보기 버튼 클릭 시 두 번째 모달을 열기 */}
                    <button className='item-button' onClick={() => openDetailModal(item)}>상세보기</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 두 번째 모달: 상세보기 모달 */}
      {isDetailModalOpen && selectedItem && (
        <div className={`detail-modalOverlay ${isDetailModalOpen ? 'show' : 'hide'}`} onClick={closeDetailModal}>
          <div className="detail-modalContent" onClick={(e) => e.stopPropagation()}>
            <div className='detail-mapName'>
              <h2>{selectedItem.name}의 서비스</h2>
              <button onClick={closeDetailModal}>닫기</button>
            </div>
            <ul className="detail-map-content-wrap">
              {selectedItem.proItems && selectedItem.proItems.filter((service) => service.subject).length > 0 ? (
                selectedItem.proItems.filter((service) => service.subject).map((service, index) => (
                  <li key={index} className="detail-map-content-wrap-list" onClick={() => goProView(selectedItem, service)}>
                    <span className="service-name">{service.subject}</span>
                    <span className="service-name">
                      <span style={{ color: '#f39c12', marginRight: '0.25rem' }}>★</span>
                      {Math.floor((service.star * 10) / 10)}
                    </span>
                  </li>
                ))
              ) : (
                <li className='detail-map-content-wrap-list'>등록된 서비스가 없습니다.</li> // service.subject가 없는 경우 이 메시지 출력
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
