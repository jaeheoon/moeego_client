import React from 'react';
import { Link } from 'react-router-dom';

const BookMarkPro = () => {
    return (
        <div className='BookMarkProContainer'>
            <div className='PageTitle'>
                <Link to="/mypage"><img src="../../../src/image/prev_icon.png" alt="prev"></img></Link>
                <h1>찜한 달인</h1>
            </div>
            <div className='CheckContainer'>
                <div className='BoxContainer'>
                    <input type="checkbox" id="allChecked" name="allChecked" />
                    <label>전체 선택</label>
                </div>
                <div className='LinkContainer'>
                    <Link to="">선택 항목 삭제</Link>
                </div>
                <div className="ProListContainer">
                    <div className='ProList'>
                        <div className='ProList-LeftContainer'>
                            <div className="CheckBoxWrap">
                                <input type="checkbox" id="check" name="check" />
                                <label><Link to="/pro/detail">달인 이름</Link></label>
                            </div>
                            <div>한줄 소개</div>
                            <div>평점</div>
                        </div>
                        <div className='ProList-RightContainer'>
                            <div className='ProProfile'>
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookMarkPro;