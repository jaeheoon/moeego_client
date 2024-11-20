import React from "react";
import "../css/Header.css";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="topWrap">
        <div className="logo"><Link to='/'>MoeeGo</Link></div>
        <nav className="nav">
          <Link to="/pro/search">달인찾기</Link>
          <Link to="/article">커뮤니티</Link>
          <input className='search' type="text" placeholder="필요한 검색어를 입력하세요" />
          <Link to="/login">로그인</Link>
          <Link to="/mypage">마이페이지</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;