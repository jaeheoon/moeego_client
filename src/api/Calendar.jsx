import React, { useState } from "react";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
    const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜

    // 현재 월, 연도 가져오기
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // 현재 월의 첫 번째 날, 마지막 날 계산
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // 첫 번째 날의 요일, 마지막 날의 날짜 가져오기
    const firstDayWeekday = firstDayOfMonth.getDay(); // 일요일: 0, 월요일: 1 ...
    const daysInMonth = lastDayOfMonth.getDate(); // 월의 총 일수

    // 이전 월로 이동
    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    // 다음 월로 이동
    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // 날짜 선택
    const selectDate = (day) => {
        setSelectedDate(new Date(currentYear, currentMonth, day));
    };

    // 달력 날짜 배열 생성
    const calendarDays = [];
    for (let i = 0; i < firstDayWeekday; i++) {
        calendarDays.push(null); // 첫 주의 비어 있는 날짜
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day); // 해당 월의 날짜
    }

    return (
        <div style={styles.container}>
            {/* 헤더 */}
            <div style={styles.header}>
                <button onClick={prevMonth}>◀</button>
                <h2>{`${currentYear}년 ${currentMonth + 1}월`}</h2>
                <button onClick={nextMonth}>▶</button>
            </div>

            {/* 요일 */}
            <div style={styles.weekdays}>
                {["일", "월", "화", "수", "목", "금", "토"].map((weekday) => (
                    <div key={weekday} style={styles.weekday}>
                        {weekday}
                    </div>
                ))}
            </div>

            {/* 날짜 */}
            <div style={styles.days}>
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.day,
                            backgroundColor:
                                selectedDate &&
                                    day &&
                                    selectedDate.getDate() === day &&
                                    currentMonth === selectedDate.getMonth()
                                    ? "#007BFF" // 선택한 날짜의 배경색
                                    : "white",
                            color: day ? "black" : "#ccc",
                        }}
                        onClick={() => day && selectDate(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { width: "300px", margin: "20px auto", fontFamily: "Arial" },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },
    weekdays: { display: "flex", justifyContent: "space-around", fontWeight: "bold" },
    weekday: { flex: 1, textAlign: "center", padding: "5px 0" },
    days: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" },
    day: {
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        cursor: "pointer",
        userSelect: "none",
    },
};

export default Calendar;
