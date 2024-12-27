import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  // .info 토글 핸들러
  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <footer className="footer">
      <div className="ulWrap">
        <ul>
          모이고
          <li><Link to="/about">페이지소개</Link></li>
          <li><Link to="/event">공지/이벤트</Link></li>
        </ul>
        {/* 모바일용 토글 버튼 */}
        <button
          className="info-toggle-button"
          onClick={toggleInfo}
          style={{ marginBottom: isInfoVisible ? "1rem" : "" }}
        >
          {isInfoVisible ? "닫기" : "더보기"}
        </button>
        {/* .info 섹션 */}
        <div className={`info ${isInfoVisible ? "visible" : ""}`}>
          (주) 모이고는 통신판매중개자로서 통신판매의 당사자가 아니며 개별 판매자가 제공하는 서비스에 대한 이행, 계약사항 등과 관련한 의무와 책임은 거래당사자에게 있습니다.
          상호명:(주)모이고 · 대표이사:정세묵 · 개인정보책임관리자:김태훈훈 · 주소:서울 강남구 강남대로94길 20 삼오빌딩 6층 (역삼동, 삼오빌딩)
          사업자등록번호:000-00-00000 · 통신판매업신고증:제 2024-서울강남-00000 호 · 직업정보제공사업 신고번호:J1200020240000
        </div>
      </div>
      <p>이메일: moeego@moeego.com | Copyright ©모이고</p>
    </footer>
  );
}

export default Footer;
