import React from 'react';
import "../../css/login/SearchEmail.css";
import { Link } from 'react-router-dom';

const SearchEmail = ({ closeModal }) => {
    return (
        <div className="SearchEmailPage">
            <div id="searchEmail_container">
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <form className="searchEmailbox">
                            <div class="closeBtn">
                                <button className="searchEamil-modal-close" onClick={closeModal}>
                                    X
                                </button>
                            </div>

                            <h1>이메일 찾기</h1>
                            <div className="searchEmail-align">
                                <label htmlFor="email" className="phone_label">휴대전화 번호</label>
                            </div>
                            <div className='searchEmailwrite'>
                                <input className="phonecheckbox" type="text" id="searchemail" placeholder="예) 010-1234-5678" />
                                <button type="submit" className="checknumBtn">
                                    전송
                                </button>
                            </div>
                            <div className="searchEmailDiv"></div>
                            <div className='box'>
                                <button className="completeBtn" type="submit">
                                    확인
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchEmail;