import { renderSideTitle } from './renderSideTitle.js';

export function renderMainCalendar(today, activeDay, clickedActiveDay) {
  const headertitleListDOM = document.querySelector('.render-title__header ');
  renderSideTitle(headertitleListDOM, activeDay);

  const year = activeDay.getFullYear();
  const month = activeDay.getMonth();
  const day = activeDay.getDate();

  const todayWeekDay = new Date(year, month, day).getDay(); //0-6 sunday-saturday

  const currentWeekStart = new Date(activeDay);
  currentWeekStart.setDate(day - todayWeekDay);

  document.querySelectorAll('.month-day').forEach((dayDOM, i) => {
    const renderingDay = new Date(currentWeekStart);
    renderingDay.setDate(renderingDay.getDate() + i);

    dayDOM.innerText = renderingDay.getDate();

    dayDOM.addEventListener('click', () => clickedActiveDay(renderingDay));

    dayDOM.classList.remove('crr-day');
    dayDOM.classList.remove('active-day');

    if (renderingDay.getDate() === today.getDate()) {
      dayDOM.classList.add('crr-day');
    }

    if (
      renderingDay.getDate() === activeDay.getDate() &&
      activeDay.getDate() !== today.getDate()
    ) {
      dayDOM.classList.add('active-day');
    }
  });
}
