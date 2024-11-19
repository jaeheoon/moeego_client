import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/mypage/ChangeAddress.css";

const ChangeAddress = () => {
    return (
        <div className='ChangeAddressPage'>
            <div className='ChangeAddressWrap'>
                <div className='Title'>
                    <Link className="Link" to="/mypage/account/private"><img src="../../../src/image/prev_icon.png" alt="prev"></img></Link>
                    <h1>이메일 변경</h1>
                </div>
                <form className='ChangeAddressForm'>
                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">우편번호</h3>
                        <div>
                            <Link to=""><input type="text" id="zipcode" name="zipcode" placeholder='우편번호' /></Link>
                            <input type="button" id="zipcodeBtn" value="주소검색" />
                        </div>
                    </div>
                    <hr />
                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">주소</h3>
                        <div>
                            <input type="text" id="addr1" name="addr1" placeholder='주소를 입력해주세요' />
                        </div>
                    </div>
                    <hr />
                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">상세주소</h3>
                        <div>
                            <input type="text" id="addr2" name="addr2" placeholder='상세주소를 입력해주세요' />
                        </div>
                    </div>
                    <hr />
                    <div className='ButtonContainer'>
                        <input type="button" value="취소" />
                        <input type="button" value="변경완료" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeAddress;