import React from 'react';
import "../../css/Pro/ProSub_study.css";
import { useNavigate } from 'react-router-dom';

const ProjoinSub_study = () => {
    const navigate = useNavigate();

    const goJoin = () => {
        navigate("/signup");
    }

    const goBack = () => {
        navigate("/pro/signup/main");
    }

    return (
        <div className="ProJoinSub_studyPage">
            <div id="projoinSub_study_container">
                <form id="ProJoinSub_studyForm" className="ProJoinSub_studybox">
                <br/>
                <h1>어떤 서비스를 제공할 수 있나요?</h1>
                <div className="detail-study-wrap">
                    {/* 여기에 포이치 돌려서 메인카테고리 별서브 카테고리 찍을 예정 */}
                    <div className="detail-study">
                        <input type='checkbox' id="1"/>
                        <label htmlFor='1'>과외 / 입시</label>
                    </div>
                    <div className="detail-study">
                        <input type='checkbox' id="2"/>
                        <label htmlFor='2'>논술 / 논문</label>
                    </div>
                    <div className="detail-study">
                        <input type='checkbox' />
                        <label>취업 / 창업</label>
                    </div>
                    <div className="detail-study">
                        <input type='checkbox' />
                        <label>자격증 / 시험</label>
                    </div>
                    <div className="detail-study">
                        <input type='checkbox' />
                        <label>실무레슨 / 교육</label>
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

export default ProjoinSub_study;