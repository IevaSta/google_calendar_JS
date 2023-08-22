import { renderSideTitle } from './renderSideTitle.js';

export function renderSideCalendar(today, activeDay, clickedActiveDay) {
  const sideCalendarListDOM = document.querySelector('.side-calendar__list');
  const sideTitleDOM = document.querySelector('.side-calendar__title');

  renderSideTitle(sideTitleDOM, activeDay);

  sideCalendarListDOM.innerHTML = '';

  const year = activeDay.getFullYear();
  const month = activeDay.getMonth();

  const firsWeekDayOfCrrMonth = new Date(year, month, 1).getDay(); //0-6 sunday-saturday

  //   https://stackoverflow.com/questions/222309/calculate-last-day-of-month
  function getCalendarDays() {
    const lastDayOfPrevMonth = new Date(year, month - 1, 0).getDate();
    const daysInPrevMonth = new Array(lastDayOfPrevMonth) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return { number: i + 1, type: 'prev_month' };
      })
      .slice(lastDayOfPrevMonth - firsWeekDayOfCrrMonth);

    const daysInCrrMonth = new Array(new Date(year, month, 0).getDate()) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return { number: i + 1, type: 'crr_month' };
      });

    const daysInNextMonth = new Array(new Date(year, month + 1, 0).getDate()) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return { number: i + 1, type: 'next_month' };
      })
      .slice(0, 42 - daysInPrevMonth.length - daysInCrrMonth.length);

    return [...daysInPrevMonth, ...daysInCrrMonth, ...daysInNextMonth];
  }

  getCalendarDays(month, year).forEach((day) => {
    const sideCalendarDayDOM = document.createElement('li');

    if (day.type === 'crr_month') {
      const newActiveDayDate = day.number;
      sideCalendarDayDOM.addEventListener('click', () =>
        clickedActiveDay(newActiveDayDate)
      );
    }

    sideCalendarDayDOM.innerText = day.number;

    const classList =
      day.type === 'crr_month'
        ? ['side-calendar__day']
        : ['side-calendar__day', 'not-curr-month'];

    sideCalendarDayDOM.classList.add(...classList);

    if (day.number === activeDay.getDate() && day.type === 'crr_month') {
      sideCalendarDayDOM.classList.add('active-day');
    }

    if (
      day.number === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      sideCalendarDayDOM.classList.remove('active-day');
      sideCalendarDayDOM.classList.add('crr-day');
    }

    sideCalendarListDOM.appendChild(sideCalendarDayDOM);
  });
}
