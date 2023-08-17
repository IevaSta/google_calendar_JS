export function renderSideCalendar(month, year) {
  const sideCalendarListDOM = document.querySelector('.side-calendar__list');
  sideCalendarListDOM.innerHTML = '';

  let day = 1;

  //   https://stackoverflow.com/questions/222309/calculate-last-day-of-month
  const daysInCrrMonth = new Date(year, month, 0).getDate(); //month ---> 0-11
  const firsWeekDayOfCrrMonth = new Date(year, month - 1, 1).getDay(); //0-6 sunday-saturday

  const daysInPrevMonth = new Date(year, month - 1, 0).getDate(); //month ---> 0-11
  //   [{ day: 1, type: 'current_month'}]
  function addLiDOM(innerText, classList) {
    const sideCalendarDayDOM = document.createElement('li');
    sideCalendarDayDOM.innerText = innerText;
    sideCalendarDayDOM.classList.add(...classList);
    sideCalendarListDOM.appendChild(sideCalendarDayDOM);
  }

  //render days of before month
  for (let x = firsWeekDayOfCrrMonth; x > 0; x--) {
    const innerText = daysInPrevMonth - x + 1;
    const classList = ['side-calendar__day', 'not-curr-month'];

    addLiDOM(innerText, classList);
  }

  //render days of crr month
  while (day <= daysInCrrMonth) {
    const innerText = day++;
    const classList = ['side-calendar__day'];

    addLiDOM(innerText, classList);
  }

  //render days of next month
  const daysInNextMonth = 42 - firsWeekDayOfCrrMonth - daysInCrrMonth;

  for (let i = 1; i <= daysInNextMonth; i++) {
    const innerText = i;
    const classList = ['side-calendar__day', 'not-curr-month'];

    addLiDOM(innerText, classList);
  }
}
