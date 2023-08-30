function createCalendarAPI(config) {
  const delay = config.delay;

  const getRandomDelay = () => {
    if (Array.isArray(delay)) {
      return Math.floor(Math.random() * (delay[1] - delay[0])) + delay[0];
    }
    return delay;
  };

  const storageKey = 'calendarEvents';

  const getEvents = () => JSON.parse(localStorage.getItem(storageKey) || '[]');

  const setEvents = (events) =>
    localStorage.setItem(storageKey, JSON.stringify(events));

  return {
    createEvent: (event) =>
      new Promise((resolve) => {
        setTimeout(() => {
          const events = getEvents();
          event.id = new Date().getTime();
          events.push(event);
          setEvents(events);
          resolve(event);
        }, getRandomDelay());
      }),
    deleteEvent: (id) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const events = getEvents();
          const index = events.findIndex((e) => e.id === id);
          if (index !== -1) {
            events.splice(index, 1);
            setEvents(events);
            resolve(true);
          } else {
            reject('Event not found');
          }
        }, getRandomDelay());
      }),
    listEvents: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(getEvents());
        }, getRandomDelay());
      })
  };
}
