import React from 'react';

const MemberList = () => {
    return (
        <div>
            <div>
                <h2>일반 회원 관리</h2>
            </div>
            <div>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>성별</th>
                            <th>전화번호</th>
                            <th>주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>윤강준</td>
                            <td>test@test.com</td>
                            <td>남자</td>
                            <td>010-1234-1234</td>
                            <td>서울 어딘가</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberList;