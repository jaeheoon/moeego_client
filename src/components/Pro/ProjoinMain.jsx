import React, { useEffect, useState } from "react";
import "../../css/Pro/ProMain.css";
import { Link, useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios";

const ProjoinMain = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null); // 에러 상태 추가

    const navigate = useNavigate();

    // 로그인 상태 확인 후 리다이렉트 처리
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("login");
        const memberStatus = localStorage.getItem("memberStatus");

        if (isLoggedIn) {
            switch (memberStatus) {
                case "ROLE_PRO":
                    alert("이미 달인입니다.");
                    navigate("/");
                    break;
                case "ROLE_PEND_PRO":
                    alert("이미 달인 신청 요청이 접수되었습니다.");
                    navigate("/");
                    break;
                case "ROLE_ADMIN":
                    alert("관리자는 달인 신청을 할 수 없습니다.");
                    navigate("/");
                    break;
                case "ROLE_CANCEL":
                    alert("탈퇴한 회원입니다.");
                    navigate("/");
                    break;
                case "ROLE_CANCEL_PRO":
                    alert("달인 권한이 박탈된 회원은 다시 신청할 수 없습니다.");
                    navigate("/");
                    break;
                default:
                    break;
            }
        }
    }, [navigate]);

    useEffect(() => {
        apiAxios
            .get("/api/main_category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
                setError(err);
            });
    }, []);

    // 카테고리 번호에 따른 이미지 경로 매핑
    const getImageSrc = (mainCateNo) => {
        switch (mainCateNo) {
            case 1:
                return "https://kr.object.ncloudstorage.com/moeego/image/home.png";
            case 2:
                return "https://kr.object.ncloudstorage.com/moeego/image/si.png";
            case 3:
                return "https://kr.object.ncloudstorage.com/moeego/image/fashion.png";
            case 4:
                return "https://kr.object.ncloudstorage.com/moeego/image/study.png";
            case 5:
                return "https://kr.object.ncloudstorage.com/moeego/image/hobby.png";
            case 6:
                return "https://kr.object.ncloudstorage.com/moeego/image/car.png";
            default:
                return "/image/default.jpg"; // 기본 이미지
        }
    };

    return (
        <div className="ProJoinPage">
            <div id="projoinMain_container">
                <form id="ProJoinForm" className="ProJoinbox">
                    <br />
                    <h2>어떤 달인으로 활동하실건가요?</h2>
                    {error ? ( // 에러가 발생했을 경우
                        <p className="error-message">
                            서버 연결이 불안정합니다. 잠시 후 다시 시도해주세요.
                        </p>
                    ) : (
                        <ul className="category-wrapper">
                            {categories.map((item) => (
                                <li className="category1" key={item.mainCateNo}>
                                    <Link
                                        to={`/pro/signup/main/${item.mainCateNo}`}
                                    >
                                        <div className="category-list">
                                            <img
                                                src={getImageSrc(
                                                    item.mainCateNo
                                                )}
                                                alt={item.mainCateName}
                                                width="40"
                                                height="40"
                                            />
                                            <h1 className="category-title">
                                                {item.mainCateName}
                                            </h1>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProjoinMain;
