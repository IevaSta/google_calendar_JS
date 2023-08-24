export function renderEvent() {
  const title = document.querySelector('.event__form-header').value;
  const timeStart = document.querySelector('.event-time__start').value;
  const timeEnd = document.querySelector('.event-time__end').value;

  //take weekday from date input
  const timeDate = document.querySelector('.event-date').value;
  const inputDate = new Date(timeDate);
  const inputDateWeekDay = inputDate.getDay();

  //converting time to pixels
  const eventTop = timeConverterToPixels(timeStart).toString();
  const eventLength = (
    timeConverterToPixels(timeEnd) - timeConverterToPixels(timeStart)
  ).toString();

  const columnList = document.querySelectorAll('.lg-calendar__cell-list');

  //creating eventDom, adding style and content
  if ((title, timeDate, timeStart, timeEnd)) {
    const eventDOM = createDOM('div', 'event');
    eventDOM.style.marginTop = `${eventTop}px`;
    eventDOM.style.height = `${eventLength}px`;

    const titleDOM = createDOM('span', 'event-title', title);
    const timeStartDOM = createDOM('span', 'event-time', timeStart);
    const timeEndDOM = createDOM('span', 'event-time', timeEnd);

    eventDOM.appendChild(titleDOM);
    eventDOM.appendChild(timeStartDOM);
    eventDOM.appendChild(timeEndDOM);

    columnList.forEach((_, i) => {
      if (i === inputDateWeekDay) {
        columnList[i].prepend(eventDOM);
      }
    });
  }
}

function createDOM(element, style, content) {
  const dom = document.createElement(element);
  dom.classList.add(style);

  if (content) dom.innerText = content;

  return dom;
}

function timeConverterToPixels(time) {
  const cellHeightInPixels = 48;
  const minPerHour = 60;
  const minHeightInPixels = cellHeightInPixels / minPerHour;

  let [hours, mins] = time.split(':');

  if (hours) hours = hours * cellHeightInPixels;
  if (mins) mins = mins * minHeightInPixels;

  return hours + mins;
}
