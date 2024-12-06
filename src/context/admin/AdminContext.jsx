import React, { createContext, useState, useEffect } from 'react';
import apiAxios from '../../api/apiAxios';

// AdminContext 생성
const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    // 상태 변수 정의
    const [events, setEvents] = useState([]);
    const [notices, setNotices] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [expertData, setExpertData] = useState([]);
    const [allmemberData, setAllmemberData] = useState(null); // 회원 데이터 추가
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 여러 데이터 동시 요청
                const [eventRes, noticeRes, weekDataRes, expertDataRes, memberDataRes] = await Promise.all([
                    apiAxios.get('/api/article/events'),
                    apiAxios.get('/api/article/notices'),
                    apiAxios.get('/api/member/weekData'),
                    apiAxios.get('/api/member/expertData'),
                    apiAxios.get('/api/member/allmemberData'), // 회원 분포 데이터 요청
                ]);

                setEvents(eventRes.data);
                setNotices(noticeRes.data);
                setWeekData(weekDataRes.data);
                setExpertData(expertDataRes.data);
                setAllmemberData(memberDataRes.data); // 회원 데이터 저장
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // 로딩 상태 업데이트
            }
        };

        fetchData();
    }, []);


    return (
        <AdminContext.Provider
            value={{
                events,
                notices,
                weekData,
                expertData,
                allmemberData, // 회원 데이터 추가
                loading,
                error,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export { AdminProvider, AdminContext };
