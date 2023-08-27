export function renderEvent(event) {
  //take weekday from date input
  const inputDate = new Date(event.date);
  const inputDateWeekDay = inputDate.getDay();

  //converting time to pixels
  const eventTop = timeConverterToPixels(event.start).toString();
  const eventLength = (
    timeConverterToPixels(event.end) - timeConverterToPixels(event.start)
  ).toString();

  const columnList = document.querySelectorAll('.lg-calendar__cell-list');

  //creating eventDom, adding style and content
  const eventDOM = createDOM('div', 'event');
  eventDOM.style.marginTop = `${eventTop}px`;
  eventDOM.style.height = `${eventLength}px`;

  const titleDOM = createDOM('span', 'event-title', event.title);
  const timeStartDOM = createDOM('span', 'event-time', event.start);
  const timeEndDOM = createDOM('span', 'event-time', event.end);

  eventDOM.appendChild(titleDOM);
  eventDOM.appendChild(timeStartDOM);
  eventDOM.appendChild(timeEndDOM);

  columnList.forEach((_, i) => {
    if (i === inputDateWeekDay) {
      columnList[i].prepend(eventDOM);
    }
  });
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
