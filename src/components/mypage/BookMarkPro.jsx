import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/mypage/BookMarkPro.css";

const BookMarkPro = () => {
    return (
        <div className='BookMarkProContainer'>
            <div className='BookMarkProWrap'>
                <div className='PageTitle'>
                    <Link className="prev" to="/mypage">
                        <img src="../../src/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>찜한 달인</h1>
                </div>
                <div className='CheckContainer'>
                    <div className='BoxContainer'>
                        <input type="checkbox" id="allChecked" name="allChecked" className='screen-reader' />
                        <div className='label-box'>
                            <span className='check-icon' aria-hidden="true"></span>
                            <label htmlFor='allChecked'>전체선택</label>
                        </div>
                    </div>
                    <div className='LinkContainer'>
                        <Link to="">선택 항목 삭제</Link>
                    </div>
                </div>
                <div className="ProListContainer">
                    <div className='ProList'>
                        <div className='ProList-LeftContainer'>
                            <div className='BoxContainer'>
                                <input type="checkbox" id="check1" name="check1" className='screen-reader' />
                                <div className='label-box'>
                                    <span className='check-icon' aria-hidden="true"></span>
                                    <label htmlFor='check1'><Link to="/pro/detail">달인 이름</Link></label>
                                </div>
                            </div>
                            <div className='infoContainer'>한줄 소개</div>
                            <div className='infoContainer'>평점</div>
                        </div>
                        <div className='ProList-RightContainer'>
                            <div className='ProProfile'>
                                <img src="../../src/image/naver_green.svg" alt="naver" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ProListContainer">
                    <div className='ProList'>
                        <div className='ProList-LeftContainer'>
                            <div className='BoxContainer'>
                                <input type="checkbox" id="check2" name="check2" className='screen-reader' />
                                <div className='label-box'>
                                    <span className='check-icon' aria-hidden="true"></span>
                                    <label htmlFor='check2'><Link to="/pro/detail">달인 이름</Link></label>
                                </div>
                            </div>
                            <div className='infoContainer'>한줄 소개</div>
                            <div className='infoContainer'>평점</div>
                        </div>
                        <div className='ProList-RightContainer'>
                            <div className='ProProfile'>
                                <img src="../../src/image/naver_green.svg" alt="naver" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ProListContainer">
                    <div className='ProList'>
                        <div className='ProList-LeftContainer'>
                            <div className='BoxContainer'>
                                <input type="checkbox" id="check3" name="check3" className='screen-reader' />
                                <div className='label-box'>
                                    <span className='check-icon' aria-hidden="true"></span>
                                    <label htmlFor='check3'><Link to="/pro/detail">달인 이름</Link></label>
                                </div>
                            </div>
                            <div className='infoContainer'>한줄 소개</div>
                            <div className='infoContainer'>평점</div>
                        </div>
                        <div className='ProList-RightContainer'>
                            <div className='ProProfile'>
                                <img src="../../src/image/naver_green.svg" alt="naver" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ProListContainer">
                    <div className='ProList'>
                        <div className='ProList-LeftContainer'>
                            <div className='BoxContainer'>
                                <input type="checkbox" id="check4" name="check4" className='screen-reader' />
                                <div className='label-box'>
                                    <span className='check-icon' aria-hidden="true"></span>
                                    <label htmlFor='check4'><Link to="/pro/detail">달인 이름</Link></label>
                                </div>
                            </div>
                            <div className='infoContainer'>한줄 소개</div>
                            <div className='infoContainer'>평점</div>
                        </div>
                        <div className='ProList-RightContainer'>
                            <div className='ProProfile'>
                                <img src="../../src/image/naver_green.svg" alt="naver" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ProListContainer">
                    <div className='ProList'>
                        <div className='ProList-LeftContainer'>
                            <div className='BoxContainer'>
                                <input type="checkbox" id="check5" name="check5" className='screen-reader' />
                                <div className='label-box'>
                                    <span className='check-icon' aria-hidden="true"></span>
                                    <label htmlFor='check5'><Link to="/pro/detail">달인 이름</Link></label>
                                </div>
                            </div>
                            <div className='infoContainer'>한줄 소개</div>
                            <div className='infoContainer'>평점</div>
                        </div>
                        <div className='ProList-RightContainer'>
                            <div className='ProProfile'>
                                <img src="../../src/image/naver_green.svg" alt="naver" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookMarkPro;