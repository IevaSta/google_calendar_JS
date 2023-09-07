import { renderTitle } from './renderSideTitle.js';
type Config = {
  today: Date;
  activeDay: Date;
  clickedActiveDay: (renderingDay: Date) => void;
};
export function renderSideCalendar({
  today,
  activeDay,
  clickedActiveDay
}: Config) {
  const sideCalendarListDOM = document.querySelector(
    '.side-calendar__list'
  ) as HTMLElement;
  const sideTitleDOM = document.querySelector(
    '.side-calendar__title'
  ) as HTMLElement;

  renderTitle(sideTitleDOM, activeDay);

  sideCalendarListDOM.innerHTML = '';

  const year = activeDay.getFullYear();
  const month = activeDay.getMonth();

  const firsWeekDayOfCrrMonth = new Date(year, month, 1).getDay(); //0-6 sunday-saturday

  //   https://stackoverflow.com/questions/222309/calculate-last-day-of-month
  function getCalendarDays() {
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();

    const daysInPrevMonth = new Array(lastDayOfPrevMonth) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return {
          number: i + 1,
          type: 'prev_month',
          date: new Date(year, month - 1, i + 1)
        };
      })
      .slice(lastDayOfPrevMonth - firsWeekDayOfCrrMonth);

    const daysInCrrMonth = new Array(new Date(year, month + 1, 0).getDate()) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return {
          number: i + 1,
          type: 'crr_month',
          date: new Date(year, month, i + 1)
        };
      });

    const daysInNextMonth = new Array(new Date(year, month + 2, 0).getDate()) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return {
          number: i + 1,
          type: 'next_month',
          date: new Date(year, month + 1, i + 1)
        };
      })
      .slice(0, 42 - daysInPrevMonth.length - daysInCrrMonth.length);

    return [...daysInPrevMonth, ...daysInCrrMonth, ...daysInNextMonth];
  }

  // get MONTH DAYS
  getCalendarDays().forEach((day) => {
    const sideCalendarDayDOM = document.createElement('li') as HTMLElement;
    sideCalendarDayDOM.innerText = day.number.toString();

    sideCalendarDayDOM.addEventListener('click', () =>
      clickedActiveDay(day.date)
    );

    const classList =
      day.type === 'crr_month'
        ? ['side-calendar__day', 'crr_month']
        : ['side-calendar__day', 'not-curr-month'];

    sideCalendarDayDOM.classList.add(...classList);

    if (day.number === activeDay.getDate() && day.type === 'crr_month') {
      sideCalendarDayDOM.classList.add('active-day');
    }

    if (day.date.toDateString() === today.toDateString()) {
      sideCalendarDayDOM.classList.remove('active-day');
      sideCalendarDayDOM.classList.add('crr-day');
    }

    sideCalendarListDOM.appendChild(sideCalendarDayDOM);
  });
}
