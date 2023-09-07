import { required } from '../helpers/formInputValidation.js';
import { formTimeValidation } from '../helpers/formTimeValidation.js';
import { formatDateToYYYYMMDD } from '../helpers/formatDateToYYYYMMDD.js';
import { formatTimeToHHMM } from '../helpers/formatTimeToHHMM.js';
const eventDate = document.querySelector('.event-date');
const eventTitleDOM = document.querySelector('.event__form-header');
const eventStartDOM = document.querySelector('.event-time__start');
const eventEndDOM = document.querySelector('.event-time__end');
const errorDOM = document.querySelector('.error-msg');
let errorMap = {};
export function initForm() {
    resetForm();
    errorMap = {};
    //input validation
    eventTitleDOM === null || eventTitleDOM === void 0 ? void 0 : eventTitleDOM.addEventListener('change', (e) => {
        const target = e.target;
        const titleValue = ((target === null || target === void 0 ? void 0 : target.value) || '').trim();
        errorMap.title = required(titleValue);
        if (errorMap.title) {
            renderErrorClass(target, errorMap.title);
        }
        renderErrorMsg();
    });
    eventDate === null || eventDate === void 0 ? void 0 : eventDate.addEventListener('change', checkTime);
    eventStartDOM === null || eventStartDOM === void 0 ? void 0 : eventStartDOM.addEventListener('change', checkTime);
    eventEndDOM === null || eventEndDOM === void 0 ? void 0 : eventEndDOM.addEventListener('change', checkTime);
}
function checkTime() {
    const timeErrorList = formTimeValidation(eventDate.value, eventStartDOM.value, eventEndDOM.value);
    errorMap = {
        ...errorMap,
        ...timeErrorList
    };
    errorMap.start && renderErrorClass(eventStartDOM, errorMap.start);
    errorMap.end && renderErrorClass(eventEndDOM, errorMap.end);
    renderErrorMsg();
}
export function resetForm() {
    eventTitleDOM === null || eventTitleDOM === void 0 ? void 0 : eventTitleDOM.classList.remove('error');
    eventStartDOM === null || eventStartDOM === void 0 ? void 0 : eventStartDOM.classList.remove('error');
    eventEndDOM === null || eventEndDOM === void 0 ? void 0 : eventEndDOM.classList.remove('error');
    errorDOM.innerText = '';
    const formDOM = document.querySelector('.event__form');
    formDOM.reset();
    //event date
    const eventDateDOM = document.querySelector('.event-date');
    eventDateDOM === null || eventDateDOM === void 0 ? void 0 : eventDateDOM.setAttribute('min', formatDateToYYYYMMDD(new Date()));
    eventDateDOM === null || eventDateDOM === void 0 ? void 0 : eventDateDOM.setAttribute('value', formatDateToYYYYMMDD(new Date()));
    //event start
    eventStartDOM === null || eventStartDOM === void 0 ? void 0 : eventStartDOM.setAttribute('value', formatTimeToHHMM(new Date()));
    //event end
    const eventEndDate = new Date(new Date());
    eventEndDate.setHours(new Date().getHours() + 1);
    eventEndDOM === null || eventEndDOM === void 0 ? void 0 : eventEndDOM.setAttribute('value', formatTimeToHHMM(eventEndDate));
}
function renderErrorClass(DOM, msg) {
    if (msg) {
        DOM.classList.add('error');
    }
    else {
        DOM.classList.remove('error');
    }
}
function renderErrorMsg() {
    errorDOM.innerText = '';
    for (let name in errorMap) {
        const msg = errorMap[name];
        if (msg) {
            errorDOM.innerText += `\n${msg}`;
        }
    }
}
