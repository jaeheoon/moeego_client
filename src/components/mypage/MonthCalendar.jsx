import React, { useContext, useEffect, useState } from 'react';
import apiAxios from "../../api/apiAxios";
import dayjs from 'dayjs';
import { AuthContext } from '../../context/member/AuthContext';
import '../../css/mypage/MonthCalendar.css';
import { useNavigate } from 'react-router-dom';

const MonthCalendar = () => {
  const today = new Date();
  const { isLoggedIn } = useContext(AuthContext);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());  // 초기값을 오늘 날짜로 설정
  const [scheduleStatus, setScheduleStatus] = useState({ received: [], my: [] });
  const [list, setList] = useState({}); // 날짜별 일정 저장
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setList({});
      setScheduleStatus({ received: [], my: [] });
    }
  }, [isLoggedIn]);  // 로그인 상태가 변경될 때마다 실행


  useEffect(() => {
    const datelist = {
      month: currentMonth + 1,
      year: currentYear,
    };

    apiAxios.get('/api/reservation/mypage', { params: datelist }) // GET 요청에서는 params를 사용
      .then((response) => {
        if (response.data.success) {
          const receivedReservations = response.data.data.receivedReservations || [];  // 기본값 빈 배열 처리
          const myReservations = response.data.data.myReservations;

          // 날짜별로 일정 데이터 매핑
          const scheduleMap = {};

          // receivedReservations가 있을 경우에만 처리
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

          // myReservations는 항상 존재하므로 무조건 처리
          myReservations.forEach((reservation) => {
            const { startDate, startTimes, proName, proItemName, reservationNo, proItemNo, proNo } = reservation;

            if (!scheduleMap[startDate]) {
              scheduleMap[startDate] = { received: [], my: [] };
            }

            // 예약 추가 (내가 한 예약)
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

          setList(scheduleMap); // 상태로 설정

          // 초기 선택 날짜 확인 및 일정 가져오기
          checkSchedule(selectedDate); // 추가된 코드
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('일정을 불러오는 중 오류가 발생했습니다.', error);
      });
  }, [currentMonth, currentYear]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  useEffect(() => {
    if (selectedDate) {
      checkSchedule(selectedDate);
    }
  }, [selectedDate]);  // 단순히 선택된 날짜만 감지

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

    apiAxios
      .delete('/api/reservation', {
        params: { reservationNo },
      })
      .then((response) => {
        if (response.data.success) {
          alert('예약이 취소되었습니다.');

          // 상태 업데이트: 예약 목록에서 삭제
          const updatedMySchedules = scheduleStatus.my.filter(
            (schedule) => schedule.reservationNo !== reservationNo
          );
          setScheduleStatus((prevStatus) => ({
            ...prevStatus,
            my: updatedMySchedules,
          }));

          // list 업데이트
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

    // 빈 칸 렌더링
    for (let i = 0; i < firstDay; i++) {
      row.push(<td className="empty-day" key={`empty-${i}`} />);
    }

    // 날짜 렌더링
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
                    <li className='reservationLi' key={index}>[고객] {schedule}</li>
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
                      [예약] {schedule.proName}, {schedule.proItemName} ({schedule.time})

                      {/* 삭제 버튼 표시 조건 */}
                      {isCancelable(schedule.time) && (
                        <button className='cancel-btn' onClick={() => handleDeleteReservation(schedule)}>
                          취소
                        </button>
                      )}

                      {/* 리뷰 버튼 표시 조건 */}
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
