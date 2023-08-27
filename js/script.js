import { isError, initForm } from './components/formComponent.js';
import { renderMainCalendar } from './components/renderMainCalendar.js';
import { closeModal, renderModal } from './components/renderModal.js';
import { renderSideCalendar } from './components/renderSideCalendar.js';
import { handleEventList } from './helpers/handleEventList.js';

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

// ----INIT CALENDAR
function startCalendar() {
  const stateHandler = initStateHandler({
    today: new Date(),
    activeDay: new Date(),
    events: JSON.parse(localStorage.getItem('calendar')) || []
  });

  const { setState, getState } = stateHandler;

  //--- update ACTIVE DAY by month
  function nextMonth() {
    handleEventList(getState().events, getState().activeDay);

    const newActiveDayDate = new Date(getState().activeDay);
    newActiveDayDate.setMonth(newActiveDayDate.getMonth() + 1);

    setState({
      ...getState(),
      activeDay: newActiveDayDate
    });
  }

  function backMonth() {
    handleEventList(getState().events, getState().activeDay);

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
    handleEventList(getState().events, getState().activeDay);

    const newActiveDayDate = new Date(getState().activeDay);
    newActiveDayDate.setDate(newActiveDayDate.getDate() + 7);
    newActiveDayDate.getDate();

    setState({
      ...getState(),
      activeDay: newActiveDayDate
    });
  }

  function backWeek() {
    handleEventList(getState().events, getState().activeDay);

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

  if (!isError) {
    formDOM.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(formDOM);
      const eventDataList = Object.fromEntries(formData);
      const id = Date.now();

      const event = { id, ...eventDataList };

      setState({ ...getState(), events: [...getState().events, event] });
      localStorage.setItem('calendar', JSON.stringify(getState().events));

      handleEventList(getState().events, getState().activeDay);
      closeModal();
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
  renderModal(getState().activeDay);
  initForm(getState().activeDay);
  handleEventList(getState().events, getState().activeDay);
}

startCalendar();
