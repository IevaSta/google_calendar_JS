import { renderSideCalendar } from './renderSideCalendar.js';

export function doTitleDate(title) {
  const date = new Date();
  renderTitle(date, title);

  const forwardBtn = document.querySelector('.forward');
  const backwardBtn = document.querySelector('.backward');

  function nextMonth() {
    date.setMonth(date.getMonth() + 1);
    renderTitle(date, title);
  }

  function backMonth() {
    date.setMonth(date.getMonth() - 1);
    renderTitle(date, title);
  }

  forwardBtn.addEventListener('click', nextMonth);
  backwardBtn.addEventListener('click', backMonth);
}

function renderTitle(date, title) {
  const formattedDateYear = date.toLocaleString('en-US', { year: 'numeric' });
  const formattedDateMonth = date.toLocaleString('en-US', { month: 'long' });
  const formattedDateMonthNum = date.toLocaleString('en-US', {
    month: 'numeric'
  });

  title.innerHTML = `${formattedDateMonth} ${formattedDateYear}`;
  renderSideCalendar(formattedDateMonthNum, formattedDateYear);
}
