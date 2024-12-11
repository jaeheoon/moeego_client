import React, { createContext, useState, useEffect } from 'react';
import apiAxios from '../../api/apiAxios';

// AdminContext 생성
const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    // 상태 변수 정의 (차트)
    const [events, setEvents] = useState([]);  //이벤트 게시판
    const [notices, setNotices] = useState([]); //공지사항 게시판
    const [weekData, setWeekData] = useState([]); // 이건 아직 ㅋㅋ
    const [expertData, setExpertData] = useState([]); // 이건 아직 ㅋㅋ
    const [allmemberData, setAllmemberData] = useState(null); // 회원 데이터 도 아직 ㅋㅋ

    const [approvedmember, setapprovedmember] = useState([]); // 승인 대기 중인 회원 데이터
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 상태에 따라 다른 배지를 적용하기 위한 함수
    const getStatusBadgeClass = (memberStatus) => {
        if (memberStatus === 'ROLE_PEND_PRO') {
            return 'pro-status-badge-revoked'; // 미승인 배지
        }
        return 'pro-status-badge-approved'; // 승인된 경우 배지
    };

    // 데이터를 API에서 가져오는 함수
    const fetchApprovalData = async () => {
        try {
            const response = await apiAxios.get('/api/admin/pro/approval');
            setapprovedmember(response.data); // API에서 가져온 데이터를 상태에 저장
        } catch (err) {
            console.error('API 호출 오류:', err);  // 에러를 로그로 확인
            setError(err.message); // 에러 발생 시 에러 메시지 저장
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    // 승인 처리 함수
    const handleApprove = async (memberNo, name) => {
        const isApproved = window.confirm(`${name}님을 승인하시겠습니까?`);
        if (isApproved) {
            try {
                const response = await apiAxios.post(`/api/admin/pro/approve/${memberNo}`);
                fetchApprovalData(); // 승인 후 데이터 새로 고침
                alert(`${name}님이 고수 등록 되었습니다.`); // 승인 완료 후 알림
            } catch (err) {
                console.error('승인 처리 중 오류 발생:', err);  // 오류 로깅
                setError(err.message);
            }
        }
    };

    // 취소 처리 함수
    const handleRevoke = async (memberNo, name) => {
        const isApproved = window.confirm(`${name}님을 승인 취소 하시겠습니까?`);
        if (isApproved) {
            try {
                const response = await apiAxios.post(`/api/admin/pro/cancel/${memberNo}`);
                fetchApprovalData(); // 승인 후 데이터 새로 고침
                alert(`${name}님이 고수 승인 취소 되었습니다.`); // 승인 완료 후 알림
            } catch (err) {
                console.error('승인 처리 중 오류 발생:', err);  // 오류 로깅
                setError(err.message);
            }
        }
    };


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // 여러 데이터 동시 요청
    //             const [eventRes, noticeRes, weekDataRes, expertDataRes, memberDataRes, approvememberRes] = await Promise.all([
    //                 apiAxios.get('/api/article/events'),
    //                 apiAxios.get('/api/article/notices'),
    //                 apiAxios.get('/api/member/weekData'),
    //                 apiAxios.get('/api/member/expertData'),
    //                 apiAxios.get('/api/member/allmemberData'), // 회원 분포 데이터 요청

    //             ]);

    //             setEvents(eventRes.data);
    //             setNotices(noticeRes.data);
    //             setWeekData(weekDataRes.data);
    //             setExpertData(expertDataRes.data);
    //             setAllmemberData(memberDataRes.data); // 회원 데이터 저장

    //             setapprovedmember(approvememberRes.data);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false); // 로딩 상태 업데이트
    //         }
    //     };

    //     fetchData();
    // }, []);


    return (
        <AdminContext.Provider
            value={{
                events,
                notices,
                weekData,
                expertData,
                allmemberData, // 회원 데이터 추가
                approvedmember,
                loading,
                error,
                getStatusBadgeClass,
                fetchApprovalData,
                handleApprove,
                handleRevoke
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export { AdminProvider, AdminContext };
