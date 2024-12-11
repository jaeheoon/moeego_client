import React, { useState, useEffect } from 'react';
import '../../css/Pro/ProIntro.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ProIntro = () => {
    const [oneintro, setOneintro] = useState('');
    const [intro, setIntro] = useState('');
    const { mainCateNo } = useParams();
    const location = useLocation();
    const { checkCategories } = location.state || {}; // state에서 checkCategories를 가져옵니다.
    const checkCategoriesArray = checkCategories ? checkCategories : [];

    const navigate = useNavigate();

    const goJoin = () => {
        navigate('/pro/signup', {
            state: {
                mainCateNo,
                checkCategories: checkCategoriesArray, // 변환된 카테고리 배열 전달
                oneintro,
                intro,
            },
        });
    };

    const goBack = () => {
        navigate(`/pro/signup/main/${mainCateNo}`);
    };

    const handleInput = (e) => {
        e.target.style.height = 'auto'; // 높이를 초기화
        e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
    };

    // 한줄 소개 글자수 제한 (50자)
    const handleOneIntroChange = (e) => {
        if (e.target.value.length <= 50) {
            setOneintro(e.target.value);
        }
    };

    // 서비스 소개 글자수 제한 (200자)
    const handleIntroChange = (e) => {
        if (e.target.value.length <= 200) {
            setIntro(e.target.value);
        }
    };

    return (
        <div className="ProIntroPage">
            <div className="ProIntroWrap">
                <h2>달인 소개를 작성해주세요</h2>
                <form id="ProIntroForm">
                    <div className="ProIntroInput">
                        <label className="title" htmlFor="oneintro">한줄 소개</label>
                        <textarea
                            className="content"
                            id="oneintro"
                            name="oneintro"
                            value={oneintro}
                            onChange={handleOneIntroChange}
                            onInput={handleInput}
                            placeholder='한줄 소개'
                            rows={1}
                        ></textarea>
                        <span className="count">
                            (&nbsp;
                            <span style={{ color: oneintro.length >= 50 ? 'red' : '#525252' }}>
                                {oneintro.length}
                            </span>&nbsp;
                            /&nbsp;&nbsp;50 )
                        </span>
                    </div>
                    <div className="ProIntroInput">
                        <label className="title" htmlFor="intro">서비스 소개</label>
                        <textarea
                            className="content"
                            id="intro"
                            name="intro"
                            value={intro}
                            onChange={handleIntroChange}
                            onInput={handleInput}
                            placeholder='서비스 소개'
                            rows={1}
                        ></textarea>
                        <span className="count">
                            (&nbsp;
                            <span style={{ color: intro.length >= 200 ? 'red' : '#525252' }}>
                                {intro.length}
                            </span>&nbsp;
                            /&nbsp;&nbsp;200 )
                        </span>
                    </div>
                </form>
                <div className="moveBtn">
                    <span className='BtnWrap'>
                        <button className="prevBtn" onClick={goBack}>
                            이전
                        </button>
                    </span>
                    <span className='BtnWrap'>
                        <button className="nextBtn" onClick={goJoin}>
                            다음
                        </button>
                    </span>
                </div>
            </div >
        </div >
    );
};

export default ProIntro;
