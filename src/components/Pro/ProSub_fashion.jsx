import React from 'react';
import "../../css/Pro/ProSub_fashion.css";
import { useNavigate } from 'react-router-dom';

const ProjoinSub_fashion = () => {
    const navigate = useNavigate();

    const goJoin = () => {
        navigate("/pro/signup");
    }

    const goBack = () => {
        navigate("/pro/signup");
    }

    return (
        <div className="ProJoinSub_fashionPage">
            <div id="projoinSub_study_container">
                <form id="ProJoinSub_fashionForm" className="ProJoinSub_fashionbox">
                    <br />
                    <h1>어떤 서비스를 제공할 수 있나요?</h1>
                    <div className="detail-fashion-wrap">
                        {/* 여기에 포이치 돌려서 메인카테고리 별서브 카테고리 찍을 예정 */}
                        <div className="detail-fashion">
                            <input type='checkbox' id="1" />
                            <label htmlFor='1'>헤어 / 메이크업</label>
                        </div>
                        <div className="detail-fashion">
                            <input type='checkbox' id="2" />
                            <label htmlFor='2'>코디</label>
                        </div>
                        <div className="detail-fashion">
                            <input type='checkbox' />
                            <label>퍼스널컬러 / 이미지메이킹</label>
                        </div>
                        <div className="detail-fashion">
                            <input type='checkbox' />
                            <label>촬영 / 모델</label>
                        </div>
                        <div className="detail-fashion">
                            <input type='checkbox' />
                            <label>피부 / 탈모</label>
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

export default ProjoinSub_fashion;