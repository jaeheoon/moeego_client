import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiAxios from '../../api/apiAxios';

const ProResultPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false); // hover 상태 관리
    const [isMobile, setIsMobile] = useState(false); // 모바일 여부 상태

    const access = Number(searchParams.get('access')); // 쿼리 파라미터에서 'access' 값 가져오기

    // 전환 결과 메시지 정의
    const resultMessage = access === 1
        ? '회원님의 이메일로 달인 심사 결과가 발송되었습니다.'
        : access === 0
            ? '회원님의 달인 심사가 진행중입니다.'
            : access === 2
                ? '회원님의 달인 심사가 거절되었습니다.'
                : '회원님의 달인 심사가 통과되었습니다.';

    // 버튼 클릭 핸들러 정의
    const handleLogout = async () => {
        try {
            const response = await apiAxios.patch("/api/admin/emailstatus");
            navigate('/logout'); // 로그아웃 페이지로 이동
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.error("Error: 사용자 정보를 찾을 수 없거나 이메일 상태를 찾을 수 없습니다.");
                } else {
                    console.error(`Error: ${error.response.data || "An error occurred"}`);
                }
            } else {
                console.error("Network error or other issue:", error);
            }
        } finally {
            setIsMenuOpen(false);
            document.body.style.overflow = "auto";
        }
    };

    const handleBack = async () => {
        navigate('/'); // 홈으로 이동
    };

    // 화면 크기 체크 (모바일인지 아닌지 구분)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1250); // 1250px 이하일 때 모바일로 설정
        };

        handleResize(); // 컴포넌트 처음 렌더링 시 체크
        window.addEventListener('resize', handleResize); // 화면 크기 변경 시 체크

        return () => {
            window.removeEventListener('resize', handleResize); // cleanup
        };
    }, []);

    return (
        <div style={styles.containerWrap}>
            <div style={{ ...styles.container, boxShadow: isMobile ? 'none' : '0px 1rem 2rem rgba(0, 0, 0, 0.3)', backgroundColor: isMobile ? '#fff' : '#efefef' }}>
                <h1 style={styles.title}>달인 전환 결과</h1>
                <p style={styles.message}>{resultMessage}</p>

                {/* 조건부 버튼 렌더링 */}
                {access === 1 || access === 3 || access === 2 ? (
                    <button
                        style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
                        onMouseEnter={() => setIsHovered(true)}  // 마우스 오버 시 hover 상태 true
                        onMouseLeave={() => setIsHovered(false)} // 마우스 나가면 hover 상태 false
                        onClick={handleLogout}
                    >
                        로그아웃
                    </button>
                ) : access === 0 ? (
                    <button
                        style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
                        onMouseEnter={() => setIsHovered(true)}  // 마우스 오버 시 hover 상태 true
                        onMouseLeave={() => setIsHovered(false)} // 마우스 나가면 hover 상태 false
                        onClick={handleBack}
                    >
                        뒤로가기
                    </button>
                ) : null}
            </div>
        </div>
    );
};

// 간단한 스타일 정의
const styles = {
    containerWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "80vh",
        perspective: '1500px', // 3D 효과를 위한 perspective 설정
    },
    container: {
        textAlign: 'center',
        marginTop: '50px',
        padding: '5rem',
        borderRadius: '10px',
        transform: 'rotateX(5deg) rotateY(5deg)', // 3D 회전 효과
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // 3D 효과 전환
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    message: {
        fontSize: '18px',
        color: '#555',
        marginBottom: '30px',
    },
    button: {
        boxSizing: "border-box",
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#fcc1cc',
        border: '1px solid #fcc1cc',
        borderRadius: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease-in-out',
    },
    buttonHover: {
        boxSizing: "border-box",
        backgroundColor: '#fff', // hover 시 배경 색상 변경
        border: "1px solid #fcc1cc", // hover 시 버튼 크기 증가
        color: "#fcc1cc",
    },
};

export default ProResultPage;
