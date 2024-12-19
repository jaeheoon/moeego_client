import React, { useState, useEffect } from 'react';
import "../../css/Pro/WeekCalendar.css";

const WeekCalendar = ({ selectedDate, setSelectedDate }) => {
  const [date, setDate] = useState(new Date()); // 현재 날짜
  const [days, setDays] = useState([]); // 7일 간의 날짜 배열

  const today = new Date();
  const threeWeeksLater = new Date(today.getTime() + 27 * 86400000);

  const getDayOfWeek = (date) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[date.getDay()];
  };

  // 오늘부터 시작해서 7일 간의 날짜 배열을 생성하는 함수
  const makeSevenDaysArr = (startDate) => {
    const daysArr = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i);

      if (newDate <= threeWeeksLater) {
        daysArr.push(newDate);
      }
    }
    return daysArr;
  };

  useEffect(() => {
    const newDate = new Date();
    const newDays = makeSevenDaysArr(newDate);
    setDate(newDate);
    setDays(newDays);
  }, []);

  const moveWeek = (direction) => {
    const newDate = new Date(date.valueOf() + direction * 86400000 * 7);
    const newDays = makeSevenDaysArr(newDate);

    if (newDays.length > 0) {
      setDate(newDate);
      setDays(newDays);
    }
  };

  // 날짜를 선택하는 함수
  const handleSelectDate = (selected) => {
    setSelectedDate(selected);
  };

  // 선택된 날짜 스타일 적용
  const isDateSelected = (date) => {
    return selectedDate && selectedDate.toLocaleDateString('ko-KR') === date.toLocaleDateString('ko-KR');
  };

  // 선택된 날짜 또는 기본 날짜를 기준으로 년월 표시
  const currentMonthYear = selectedDate
    ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월`
    : `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  return (
    <div className="calendar-wrap">
      <div className="calendar-header">
        <h3>{currentMonthYear}</h3>
      </div>

      <div className="week">
        <button
          onClick={() => moveWeek(-1)}
          disabled={date <= today}
        >
          &lt;
        </button>

        {days.map((date, index) => (
          <div
            key={index}
            className={`day ${isDateSelected(date) ? 'selected' : ''}`}
            onClick={() => handleSelectDate(date)}
            style={{
              cursor: 'pointer', // 모든 날짜 클릭 가능
              backgroundColor: isDateSelected(date) ? '#522823' : '',
              color: isDateSelected(date) ? '#fff' : ''
            }}
          >
            <div className="day-name">{getDayOfWeek(date)}</div>
            <span>{date.getDate()}</span>
          </div>
        ))}

        <button
          onClick={() => moveWeek(1)}
          disabled={date >= threeWeeksLater}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default WeekCalendar;
