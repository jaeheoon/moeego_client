import React from 'react';
import "../../css/pro/ProInfo.css";

const ProInfo = () => {
    return (
        <div className="infoWrap">
            <div className="info">
                <div className="info-section-header">
                    <h1 className="nickname">mc딩동</h1>
                    <div className="icon-buttons">
                        <div role="button" className="heart">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#9e9e9e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>
                    </div>
                </div>

                <div className="info-sub-header">
                    <div className="category">행사MC</div>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="#9e9e9e"></path> </g></svg>
                    <div className="address"> 서울 구로구/ 50km 이동가능 </div>
                </div>
                <div className="introduce">달인의 스피치 컨설팅</div>
                <div className="detail-info">
                    <div className="statistics-info">
                        <div className="statistics-info-item">
                            <div className="statistics-info-item-header">고용</div>
                            <div className="statistics-info-item-contents">1회</div>
                        </div>
                        <div className="statistics-info-item">
                            <div className="statistics-info-item-header">리뷰</div>
                            <div className="statistics-info-item-contents">
                                ⭐
                                <span className="rate">5.0</span>
                                <span className="count">(15)</span>
                            </div>
                        </div>
                        <div className="statistics-info-item">
                            <div className="statistics-info-item-header">총 경력</div>
                            <div className="statistics-info-item-contents">10년</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProInfo;