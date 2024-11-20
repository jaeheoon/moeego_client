import React from 'react';

const LeaveMemberList = () => {
    return (
        <div>
            <div>
                <h2>탈퇴 회원 관리 | 탈퇴하면 그만이다~ 하는 회원 모음</h2>
            </div>
            <div>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>전화번호</th>
                            <th>탈퇴날짜</th>
                            <th>탈퇴사유</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10</td>
                            <td>윤강준</td>
                            <td>test@test.com</td>
                            <td>010-1234-1234</td>
                            <td>2024.11.19</td>
                            <td>노잼</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveMemberList;