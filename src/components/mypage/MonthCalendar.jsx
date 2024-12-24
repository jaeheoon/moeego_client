import React, { useContext, useEffect, useState } from 'react';
import apiAxios from "../../api/apiAxios";
import dayjs from 'dayjs';
import { AuthContext } from '../../context/member/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../css/mypage/MonthCalendar.css';

const MonthCalendar = () => {
  const today = new Date();
  const { isLoggedIn } = useContext(AuthContext);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [scheduleStatus, setScheduleStatus] = useState({ received: [], my: [] });
  const [list, setList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 첫 페이지 로딩 시, 오늘의 예약 정보를 자동으로 불러오기
  useEffect(() => {
    if (isLoggedIn) {
      const datelist = {
        month: currentMonth + 1,
        year: currentYear,
      };

      setIsLoading(true);
      apiAxios.get('/api/reservation/mypage', { params: datelist })
        .then((response) => {
          if (response.data.success) {
            const receivedReservations = response.data.data.receivedReservations || [];
            const myReservations = response.data.data.myReservations;

            const scheduleMap = {};

            receivedReservations.forEach((reservation) => {
              const { startDate, startTimes, memberName, proItemName } = reservation;
              if (!scheduleMap[startDate]) {
                scheduleMap[startDate] = { received: [], my: [] };
              }

              const scheduleDetails = startTimes.map((time) => {
                return `${memberName}, ${proItemName || '내용없음'}, ${time}`;
              });

              scheduleMap[startDate].received = [
                ...scheduleMap[startDate].received,
                ...scheduleDetails,
              ];
            });

            myReservations.forEach((reservation) => {
              const { startDate, startTimes, proName, proItemName, reservationNo, proItemNo, proNo } = reservation;
              if (!scheduleMap[startDate]) {
                scheduleMap[startDate] = { received: [], my: [] };
              }

              const scheduleDetails = startTimes.map((time) => {
                return {
                  proName,
                  proItemNo: proItemNo || "",
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

            setList(scheduleMap);

            // 데이터 로딩 완료 후 isLoading false로 설정
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('일정을 불러오는 중 오류가 발생했습니다.', error);
        });
    }
  }, [currentMonth, currentYear, isLoggedIn]);

  useEffect(() => {
    // 로딩이 완료된 후에만 오늘 일정 확인
    if (!isLoading) {
      checkSchedule(today.getDate());
    }
  }, [isLoading]); // isLoading이 false일 때만 실행

  // 선택된 날짜 변경 시 예약 정보 체크
  useEffect(() => {
    if (selectedDate) {
      checkSchedule(selectedDate);
    }
  }, [selectedDate]);

  const checkSchedule = (day) => {
    const selectedDateString =
      `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (list[selectedDateString]) {
      setScheduleStatus(list[selectedDateString]);
    } else {
      setScheduleStatus({ received: [], my: [] });
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const resetSelectedDate = () => {
    setSelectedDate(null);
    setScheduleStatus({ received: [], my: [] });
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

  const handleDeleteReservation = (reservationDetails) => {
    const { reservationNo } = reservationDetails;

    apiAxios
      .delete('/api/reservation', { params: { reservationNo } })
      .then((response) => {
        if (response.data.success) {
          alert('예약이 취소되었습니다.');

          const updatedMySchedules = scheduleStatus.my.filter(
            (schedule) => schedule.reservationNo !== reservationNo
          );
          setScheduleStatus((prevStatus) => ({
            ...prevStatus,
            my: updatedMySchedules,
          }));

          const selectedDateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
          if (list[selectedDateString]) {
            const updatedList = { ...list };
            updatedList[selectedDateString].my = updatedMySchedules;
            setList(updatedList);
          }
        } else {
          alert('예약 삭제에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('예약 삭제 중 오류 발생', error);
        alert('예약 삭제 중 오류가 발생했습니다.');
      });
  };

  const isPastReservation = (reservationTime) => {
    const reservationDateTime = dayjs(`${currentYear}-${currentMonth + 1}-${selectedDate} ${reservationTime}`);
    return reservationDateTime.isBefore(dayjs());
  };

  const isCancelable = (reservationTime) => {
    const reservationDateTime = dayjs(`${currentYear}-${currentMonth + 1}-${selectedDate} ${reservationTime}`);
    return reservationDateTime.isAfter(dayjs());
  };

  const renderDayCell = (day) => {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return (
      <td
        className={`day ${selectedDate === day ? 'selected' : ''} ${list[dateKey] ? 'has-schedule' : ''}`}
        key={day}
        onClick={() => handleDayClick(day)}
      >
        {day}
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
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const days = [];
    let dayCount = 1;
    let row = [];

    for (let i = 0; i < firstDay; i++) {
      row.push(<td className="empty-day" key={`empty-${i}`} />);
    }

    while (dayCount <= daysInMonth) {
      while (row.length < 7 && dayCount <= daysInMonth) {
        row.push(renderDayCell(dayCount));
        dayCount++;
      }

      days.push(<tr key={days.length}>{row}</tr>);
      row = [];
    }

    return days;
  };

  const handleWriteReview = (proItemNo) => {
    navigate(`/mypage/review/write?proItemNo=${proItemNo}`);
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
                    <li className='reservationLi' key={index}>{schedule}</li>
                  ))}
                </ul>
              </div>
            )}

            {scheduleStatus.my.length > 0 && (
              <div className="reservationTitle">
                <p><strong>나의 예약 :</strong></p>
                <ul className="reservationUl">
                  {scheduleStatus.my.map((schedule, index) => (
                    <li className="reservationLi" key={index}>
                      {schedule.proName}, {schedule.proItemName} ({schedule.time})

                      {isCancelable(schedule.time) && (
                        <button className='cancel-btn' onClick={() => handleDeleteReservation(schedule)}>
                          취소
                        </button>
                      )}

                      {isPastReservation(schedule.time) && (
                        <button className='review-btn' onClick={() => handleWriteReview(schedule.proItemNo)}>
                          리뷰
                        </button>
                      )}
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
