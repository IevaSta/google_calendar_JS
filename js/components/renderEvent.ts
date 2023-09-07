import { Event } from '../helpers/createCalendarAPI.js';

export function renderEvent(
  event: Event,
  activeDay: Date,
  id: number,
  onEventDelete: (id: number) => void
) {
  //take weekday from date input
  const inputDate = new Date(event.date);

  const activeDayDate = new Date(activeDay);
  const sundayDate = new Date(
    activeDayDate.setDate(activeDay.getDate() - activeDay.getDay())
  );

  //converting time to pixels
  const eventTop = timeConverterToPixels(event.start).toString();
  const eventLength = (
    timeConverterToPixels(event.end) - timeConverterToPixels(event.start)
  ).toString();

  const columnList = document.querySelectorAll('.lg-calendar__cell-list');

  //creating eventDom, adding style and content
  const eventDOM = createDOM('div', 'event', '');
  eventDOM.style.marginTop = `${eventTop}px`;
  eventDOM.style.height = `${eventLength}px`;

  const titleDOM = createDOM('span', 'event-title', event.title);
  const timeStartDOM = createDOM('span', 'event-time', event.start);
  const timeEndDOM = createDOM('span', 'event-time', event.end);
  const selectStartEndDOM = createDOM(
    'span',
    'event-time',
    `${event.selectBusyFree === 'BUSYYY' ? 'Busy' : 'Free'}`
  );
  const eventDeleteDOM = createDOM('button', 'event-delete-btn', 'x');
  eventDeleteDOM.setAttribute('data-id', `${id}`);

  eventDeleteDOM.addEventListener('click', () => {
    onEventDelete(id);
    eventDOM.remove();
  });

  eventDOM.appendChild(titleDOM);
  eventDOM.appendChild(timeStartDOM);
  eventDOM.appendChild(timeEndDOM);
  eventDOM.appendChild(selectStartEndDOM);

  titleDOM.appendChild(eventDeleteDOM);

  columnList.forEach((_, i) => {
    const day = new Date(
      sundayDate.getFullYear(),
      sundayDate.getMonth(),
      sundayDate.getDate() + i
    );

    if (day.toDateString() === inputDate.toDateString()) {
      columnList[i].prepend(eventDOM);
    }
  });
}

function createDOM(element: string, style: string, content: string) {
  const dom = document.createElement(element);
  dom.classList.add(style);

  if (content.length > 0) dom.innerText = content;

  return dom;
}

function timeConverterToPixels(time: string) {
  const cellHeightInPixels = 48;
  const minPerHour = 60;
  const minHeightInPixels = cellHeightInPixels / minPerHour;

  let [hours, mins] = time.split(':');

  let hoursNumber = parseFloat(hours);
  let minNumber = parseFloat(mins);

  if (hoursNumber) hoursNumber = hoursNumber * cellHeightInPixels;
  if (minNumber) minNumber = minNumber * minHeightInPixels;

  return hoursNumber + minNumber;
}
