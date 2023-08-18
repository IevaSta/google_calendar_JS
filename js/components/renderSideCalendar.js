export function renderSideCalendar(today, activeDay) {
  const sideCalendarListDOM = document.querySelector('.side-calendar__list');
  sideCalendarListDOM.innerHTML = '';

  const year = activeDay.getFullYear();
  const month = activeDay.getMonth();

  const firsWeekDayOfCrrMonth = new Date(year, month, 1).getDay(); //0-6 sunday-saturday

  //   https://stackoverflow.com/questions/222309/calculate-last-day-of-month
  function getCalendarDays() {
    const daysInPrevMonth = new Array(new Date(year, month - 1, 0).getDate()) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return { number: i + 1, type: 'prev_month' };
      })
      .slice(-firsWeekDayOfCrrMonth);

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
    sideCalendarDayDOM.innerText = day.number;

    const classList =
      day.type === 'crr_month'
        ? ['side-calendar__day']
        : ['side-calendar__day', 'not-curr-month'];

    sideCalendarDayDOM.classList.add(...classList);

    if (Number(sideCalendarDayDOM.innerText) === today.getDate()) {
      sideCalendarDayDOM.classList.add('crr-day');
    }

    sideCalendarListDOM.appendChild(sideCalendarDayDOM);
  });
}
