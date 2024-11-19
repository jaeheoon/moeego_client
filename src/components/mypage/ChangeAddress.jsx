import React from 'react';
import { Link } from 'react-router-dom';

const ChangeAddress = () => {
    return (
        <div className='ChangeAddressPage'>
            <div className='PageTitle'>
                <Link to="/mypage/account/private"><img src="../../../src/image/prev_icon.png" alt="prev"></img></Link>
                <h1>주소 변경</h1>
            </div>
            <form className='ChangeAddressForm'>
                <div className='ChangeAddressContainer'>
                    <div className="SubTitle">우편번호</div>
                    <div>
                        <input type="email" placeholder='이메일을 입력해주세요' />
                    </div>
                    <div>
                        <input type="button" value="주소검색" />
                    </div>
                </div>
                <hr />
                <div className='ChangeAddressContainer'>
                    <div className="SubTitle">주소</div>
                    <div>
                        <input type="text" placeholder='주소를 입력해주세요' />
                    </div>
                </div>
                <hr />
                <div className='ChangeAddressContainer'>
                    <div className="SubTitle">상세주소</div>
                    <div>
                        <input type="text" placeholder='상세주소를 입력해주세요' />
                    </div>
                </div>
                <hr />
                <div className='ButtonContainer'>
                    <div>
                        <input type="button" value="취소" />
                        <input type="button" value="변경완료" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChangeAddress;