import { isError, initForm } from './components/initForm.js';
import { renderMainCalendar } from './components/renderMainCalendar.js';
import { renderModal } from './components/renderModal.js';
import { renderSideCalendar } from './components/renderSideCalendar.js';

renderModal();

// ----STATE   state --> {today: , focusDay: }
const initStateHandler = (initialState, render) => {
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

// ----INIT CALENDAR
function startCalendar() {
  const stateHandler = initStateHandler(
    { today: new Date(), activeDay: new Date(), events: [] },
    render
  );

  const { setState, getState } = stateHandler;

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

  //--- save EVENTS
  //event form
  const formDOM = document.querySelector('.event__form');

  if (!isError) {
    formDOM.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(formDOM);
      const eventDataList = Object.fromEntries(formData);
      const id = Date.now();

      const event = { id, ...eventDataList };

      setState({ ...getState(), events: [...getState().events, event] });
      // renderEvent();
    });
  }
}

// ----RENDERING
function render(stateHandler) {
  const { setState, getState } = stateHandler;
  const state = getState();

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

  renderSideCalendar(todayData, activeDayData, clickedActiveDay);
  renderMainCalendar(todayData, activeDayData, clickedActiveDay);
  initForm();
}

startCalendar();
