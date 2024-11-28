import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js의 모듈 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, expertData }) => {
    const chartData = {
        labels: data.map(item => item.date), // 날짜 (X축)
        datasets: [
            {
                label: '회원 가입 수',
                data: data.map(item => item.count), // 가입된 사용자 수 (Y축)
                borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // 선 내부 색상
                fill: true, // 선 내부 채우기
                tension: 0.4, // 선의 굴곡 정도
            },
            {
                label: '고수 등록 수',
                data: expertData.map(item => item.count), // 고수 신청 수 (Y축)
                borderColor: 'rgba(255, 99, 132, 1)', // 고수 신청 선 색상
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // 선 내부 색상
                fill: true, // 선 내부 채우기
                tension: 0.4, // 선의 굴곡 정도
            },
        ],
    };

    return (
        <div className="adminDashBoard-chart">
            <p>최근 일주일간 회원 가입 및 고수 등록 현황</p>
            <div className="chart-container"> {/* 차트 컨테이너 크기 제한 */}
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true, // 범례 표시
                                position: 'top',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true, // Y축 시작점을 0으로 설정
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default LineChart;
