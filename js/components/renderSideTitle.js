export function doTitleDate(title, activeDayData) {
  renderTitle(activeDayData, title);
}

function renderTitle(date, title) {
  const formattedDateYear = date.toLocaleString('en-US', {
    year: 'numeric'
  });
  const formattedDateMonth = date.toLocaleString('en-US', { month: 'long' });

  title.innerHTML = `${formattedDateMonth} ${formattedDateYear}`;
}
