import { initForm } from './components/formComponent.js';
import { renderMainCalendar } from './components/renderMainCalendar.js';
import { closeModal, renderModal } from './components/renderModal.js';
import { renderSideCalendar } from './components/renderSideCalendar.js';
import { querySelectorOrDie } from './helpers/assertUtils.js';
import { Event, createCalendarAPI } from './helpers/createCalendarAPI.js';
import { renderEventList } from './helpers/handleEventList.js';

interface State {
  today: Date;
  activeDay: Date;
  events: Event[];
  isLoading: boolean;
  isError: boolean;
}

interface StateHandler {
  setState(newState: State): void;
  getState(): Readonly<State>;
}

// ----STATE   state --> {today: , focusDay: }
const initStateHandler = (initialState: State) => {
  let state: State;

  const stateHandler: StateHandler = {
    setState(newState: State) {
      state = newState;
      render(stateHandler);
    },
    getState() {
      return state;
    }
  };

  stateHandler.setState(initialState);
  return stateHandler;
};

//API
const calendarAPI = createCalendarAPI({ delay: 0 });

// ----INIT CALENDAR
export function startCalendar() {
  document.querySelector('.lg-calendar-wrapper')?.scrollTo(0, 300);

  const stateHandler = initStateHandler({
    today: new Date(),
    activeDay: new Date(),
    events: [],
    isLoading: false,
    isError: false
  });

  const { setState, getState } = stateHandler;
  setState({ ...getState(), isLoading: true });

  calendarAPI
    .listEvents()
    .then((value) => {
      setState({ ...getState(), events: value, isLoading: false });
    })
    .catch(() => {
      setState({
        ...getState(),
        events: [],
        isError: true,
        isLoading: false
      });
    });

  //--- update ACTIVE DAY by month
  function nextMonth() {
    const newActiveDayDate = new Date(getState().activeDay);
    newActiveDayDate.setMonth(newActiveDayDate.getMonth() + 1);

    setState({
      ...getState(),
      activeDay: newActiveDayDate
    });
  }

  function backMonth() {
    const newActiveDayDate = new Date(getState().activeDay);
    newActiveDayDate.setMonth(newActiveDayDate.getMonth() - 1);

    setState({
      ...getState(),
      activeDay: newActiveDayDate
    });
  }

  document
    .querySelector('.forward-month__side')
    ?.addEventListener('click', nextMonth);
  document
    .querySelector('.backward-month__side')
    ?.addEventListener('click', backMonth);

  //--- update ACTIVE DAY by week
  function nextWeek() {
    const newActiveDayDate = new Date(getState().activeDay);
    newActiveDayDate.setDate(newActiveDayDate.getDate() + 7);
    newActiveDayDate.getDate();

    setState({
      ...getState(),
      activeDay: newActiveDayDate
    });
  }

  function backWeek() {
    const newActiveDayDate = new Date(getState().activeDay);
    newActiveDayDate.setDate(newActiveDayDate.getDate() - 7);
    newActiveDayDate.getDate();

    setState({
      ...getState(),
      activeDay: newActiveDayDate
    });
  }

  document
    .querySelector('.forward-week__main')
    ?.addEventListener('click', nextWeek);
  document
    .querySelector('.backward-week__main')
    ?.addEventListener('click', backWeek);

  //--- TODAY button
  document.querySelector('.set-today')?.addEventListener('click', () => {
    setState({
      ...getState(),
      activeDay: getState().today
    });
  });

  //--- save EVENTS
  //event form
  const formDOM = document.querySelector('.event__form');

  formDOM?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formDOM as HTMLFormElement);
    const eventData: Omit<Event, 'id'> = Object.fromEntries(formData) as any;

    if (eventData.title) {
      eventData.title.trim();

      if (eventData.title.trim()) {
        const event = {
          ...eventData,
          title: eventData.title.trim()
        };

        setState({ ...getState(), isLoading: true });

        calendarAPI
          .createEvent(event)
          .then((event) => {
            setState({
              ...getState(),
              events: [...getState().events, event],
              isLoading: false
            });
            closeModal();
          })
          .catch(() => {
            setState({ ...getState(), isError: true, isLoading: false });
          });
      }
    } else {
      const msgDOM = document.querySelector('.error-msg') as HTMLElement;
      msgDOM.innerText = 'Title is required.';
    }
  });
}

// ----RENDERING
function render(stateHandler: StateHandler) {
  const { setState, getState } = stateHandler;
  const state = getState();

  if (state.isLoading) {
    document.querySelector('.overlay-body')?.classList.add('overlay');
    document.querySelector('.loader-body')?.classList.add('loader');
  } else {
    document.querySelector('.overlay-body')?.classList.remove('overlay');
    document.querySelector('.loader-body')?.classList.remove('loader');
  }

  const todayData = state.today;
  const activeDayData = state.activeDay;

  //---
  const clickedActiveDay = (renderingDay: Date) => {
    const newActiveDayDate = new Date(renderingDay);

    setState({
      ...getState(),
      activeDay: newActiveDayDate
    });
  };

  const onEventDelete = (eventId: number) => {
    setState({ ...getState(), isLoading: true });

    calendarAPI
      .deleteEvent(eventId)
      .then(() => {
        setState({
          ...getState(),
          events: getState().events.filter((event: Event) => {
            if (eventId !== event.id) return event;
          }),
          isLoading: false
        });
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  };

  querySelectorOrDie('.overlay-body').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  renderSideCalendar({
    today: todayData,
    activeDay: activeDayData,
    clickedActiveDay
  });
  renderMainCalendar(todayData, activeDayData, clickedActiveDay);
  renderModal();
  initForm();

  renderEventList({
    eventList: getState().events,
    activeDay: getState().activeDay,
    onEventDelete
  });
}

startCalendar();
