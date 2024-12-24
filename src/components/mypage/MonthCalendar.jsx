import React, { useEffect, useState } from 'react';
import apiAxios from "../../api/apiAxios";
import '../../css/mypage/MonthCalendar.css';

const MonthCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());  // 초기값을 오늘 날짜로 설정
  const [scheduleStatus, setScheduleStatus] = useState({ received: [], my: [] });
  const [list, setList] = useState({}); // 날짜별 일정 저장

  useEffect(() => {
    const memberNo = localStorage.getItem('userno');
    const datelist = {
      memberNo: memberNo,
      month: currentMonth + 1,
      year: currentYear,
    };

    apiAxios.get('/api/reservation/mypage', { params: datelist }) // GET 요청에서는 params를 사용
      .then((response) => {
        if (response.data.success) {
          const receivedReservations = response.data.data.receivedReservations;
          const myReservations = response.data.data.myReservations;

          console.log(receivedReservations);
          console.log(myReservations);

          // 날짜별로 일정 데이터 매핑
          const scheduleMap = {};
          receivedReservations.forEach((reservation) => {
            const { startDate, startTimes, memberName, proItemName } = reservation;

            if (!scheduleMap[startDate]) {
              scheduleMap[startDate] = { received: [], my: [] };
            }

            // 예약 추가 (받은 예약)
            const scheduleDetails = startTimes.map((time) => {
              return `${memberName}, ${proItemName || '내용없음'}, ${time}`;
            });

            scheduleMap[startDate].received = [
              ...scheduleMap[startDate].received,
              ...scheduleDetails,
            ];
          });

          myReservations.forEach((reservation) => {
            const { startDate, startTimes, proName, proItemName, reservationNo, proNo } = reservation;

            if (!scheduleMap[startDate]) {
              scheduleMap[startDate] = { received: [], my: [] };
            }

            // 예약 추가 (내가 한 예약)
            const scheduleDetails = startTimes.map((time) => {
              return {
                proName,
                proItemName: proItemName || '내용없음',
                time,
                reservationNo,
                proNo
              };
            });

            scheduleMap[startDate].my = [
              ...scheduleMap[startDate].my,
              ...scheduleDetails,
            ];
          });

          setList(scheduleMap); // 상태로 설정

          // 초기 선택 날짜 확인 및 일정 가져오기
          checkSchedule(selectedDate); // 추가된 코드
        }
      })
      .catch((error) => {
        console.error('일정을 불러오는 중 오류가 발생했습니다.', error);
      });
  }, [currentMonth, currentYear]);

  useEffect(() => {
    // `selectedDate`가 변경될 때마다 해당 날짜에 대한 일정을 확인
    if (selectedDate) {
      checkSchedule(selectedDate);
    }
  }, [selectedDate, currentMonth, currentYear, list]);  // `list`가 변경될 때마다 일정을 확인

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const resetSelectedDate = () => {
    setSelectedDate(null);
    setScheduleStatus({ received: [], my: [] }); // 일정 상태 초기화
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
      setScheduleStatus({ received: [], my: [] }); // 일정이 없을 경우 빈 배열로 설정
    }
  };

  // 예약 삭제 함수
  const handleDeleteReservation = (reservationDetails) => {
    const { reservationNo } = reservationDetails;

    apiAxios.delete('/api/reservation', {
      params: {
        reservationNo: reservationNo,
      }
    })  // 수정된 부분
      .then((response) => {
        if (response.data.success) {
          alert('예약이 취소되었습니다.');

          // 예약 삭제 후 상태에서 해당 예약을 제거
          const updatedSchedule = { ...scheduleStatus };
          updatedSchedule.my = updatedSchedule.my.filter((schedule) => schedule.reservationNo !== reservationNo);
          setScheduleStatus(updatedSchedule);  // 상태 갱신

          window.location.reload();
        } else {
          alert('예약 삭제에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('예약 삭제 중 오류 발생', error);
        alert('예약 삭제 중 오류가 발생했습니다.');
      });
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
          {list[dateKey] && (
            <div className="schedule-dots-container">
              {list[dateKey].received.length > 0 && (
                <span className="schedule-dot received-dot" />
              )}
              {list[dateKey].my.length > 0 && (
                <span className="schedule-dot my-dot" />
              )}
            </div>
          )}
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
            {list[dateKey] && (
              <div className="schedule-dots-container">
                {list[dateKey].received.length > 0 && (
                  <span className="schedule-dot received-dot" />
                )}
                {list[dateKey].my.length > 0 && (
                  <span className="schedule-dot my-dot" />
                )}
              </div>
            )}
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

            {scheduleStatus.received.length > 0 && (
              <div className='reservationTitle'>
                <p><strong>고객 목록 :</strong></p>
                <ul className='reservationUl'>
                  {scheduleStatus.received.map((schedule, index) => (
                    <li className='reservationLi' key={index}>[고객] {schedule}</li>
                  ))}
                </ul>
              </div>
            )}

            {scheduleStatus.my.length > 0 && (
              <div className='reservationTitle'>
                <p><strong>나의 예약 :</strong></p>
                <ul className='reservationUl'>
                  {scheduleStatus.my.map((schedule, index) => (
                    <li className='reservationLi' key={index}>
                      [예약] {schedule.proName}, {schedule.proItemName} ({schedule.time})
                      <button onClick={() => handleDeleteReservation(schedule)}>
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {scheduleStatus.received.length === 0 && scheduleStatus.my.length === 0 && (
              <p>해당 날짜에 예약된 일정이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
