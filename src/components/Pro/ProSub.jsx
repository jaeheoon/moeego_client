import React from 'react';
import "../../css/Pro/ProSub.css";
import { useNavigate } from 'react-router-dom';

const ProjoinSub = () => {
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
                <form id="ProJoinSubForm" className="ProJoinSubbox">
                    <br />
                    <h1>어떤 서비스를 제공할 수 있나요?</h1>
                    <div className="detail-interior-wrap">
                        {/* 여기에 포이치 돌려서 메인카테고리 별서브 카테고리 찍을 예정 */}
                        <div className="detail-interior">
                            <input type='checkbox' id="1" />
                            <label htmlFor='1'>이사 / 청소</label>
                        </div>
                        <div className="detail-interior">
                            <input type='checkbox' id="2" />
                            <label htmlFor='2'>설치 / 수리</label>
                        </div>
                        <div className="detail-interior">
                            <input type='checkbox' />
                            <label>철거 / 폐기</label>
                        </div>
                        <div className="detail-interior">
                            <input type='checkbox' />
                            <label>인테리어 / 시공</label>
                        </div>
                        <div className="detail-interior">
                            <input type='checkbox' />
                            <label>가구 리폼 / 운반</label>
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

export default ProjoinSub;