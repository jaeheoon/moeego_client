import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../../css/admin/DashBoard.css';
import { AdminContext } from '../../context/admin/AdminContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const MemberPieChart = ({ memberData, proData, leaveData }) => {
    // 각 데이터 배열의 길이를 기반으로 파이 차트 데이터 생성
    const labels = ['일반 회원', '고수 회원', '탈퇴 회원'];
    const data = [
        memberData, // 일반 회원 (숫자 값)
        proData,    // 고수 회원 (숫자 값)
        leaveData,  // 탈퇴 회원 (숫자 값)
    ];

    // 파이 차트 데이터 구성
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '회원 분포',
                data: data,
                backgroundColor: ['#4CAF50', '#2196F3', '#f44336'],
                borderColor: ['#4CAF50', '#2196F3', '#f44336'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="adminDashBoard-chart">
            <p>회원 분포</p>
            <div className="chart-container">
                {data && data.length > 0 ? (
                    <Pie data={chartData} options={options} />
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MemberPieChart;
