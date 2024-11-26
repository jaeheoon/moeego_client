import React from 'react';
import "../../css/Pro/ProSubMoblie.css";
import { useNavigate } from 'react-router-dom';

const ProjoinSub_hobby = () => {
    const navigate = useNavigate();

    const goJoin = () => {
        navigate("/pro/signup");
    }

    const goBack = () => {
        navigate("/pro/signup/main");
    }

    return (
        <div className="ProJoinSubPage">
            <div id="projoinSub_container">
                <form id="ProJoinSub_hobbyForm" className="ProJoinSub_box">
                    <br />
                    <h1>어떤 서비스를 제공할 수 있나요?</h1>
                    <div className="detail-wrap">
                        {/* 여기에 포이치 돌려서 메인카테고리 별서브 카테고리 찍을 예정 */}
                        <div className="detail-item">
                            <input type='checkbox' id="1" />
                            <label htmlFor='1'>음악 / 악기</label>
                        </div>
                        <div className="detail-item">
                            <input type='checkbox' id="2" />
                            <label htmlFor='2'>운동 / 대회</label>
                        </div>
                        <div className="detail-item">
                            <input type='checkbox' />
                            <label>연기 / 댄스</label>
                        </div>
                        <div className="detail-item">
                            <input type='checkbox' />
                            <label>미술 / 사진</label>
                        </div>
                        <div className="detail-item">
                            <input type='checkbox' />
                            <label>요리 / 베이킹</label>
                        </div>
                    </div>
                </form>
                <div className='moveBtn'>
                    <span>
                        <button className="prevBtn" onClick={goBack}>이전</button>
                    </span>
                    <span>
                        <button className="nextBtn" onClick={goJoin}>다음</button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProjoinSub_hobby;