import { renderEvent } from '../components/renderEvent.js';
export function renderEventList({ eventList, activeDay, onEventDelete }) {
    const eventListDOM = document.querySelectorAll('.event');
    eventListDOM.forEach((el) => el.remove());
    eventList.forEach((event) => renderEvent(event, activeDay, event.id, onEventDelete));
}
