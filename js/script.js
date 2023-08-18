import { doTitleDate } from './components/renderSideTitle.js';
import { renderModal } from './components/renderModal.js';
import { renderSideCalendar } from './components/renderSideCalendar.js';

const headertitleListDOM = document.querySelector('.render-title__side');
const sideTitleDOM = document.querySelector('.side-calendar__title');

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
    { today: new Date(), activeDay: new Date() },
    render
  );

  const { setState, getState } = stateHandler;

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
}

// ----RENDERING
function render(stateHandler) {
  const { getState } = stateHandler;
  const state = getState();

  const todayData = state.today;
  const activeDayData = state.activeDay;

  doTitleDate(sideTitleDOM, activeDayData);
  renderSideCalendar(todayData, activeDayData);
}

startCalendar();
