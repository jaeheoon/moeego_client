import React, { useState } from 'react';
import '../../css/mypage/MonthCalendar.css';

const MonthCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);

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
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
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
      row.push(
        <td className="day" key={dayCount}>
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
        row.push(
          <td className="day" key={dayCount}>
            {dayCount}
          </td>
        );
        dayCount++;
      }
      days.push(<tr key={dayCount}>{row}</tr>);
    }

    return days;
  };

  const handleYearChange = (event) => {
    setCurrentYear(Number(event.target.value));
    setShowYearSelector(false);
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(Number(event.target.value));
    setShowMonthSelector(false);
  };

  const renderYearSelector = () => {
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return (
      <select
        className="year-dropdown"
        value={currentYear}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}년
          </option>
        ))}
      </select>
    );
  };

  const renderMonthSelector = () => {
    const months = [
      '1월', '2월', '3월', '4월', '5월', '6월',
      '7월', '8월', '9월', '10월', '11월', '12월'
    ];
    return (
      <select
        className="month-dropdown"
        value={currentMonth}
        onChange={handleMonthChange}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="MonthCalendar-wrap">
      <div className="MonthCalendar-container">
        <div className="MonthCalendar-controller">
          <button className="prev-btn" onClick={handlePrevMonth}>
            &#60;
          </button>
          <div className="month-year">
            <span onClick={() => setShowYearSelector(!showYearSelector)}>
              {showYearSelector ? renderYearSelector() : `${currentYear}년`}
            </span>
            {' '}
            <span onClick={() => setShowMonthSelector(!showMonthSelector)}>
              {showMonthSelector ? renderMonthSelector() : `${currentMonth + 1}월`}
            </span>
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
      </div>
    </div>
  );
};

export default MonthCalendar;
