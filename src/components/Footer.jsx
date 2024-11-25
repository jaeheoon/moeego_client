import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="ulWrap">
        <ul>모이고소개
          <li><Link to="/about">페이지소개</Link></li>
        </ul>
        <ul>고객센터
          <li><a href="">챗봇상담</a></li>
        </ul>
      </div>
      <p>e-mail: moeego@moeego.com | Copyright © Moeego</p>
    </footer >
  );
}

export default Footer;