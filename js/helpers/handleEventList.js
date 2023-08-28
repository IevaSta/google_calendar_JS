import { renderEvent } from '../components/renderEvent.js';

export function handleEventList(eventList, activeDay, onEventDelete) {
  const eventListDOM = document.querySelectorAll('.event');
  eventListDOM.forEach((el) => el.remove());
  eventList.forEach((event) =>
    renderEvent(event, activeDay, event.id, eventList, onEventDelete)
  );
}
