import React, { useState } from 'react';
import '../../css/mypage/MonthCalendar.css';

const MonthCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [scheduleStatus, setScheduleStatus] = useState(''); 

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }

    resetSelectedDate();
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }

    resetSelectedDate();
  };

  const handleMonthChange = (e) => {
    const newMonth = Number(e.target.value);
    setCurrentMonth(newMonth);

    resetSelectedDate();
  };

  const handleYearChange = (e) => {
    const newYear = Number(e.target.value);
    setCurrentYear(newYear);

    resetSelectedDate();
  };

  const resetSelectedDate = () => {
    setSelectedDate(null);
    setScheduleStatus('');
  };


  const handleDayClick = (day) => {
    setSelectedDate(day); 
    checkSchedule(day); 
  };

  const checkSchedule = (day) => {
    // 예시 일정이 있는 날짜 설정
    const schedules = {
      '2024-12-23': '김태훈, 코딩조아, 18:00',
      '2025-01-06': '정세묵, 발표조아, 15:00',
    };

    const selectedDateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (schedules[selectedDateString]) {
      setScheduleStatus(schedules[selectedDateString]);
    } else {
      setScheduleStatus('일정 없음');
    }
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const days = [];
    let dayCount = 1;
    let row = [];

    // 빈칸을 먼저 렌더링 (이전 달의 마지막 날짜)
    for (let i = 0; i < firstDay; i++) {
      row.push(<td className="empty-day" key={`empty-${i}`} />);
    }

    // 현재 달의 날짜 렌더링
    for (let i = firstDay; i < 7; i++) {
      const day = dayCount;
      row.push(
        <td
          className={`day ${selectedDate === day ? 'selected' : ''}`}
          key={day}
          onClick={() => handleDayClick(day)}
        >
          {dayCount}
        </td>
      );
      dayCount++;
    }

    days.push(<tr key={0}>{row}</tr>);

    // 나머지 날짜들 렌더링 (한 주씩 묶어서 tr로)
    while (dayCount <= daysInMonth) {
      row = [];
      for (let i = 0; i < 7 && dayCount <= daysInMonth; i++) {
        const day = dayCount
        row.push(
          <td
            className={`day ${selectedDate === day ? 'selected' : ''}`}
            key={day}
            onClick={() => handleDayClick(day)}
          >
            {dayCount}
          </td>
        );
        dayCount++;
      }
      days.push(<tr key={dayCount}>{row}</tr>);
    }

    return days;
  };

  return (
    <div className="MonthCalendar-wrap">
      <div className="MonthCalendar-container">
        <div className="MonthCalendar-controller">
          <button className="prev-btn" onClick={handlePrevMonth}>
            &#60;
          </button>
          <div className="month-year">
              {showYearSelector ? (
                <select
                  className="year-dropdown"
                  value={currentYear}
                  onChange={handleYearChange} 
                >
                  {Array.from({ length: 11 }, (_, i) => currentYear - 5 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}년
                    </option>
                  ))}
                </select>
              ) : (
                <span onClick={() => setShowYearSelector(!showYearSelector)}>
                {`${currentYear}년`}
                </span>
              )}
            {' '}
              {showMonthSelector ? (
                <select
                  className="month-dropdown"
                  value={currentMonth}
                  onChange={handleMonthChange}
                >
                  {['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'].map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              ) : (
                <span onClick={() => setShowMonthSelector(!showMonthSelector)}>
                {`${currentMonth + 1}월`}
                </span>
              )}
          </div>
          <button className="next-btn" onClick={handleNextMonth}>
            &#62;
          </button>
        </div>

        <div className="MonthCalendar-body">
          <table className="calendar-table">
            <thead>
              <tr>
                <th className="weekday">일</th>
                <th className="weekday">월</th>
                <th className="weekday">화</th>
                <th className="weekday">수</th>
                <th className="weekday">목</th>
                <th className="weekday">금</th>
                <th className="weekday">토</th>
              </tr>
            </thead>
            <tbody>{renderDays()}</tbody>
          </table>
        </div>

        {selectedDate && (
          <div className="selected-date-info">
            <p>
              <strong  className="schedule-date-title">
                {`${currentMonth + 1}월 ${selectedDate}일의 일정`}
              </strong>
            </p>
            <p className={scheduleStatus === '일정 있음' ? 'schedule-available' : 'schedule-unavailable'}>
              {scheduleStatus}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
