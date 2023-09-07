import { initForm } from './components/formComponent.js';
import { renderMainCalendar } from './components/renderMainCalendar.js';
import { closeModal, renderModal } from './components/renderModal.js';
import { renderSideCalendar } from './components/renderSideCalendar.js';
import { querySelectorOrDie } from './helpers/assertUtils.js';
import { createCalendarAPI } from './helpers/createCalendarAPI.js';
import { renderEventList } from './helpers/handleEventList.js';
// ----STATE   state --> {today: , focusDay: }
const initStateHandler = (initialState) => {
    let state;
    const stateHandler = {
        setState(newState) {
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
    var _a, _b, _c, _d, _e, _f;
    (_a = document.querySelector('.lg-calendar-wrapper')) === null || _a === void 0 ? void 0 : _a.scrollTo(0, 300);
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
    (_b = document
        .querySelector('.forward-month__side')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', nextMonth);
    (_c = document
        .querySelector('.backward-month__side')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', backMonth);
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
    (_d = document
        .querySelector('.forward-week__main')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', nextWeek);
    (_e = document
        .querySelector('.backward-week__main')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', backWeek);
    //--- TODAY button
    (_f = document.querySelector('.set-today')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
        setState({
            ...getState(),
            activeDay: getState().today
        });
    });
    //--- save EVENTS
    //event form
    const formDOM = document.querySelector('.event__form');
    formDOM === null || formDOM === void 0 ? void 0 : formDOM.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formDOM);
        const eventData = Object.fromEntries(formData);
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
        }
        else {
            const msgDOM = document.querySelector('.error-msg');
            msgDOM.innerText = 'Title is required.';
        }
    });
}
// ----RENDERING
function render(stateHandler) {
    var _a, _b, _c, _d;
    const { setState, getState } = stateHandler;
    const state = getState();
    if (state.isLoading) {
        (_a = document.querySelector('.overlay-body')) === null || _a === void 0 ? void 0 : _a.classList.add('overlay');
        (_b = document.querySelector('.loader-body')) === null || _b === void 0 ? void 0 : _b.classList.add('loader');
    }
    else {
        (_c = document.querySelector('.overlay-body')) === null || _c === void 0 ? void 0 : _c.classList.remove('overlay');
        (_d = document.querySelector('.loader-body')) === null || _d === void 0 ? void 0 : _d.classList.remove('loader');
    }
    const todayData = state.today;
    const activeDayData = state.activeDay;
    //---
    const clickedActiveDay = (renderingDay) => {
        const newActiveDayDate = new Date(renderingDay);
        setState({
            ...getState(),
            activeDay: newActiveDayDate
        });
    };
    const onEventDelete = (eventId) => {
        setState({ ...getState(), isLoading: true });
        calendarAPI
            .deleteEvent(eventId)
            .then(() => {
            setState({
                ...getState(),
                events: getState().events.filter((event) => {
                    if (eventId !== event.id)
                        return event;
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
