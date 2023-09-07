import { renderEvent } from '../components/renderEvent.js';
import { Event } from './createCalendarAPI.js';

export function renderEventList({
  eventList,
  activeDay,
  onEventDelete
}: {
  eventList: Event[];
  activeDay: Date;
  onEventDelete: (arg: number) => void;
}): void {
  const eventListDOM = document.querySelectorAll('.event');
  eventListDOM.forEach((el) => el.remove());

  eventList.forEach((event) =>
    renderEvent(event, activeDay, event.id, onEventDelete)
  );
}
