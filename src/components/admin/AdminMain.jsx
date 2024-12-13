import React from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import MemberList from './membership/MemberList';
import ProApproval from './ProApproval';
import ProList from './membership/ProList';
import LeaveMemberList from './membership/LeaveMemberList';
import EventList from './EventList';
import DashBoard from './DashBoard';

const AdminMain = () => {
    // 현재 URL 경로 가져오기
    const location = useLocation();

    // 경로별 컴포넌트 매핑
    const componentsMap = {
      '/admin/dashboard' : <DashBoard/>,
      '/admin/memberlist': <MemberList />,
      '/admin/proapproval': <ProApproval />,
      '/admin/prolist': <ProList />,
      '/admin/leavememberlist': <LeaveMemberList/>,
      '/admin/eventlist': <EventList/>,
    };

    // 현재 경로에 맞는 컴포넌트 선택
    const currentComponent = componentsMap[location.pathname] || (
      <div>페이지를 찾을 수 없습니다.</div>
    );

    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: '#27272a',
            color: 'white',
            flexShrink: 0,
          }}
        >
          <SideBar />
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            padding: '20px',
          }}
        >
          {currentComponent}
        </div>
      </div>
    );
};

export default AdminMain;