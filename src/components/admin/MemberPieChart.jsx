import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../../css/admin/DashBoard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const MemberPieChart = () => {
    const memberData = {
        labels: ['고수 회원', '일반 회원', '탈퇴 회원'],
        datasets: [
            {
                label: '회원 분포',
                data: [5, 10, 3],
                backgroundColor: ['#4CAF50', '#2196F3', '#f44336'],
                borderColor: ['#4CAF50', '#2196F3', '#f44336'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, // 비율 유지 해제
        responsive: true, // 반응형 활성화
    };
    
    return (
        <div className="adminDashBoard-chart">
            <p>회원 분포</p>
            <div className="chart-container" > {/* 차트 컨테이너 크기 제한 */}
                <Pie data={memberData} options={options} />
            </div>
        </div>
    );
};

export default MemberPieChart;
