import React, { useEffect, useState } from 'react';
import '../../css/mypage/MonthCalendar.css';
import apiAxios from "../../api/apiAxios";

const MonthCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleStatus, setScheduleStatus] = useState('');
  const [list, setList] = useState({}); // 날짜별 일정 저장

  useEffect(() => {
    const memberNo = localStorage.getItem('userno');
    const datelist = {
      memberNo: memberNo,
      month: currentMonth + 1,
      year: currentYear,
    };
    console.log('서버로 가져갈 내용:', datelist);

    apiAxios.get('/api/reservation/mypage', { params: datelist }) // GET 요청에서는 params를 사용
      .then((response) => {
        if (response.data.success) {
          const receivedReservations = response.data.data.receivedReservations;

          // 날짜별로 일정 데이터 매핑
          const scheduleMap = {};
          receivedReservations.forEach((reservation) => {
            const { startDate, startTimes, memberName, proItemName } = reservation;

            if (!scheduleMap[startDate]) {
              scheduleMap[startDate] = [];
            }

            // 일정 내용을 추가
            const scheduleDetails = startTimes.map((time) => {
              return `${memberName}, ${proItemName || '내용없음'}, ${time}`;
            });

            scheduleMap[startDate] = [...scheduleMap[startDate], ...scheduleDetails];
          });

          setList(scheduleMap); // 상태로 설정
          console.log('일정 데이터 매핑 완료:', scheduleMap);
        }
      })
      .catch((error) => {
        console.error('일정을 불러오는 중 오류가 발생했습니다.', error);
      });
  }, [currentMonth, currentYear]);

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

  const handleDayClick = (day) => {
    setSelectedDate(day);
    checkSchedule(day);
  };

  const checkSchedule = (day) => {
    const selectedDateString =
      `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (list[selectedDateString]) {
      setScheduleStatus(list[selectedDateString]); // 해당 날짜의 일정 설정
    } else {
      setScheduleStatus(['일정 없음']); // 일정이 없을 경우
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
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      row.push(
        <td
          className={`day ${selectedDate === day ? 'selected' : ''} ${list[dateKey] ? 'has-schedule' : ''}`}
          key={day}
          onClick={() => handleDayClick(day)}
        >
          {dayCount}
          {list[dateKey] && <span className="schedule-dot">●</span>}
        </td>
      );
      dayCount++;
    }

    days.push(<tr key={0}>{row}</tr>);

    // 나머지 날짜들 렌더링 (한 주씩 묶어서 tr로)
    while (dayCount <= daysInMonth) {
      row = [];
      for (let i = 0; i < 7 && dayCount <= daysInMonth; i++) {
        const day = dayCount;
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        row.push(
          <td
            className={`day ${selectedDate === day ? 'selected' : ''} ${list[dateKey] ? 'has-schedule' : ''}`}
            key={day}
            onClick={() => handleDayClick(day)}
          >
            {dayCount}
            {list[dateKey] && <span className="schedule-dot"></span>}
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
            <span>{`${currentYear}년 ${currentMonth + 1}월`}</span>
          </div>
          <button className="next-btn" onClick={handleNextMonth}>
            &#62;
          </button>
        </div>

        <div className="MonthCalendar-body">
          <table className="calendar-table">
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>{renderDays()}</tbody>
          </table>
        </div>

        {selectedDate && (
          <div className="selected-date-info">
            <p>{`${currentMonth + 1}월 ${selectedDate}일 일정`}</p>
            {scheduleStatus.map((schedule, index) => (
              <p key={index}>{schedule}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
