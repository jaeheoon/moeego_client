import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/about/About.css';
import { AuthContext } from '../../context/member/AuthContext';
import apiAxios from '../../api/apiAxios';

const About = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [proCounts, setProCounts] = useState([]);

    useEffect(() => {
        // 서버에서 프로 카운트 리스트 가져오기
        apiAxios.get('/api/about')
            .then(response => {
                if (response.data.success) {
                    setProCounts(response.data.data); // 서버의 data 배열을 상태로 설정
                } else {
                    console.error("데이터를 불러오지 못했습니다.");
                }
            })
            .catch(error => {
                console.error("프로 카운트 리스트를 가져오는 중 오류 발생:", error);
            });
    }, []);

    return (
        <div className='homepageInfoPage'>
            <div className='infoBannerWrap'>
                <div className='aboutInfoWrap'>
                    <div className='infoMissionWrap'>
                        <h1>모이고의 미션</h1>
                    </div>
                    <p>모이고는 여러분들이 도움을 필요로 하는 일을 도와줄 달인이 모이는 장소에요.</p>
                </div>
            </div>
            <div className='infoFitProWrap'>
                <div>
                    <h2>딱! 맞는 달인을 만나세요</h2>
                    <hr />
                    <p>필요한 사람을 찾는 일에 에너지와 시간을 낭비하지 마세요.
                        모이고에는 여러분들이 찾는 달인들이 모여있어요</p>
                </div>
            </div>
            <div className='infoProCountWrap'>
                {proCounts.length > 0 ? (
                    <>
                        <div className='proCountWrap'>
                            <h1>{proCounts.find(item => item.mainCateNo === 1)?.count.toLocaleString() || 0}</h1>
                            <p>홈/인테리어 달인들</p>
                        </div>
                        <div className='proCountWrap'>
                            <h1>{proCounts.find(item => item.mainCateNo === 2)?.count.toLocaleString() || 0}</h1>
                            <p>외주 달인들</p>
                        </div>
                        <div className='proCountWrap'>
                            <h1>{proCounts.find(item => item.mainCateNo === 3)?.count.toLocaleString() || 0}</h1>
                            <p>패션/뷰티 달인들</p>
                        </div>
                        <div className='proCountWrap'>
                            <h1>{proCounts.find(item => item.mainCateNo === 4)?.count.toLocaleString() || 0}</h1>
                            <p>직무/과외 달인들</p>
                        </div>
                        <div className='proCountWrap'>
                            <h1>{proCounts.find(item => item.mainCateNo === 5)?.count.toLocaleString() || 0}</h1>
                            <p>취미/자기계발 달인들</p>
                        </div>
                        <div className='proCountWrap'>
                            <h1>{proCounts.find(item => item.mainCateNo === 6)?.count.toLocaleString() || 0}</h1>
                            <p>자동차 달인들</p>
                        </div>
                    </>
                ) : (
                    <p>데이터를 불러오는 중입니다...</p>
                )}
            </div>
            <div className='infoJoinWrap'>
                <div>
                    <h2>모이고에 가입해보세요</h2>
                    <hr />
                    {isLoggedIn ? (
                        <Link to="/login">이미 계정이 있으신가요?</Link>
                    ) : (
                        <div className='aboutBtnWrap'>
                            <Link to="/signup"><input type='button' value='일반 회원 가입' /></Link>
                            <Link to="/pro/signup/main"><input type='button' value='달인 회원 가입' /></Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;