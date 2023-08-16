export function renderSideCalendar(month, year) {
  const sideCalendarListDOM = document.querySelector('.side-calendar__list');
  sideCalendarListDOM.innerHTML = '';

  //month ---> 0-11
  //   https://stackoverflow.com/questions/222309/calculate-last-day-of-month
  const daysInMonth = new Date(year, month, 0).getDate();

  let day = 1;

  //0-6 sunday-saturday
  const firsWeekDayOfCrrMonth = new Date(year, month - 1, 1).getDay();
  console.log({ firsWeekDayOfCrrMonth });

  const today = new Date();
  const crrMonth = new Date(year, month - 1);

  while (day <= daysInMonth) {
    for (let weekday = 0; weekday < 7; weekday++) {
      const crrWeekDay = new Date(year, month - 1, day).getDay();

      if (day > daysInMonth) {
        //   next month
        const sideCalendarDayDOM = document.createElement('li');
        sideCalendarDayDOM.innerText = day - daysInMonth;
        sideCalendarDayDOM.classList.add('not-curr-month');
        sideCalendarListDOM.appendChild(sideCalendarDayDOM);
        day++;
      }

      if (day <= daysInMonth) {
        const sideCalendarDayDOM = document.createElement('li');

        if (day === 1 && crrWeekDay !== weekday) {
          //before month    REIKIA VAIDO
          const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

          console.log({ weekday, day });

          sideCalendarDayDOM.innerText =
            daysInPrevMonth - (firsWeekDayOfCrrMonth - weekday) + 1;
          sideCalendarDayDOM.classList.add('not-curr-month');
          sideCalendarListDOM.appendChild(sideCalendarDayDOM);
          continue;
        }

        sideCalendarDayDOM.innerText = day++;
        sideCalendarDayDOM.classList.add('side-calendar__day');
        sideCalendarListDOM.appendChild(sideCalendarDayDOM);
      }
    }
  }
}
