import React from 'react';
import "../../css/Pro/ProMain.css";
import { Link } from 'react-router-dom';

const ProjoinMain = () => {
    return (
        <div className="ProJoinPage">
            <div id="projoinMain_container">
                <form id="ProJoinForm" className="ProJoinbox">
                <br/>
                <h1>어떤 고수로 활동하실건가요?</h1>
                <ul className="category-wrapper">
                    {/* 이부분 메인카테고리 테이블 포이치로 돌릴 예정 */}
                    <li className="category1">
                        <div className="category-list">
                        <Link to="/pro/signup/sub">
                            <img src="../../src/image/home.png" alt="홈/인테리어" width="40" height="40"/>
                            <h1 className="category-title">홈/인테리어</h1>
                        </Link>
                        </div>
                    </li>
                    <li className="category1">
                        <div className="category-list">
                        <Link to="/pro/signup/sub">
                            <img src="../../src/image/si.png" alt="외주" width="40" height="40"/>
                            <h1 className="category-title">외주</h1>
                        </Link>
                        </div>
                    </li>
                    <li className="category1">
                        <div className="category-list">
                        <Link to="/pro/signup/sub">
                            <img src="../../src/image/fashion.png" alt="패션/뷰티" width="40" height="40"/>
                            <h1 className="category-title">패션/뷰티</h1>
                        </Link>
                        </div>
                    </li>
                    <li className="category1">
                        <div className="category-list">
                        <Link to="/pro/signup/sub">
                            <img src="../../src/image/study.png" alt="직무/과외" width="40" height="40"/>
                            <h1 className="category-title">직무/과외</h1>
                        </Link>
                        </div>
                    </li>
                    <li className="category1">
                        <div className="category-list">
                        <Link to="/pro/signup/sub">
                            <img src="../../src/image/hobby.png" alt="취미/자기계발" width="40" height="40"/>
                            <h1 className="category-title">취미/자기계발</h1>
                        </Link>
                        </div>
                    </li>
                    <li className="category1">
                        <div className="category-list">
                        <Link to="/pro/signup/sub">
                            <img src="../../src/image/car.png" alt="자동차" width="40" height="40"/>
                            <h1 className="category-title">자동차</h1>
                        </Link>
                        </div>
                    </li>
                </ul>
                </form>
            </div>
        </div>
    );
};

export default ProjoinMain;