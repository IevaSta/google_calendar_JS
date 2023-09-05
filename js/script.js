import { initForm } from './components/formComponent';
import { renderMainCalendar } from './components/renderMainCalendar';
import { closeModal, renderModal } from './components/renderModal';
import { renderSideCalendar } from './components/renderSideCalendar';
import { createCalendarAPI } from './helpers/createCalendarAPI';
import { handleEventList } from './helpers/handleEventList';

// ----STATE   state --> {today: , focusDay: }
const initStateHandler = (initialState) => {
  let state;

  const stateHandler = {
    setState(newState) {
      state = newState;
      render(stateHandler);
    },
    getState() {
      return Object.freeze(state);
    }
  };

  stateHandler.setState(initialState);
  return stateHandler;
};

//API
const calendarAPI = createCalendarAPI({ delay: [1000, 3000] });

// ----INIT CALENDAR
export function startCalendar() {
  document.querySelector('.lg-calendar-wrapper').scrollTo(0, 300);

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
    .catch((error) => {
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
    .addEventListener('click', nextMonth);
  document
    .querySelector('.backward-month__side')
    .addEventListener('click', backMonth);

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
    .addEventListener('click', nextWeek);
  document
    .querySelector('.backward-week__main')
    .addEventListener('click', backWeek);

  //--- TODAY button
  document.querySelector('.set-today').addEventListener('click', (e) => {
    setState({
      ...getState(),
      activeDay: getState().today
    });
  });

  //--- save EVENTS
  //event form
  const formDOM = document.querySelector('.event__form');

  formDOM.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formDOM);
    const eventDataList = Object.fromEntries(formData);

    if (eventDataList.title) {
      eventDataList.title.trim();

      if (eventDataList.title.trim()) {
        const event = {
          ...eventDataList,
          title: eventDataList.title.trim()
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
          .catch((error) => {
            setState({ ...getState(), isError: true, isLoading: false });
          });
      }
    } else {
      document.querySelector('.error-msg').innerText = 'Title is required.';
    }
  });
}

// ----RENDERING
function render(stateHandler) {
  const { setState, getState } = stateHandler;
  const state = getState();

  if (state.isLoading) {
    document.querySelector('.overlay-body').classList.add('overlay');
    document.querySelector('.loader-body').classList.add('loader');
  } else {
    document.querySelector('.overlay-body').classList.remove('overlay');
    document.querySelector('.loader-body').classList.remove('loader');
  }
  // if (state.isError) {
  //   document.querySelector('.error-overlay').style.display = 'block';
  // } else {
  //   document.querySelector('.error-overlay').style.display = 'none';
  // }

  const todayData = state.today;
  const activeDayData = state.activeDay;

  //--- update ACTIVE DAY by clicking
  const clickedActiveDay = (renderingDay) => {
    const newActiveDayDate = new Date(renderingDay);

    setState({
      ...getState(),
      activeDay: newActiveDayDate
    });
  };

  //delete Events
  const onEventDelete = (eventId) => {
    setState({ ...getState(), isLoading: true });

    calendarAPI
      .deleteEvent(eventId)
      .then(() => {
        setState({
          ...getState(),
          events: getState().events.filter((event) => {
            if (eventId !== event.id) return event;
          }),
          isLoading: false
        });
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  };

  document.querySelector('.overlay-body').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  renderSideCalendar(todayData, activeDayData, clickedActiveDay);
  renderMainCalendar(todayData, activeDayData, clickedActiveDay);
  renderModal(getState().activeDay);
  initForm(getState().activeDay);

  handleEventList(getState().events, getState().activeDay, onEventDelete);
}

startCalendar();
