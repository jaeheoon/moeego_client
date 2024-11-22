import React from 'react';
import "../../css/Pro/ProSub_si.css";
import { useNavigate } from 'react-router-dom';

const ProjoinSub_si = () => {
    const navigate = useNavigate();

    const goJoin = () => {
        navigate("/pro/signup");
    }

    const goBack = () => {
        navigate("/pro/signup/main");
    }

    return (
        <div className="ProJoinSub_siPage">
            <div id="projoinSub_si_container">
                <form id="ProJoinSub_siForm" className="ProJoinSub_sibox">
                    <br />
                    <h1>어떤 서비스를 제공할 수 있나요?</h1>
                    <div className="detail-si-wrap">
                        {/* 여기에 포이치 돌려서 메인카테고리 별서브 카테고리 찍을 예정 */}
                        <div className="detail-si">
                            <input type='checkbox' id="1" />
                            <label htmlFor='1'>디자인 / 모델링</label>
                        </div>
                        <div className="detail-si">
                            <input type='checkbox' id="2" />
                            <label htmlFor='2'>개발 / 데이터</label>
                        </div>
                        <div className="detail-si">
                            <input type='checkbox' />
                            <label>음향 / 더빙</label>
                        </div>
                        <div className="detail-si">
                            <input type='checkbox' />
                            <label>이벤트</label>
                        </div>
                        <div className="detail-si">
                            <input type='checkbox' />
                            <label>강의 / 컨설팅</label>
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

export default ProjoinSub_si;