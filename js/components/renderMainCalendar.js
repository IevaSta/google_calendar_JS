import { renderSideTitle } from './renderSideTitle.js';

export function renderMainCalendar(today, activeDay) {
  const headertitleListDOM = document.querySelector('.render-title__header ');
  renderSideTitle(headertitleListDOM, activeDay);

  const weekDayListDOM = document
    .querySelectorAll('.week-day')
    .forEach((weekDay) => (weekDay.innerHTML = ''));

  const formatOptions = {
    weekday: 'short'
  };

  const test = new Intl.DateTimeFormat('en-US', formatOptions)
    .format(activeDay)
    .toUpperCase();
}
