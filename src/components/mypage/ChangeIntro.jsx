import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/member/AuthContext';
import apiAxios from '../../api/apiAxios';
import '../../css/mypage/ChangeIntro.css';

const ChangeIntro = () => {
    const [oneIntro, setOneIntro] = useState('');
    const [intro, setIntro] = useState('');
    const [isMobile, setIsMobile] = useState(false); // 모바일 여부 상태 추가
    const { loginUser } = useContext(AuthContext);

    // 화면 크기에 따라 isMobile 상태를 변경
    const handleResize = () => {
        if (window.innerWidth <= 768) { // 화면 크기가 768px 이하일 경우 모바일로 간주
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    // 컴포넌트 마운트 시 화면 크기 감지
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize); // 리사이즈 이벤트 리스너 추가

        return () => {
            window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 리스너 제거
        };
    }, []);

    // 컴포넌트 마운트 시 API 요청하여 한줄 소개와 상세 소개 초기화
    useEffect(() => {
        const fetchIntroData = async () => {
            try {
                const response = await apiAxios.get(`/api/pro/intro`); // 로그인된 사용자 정보에 맞는 데이터 요청
                const { oneIntro: apiOneIntro, intro: apiIntro } = response.data.data;

                if (response.data.data) {
                    setOneIntro(apiOneIntro || ''); // API에서 데이터가 있으면 설정, 없으면 빈 문자열
                    setIntro(apiIntro || '');       // API에서 데이터가 있으면 설정, 없으면 빈 문자열
                } else {
                    setOneIntro('');
                    setIntro('');
                }
            } catch (error) {
                setOneIntro('');
                setIntro('');
                console.error('소개 정보를 불러오는 데 실패했습니다:', error);
            }
        };

        if (loginUser) {
            fetchIntroData(); // 로그인된 사용자가 있을 때만 데이터 요청
        }
    }, [loginUser]);

    const handleOneIntroChange = (e) => {
        if (e.target.value.length <= 50) {
            setOneIntro(e.target.value);
        }
    };

    const handleIntroChange = (e) => {
        if (e.target.value.length <= 200) {
            setIntro(e.target.value);
        }
    };

    // 한줄 소개 textarea의 높이를 텍스트 길이에 맞게 조정
    const getOneIntroRows = (text) => {
        const lineLength = isMobile ? 20 : 40; // 모바일일 경우 20자, 데스크탑일 경우 30자 기준으로 줄 수 계산
        const lines = Math.max(1, Math.floor(text.length / lineLength)); // 텍스트 길이에 맞춰 줄 수 계산
        return lines + 1; // 기본 1줄을 추가로 설정
    };

    // 상세 소개 textarea의 높이를 텍스트 길이에 맞게 조정
    const getIntroRows = (text) => {
        const lineLength = isMobile ? 20 : 40; // 모바일일 경우 20자, 데스크탑일 경우 30자 기준으로 줄 수 계산
        const lines = Math.max(1, Math.floor(text.length / lineLength)); // 텍스트 길이에 맞춰 줄 수 계산
        return lines + 1; // 기본 1줄을 추가로 설정
    };

    // 등록 버튼 클릭 시 API 요청
    const handleSubmit = async () => {
        const data = {
            MemberNo: loginUser,  // userno를 포함
            OneIntro: oneIntro,  // 한줄 소개
            Intro: intro,        // 상세 소개
        };

        try {
            await apiAxios.put('/api/pro/intro', data); // API 호출
            alert('정보가 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.error('등록 실패:', error);
            alert('정보 업데이트에 실패했습니다.');
        }
    };

    // 초기화 버튼 클릭 시 입력 필드 초기화
    const handleReset = () => {
        setOneIntro('');
        setIntro('');
    };

    return (
        <div className='ChangeIntroPage'>
            <div className='ChangeIntroWrap'>
                <h2>달인 소개</h2>
                {/* 한줄 소개 */}
                <div className='oneIntroWrap'>
                    <div className='SubTitle'>한줄 소개</div>
                    <textarea
                        value={oneIntro}
                        onChange={handleOneIntroChange}
                        maxLength={50}
                        rows={getOneIntroRows(oneIntro)}
                        placeholder="한줄 소개를 작성해주세요."
                    />
                    <div className="charCount">
                        {oneIntro.length}/50
                    </div>
                </div>

                {/* 상세 소개 */}
                <div className='introWrap'>
                    <div className='SubTitle'>상세 소개</div>
                    <textarea
                        value={intro}
                        onChange={handleIntroChange}
                        maxLength={200}
                        rows={getIntroRows(intro)}
                        placeholder="상세 소개를 작성해주세요."
                    />
                    <div className="charCount">
                        {intro.length}/200
                    </div>
                </div>
                <div className='buttonWrap'>
                    <button onClick={handleReset}>초기화</button>
                    <button onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default ChangeIntro;