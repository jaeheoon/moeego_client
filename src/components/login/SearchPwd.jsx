import React, { useState } from "react";
import "../../css/login/SearchPwd.css";


const SearchPwd = ({ closeModal }) => {
  return (
    <div className="SearchPwdPage">
      <div id="searchPwd_container">
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="searchPwdbox">
              <div className="closeBtn">
                <button className="searchPwd-modal-close" onClick={closeModal}>
                  X
                </button>
              </div>
              <h1>비밀번호 찾기</h1>
              <div className="searchPwd-align">
                <label htmlFor="search-email" className="email_label">
                  가입한 이메일 주소를 입력해주세요
                </label>
              </div>
              <div className='box'>
                <input className="checkemailbox" type="email" id="email" placeholder="example@MoeeGo.com" />
              </div>
              <div className="searchPwdDiv"></div>
              <div className="searchPwd-align">
                <p className="search-warn">가입하신 이메일 주소를 입력해주시면</p>
                <p className="search-warn">새로운 비밀번호를 설정 가능한 링크를 보내드립니다.</p>
              </div>
              <div className='box'>
                <button className="emailsendBtn" type="submit">
                  이메일 전송하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPwd;