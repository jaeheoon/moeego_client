import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Chart.js의 모듈 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ weekMemberData, weekProData, weekLeaveMemberData }) => {
    const getPastWeekDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 7; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    };

    const fillData = (dates, data) => {
        const dataMap = data.reduce((map, item) => {
            map[item.date] = item.count;
            return map;
        }, {});
        return dates.map(date => dataMap[date] || 0);
    };

    const pastWeekDates = getPastWeekDates();

    const chartData = {
        labels: pastWeekDates, // 날짜 (X축)
        datasets: [
            {
                label: '회원 가입 수',
                data: fillData(pastWeekDates, weekMemberData), // 가입된 사용자 수 (Y축)
                borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // 선 내부 색상
                fill: true, // 선 내부 채우기
                tension: 0.4, // 선의 굴곡 정도
            },
            {
                label: '고수 등록 수',
                data: fillData(pastWeekDates, weekProData), // 고수 신청 수 (Y축)

                borderColor: 'rgba(255, 99, 132, 1)', // 고수 신청 선 색상
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // 선 내부 색상
                fill: true, // 선 내부 채우기
                tension: 0.4, // 선의 굴곡 정도
            },
            {
                label: '탈퇴 회원 수',
                data: fillData(pastWeekDates, weekLeaveMemberData), // 탈퇴 회원 수 (Y축)
                borderColor: 'rgba(255, 206, 86, 1)', // 탈퇴 회원 선 색상
                backgroundColor: 'rgba(255, 206, 86, 0.2)', // 선 내부 색상
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
                                max: 1000, // Y축 최대값을 1000으로 설정
                                stepsize: 10,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default LineChart;
