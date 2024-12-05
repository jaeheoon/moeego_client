import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../../css/admin/DashBoard.css';
import { AdminContext } from '../../context/admin/AdminContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const MemberPieChart = () => {
    const { allmemberData, loading, error } = useContext(AdminContext);

    // 로딩 중일 때 처리
    if (loading) {
        return <div>데이터를 불러오는 중...</div>;
    }

    // 에러가 있을 경우 처리
    if (error) {
        return <div>데이터를 불러오는 중 오류 발생: {error}</div>;
    }

    // 파이 차트 데이터
    const chartData = allmemberData && allmemberData.labels?.length && allmemberData.data?.length ? {
        labels: allmemberData.labels, // 예: ['고수 회원', '일반 회원', '탈퇴 회원']
        datasets: [
            {
                label: '회원 분포',
                data: allmemberData.data, // 예: [10, 20, 5]
                backgroundColor: ['#4CAF50', '#2196F3', '#f44336'],
                borderColor: ['#4CAF50', '#2196F3', '#f44336'],
                borderWidth: 1,
            },
        ],
    } : null;

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="adminDashBoard-chart">
            <p>회원 분포</p>
            <div className="chart-container">
                {chartData ? (
                    <Pie data={chartData} options={options} />
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MemberPieChart;
