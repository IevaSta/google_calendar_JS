import { formInputValidation } from '../helpers/formInputValidation.js';
import { formTimeValidation } from '../helpers/formTimeValidation.js';
import { formatDateToYYYYMMDD } from '../helpers/formatDateToYYYYMMDD.js';
import { formatTimeToHHMM } from '../helpers/formatTimeToHHMM.js';

const eventDate = document.querySelector('.event-date');
const eventTitleDOM = document.querySelector('.event__form-header');
const eventStartDOM = document.querySelector('.event-time__start');
const eventEndDOM = document.querySelector('.event-time__end');

const errorDOM = document.querySelector('.error-msg');

let errorList = {};

export function initForm(activeDay) {
  resetForm(activeDay);
  errorList = {};
  //input validation
  eventTitleDOM.addEventListener('change', (e) => {
    const titleValue = e.target.value.trim();
    errorList.title = formInputValidation(titleValue, 'title');

    renderErrorClass(e.target, errorList.title);
    renderErrorMsg();
  });

  eventDate.addEventListener('change', checkTIme);
  eventStartDOM.addEventListener('change', checkTIme);
  eventEndDOM.addEventListener('change', checkTIme);
}

function checkTIme() {
  const timeErrorList = formTimeValidation(
    eventDate.value,
    eventStartDOM.value,
    eventEndDOM.value
  );

  timeErrorList.forEach(({ name, msg }) => (errorList[name] = msg));

  renderErrorClass(eventStartDOM, errorList.start);
  renderErrorClass(eventEndDOM, errorList.end);
  renderErrorMsg();
}

export function resetForm(activeDay) {
  eventTitleDOM.classList.remove('error');
  eventStartDOM.classList.remove('error');
  eventEndDOM.classList.remove('error');
  errorDOM.innerText = '';

  const formDOM = document.querySelector('.event__form');
  formDOM.reset();

  //event date
  const eventDateDOM = document.querySelector('.event-date');
  eventDateDOM.setAttribute('min', formatDateToYYYYMMDD(new Date()));
  eventDateDOM.setAttribute('value', formatDateToYYYYMMDD(new Date()));

  //event start
  eventStartDOM.setAttribute('value', formatTimeToHHMM(new Date()));

  //event end
  const eventEndDate = new Date(new Date());
  eventEndDate.setHours(new Date().getHours() + 1);
  eventEndDOM.setAttribute('value', formatTimeToHHMM(eventEndDate));
}

function renderErrorClass(DOM, msg) {
  if (msg) {
    DOM.classList.add('error');
  } else {
    DOM.classList.remove('error');
  }
}

function renderErrorMsg() {
  errorDOM.innerText = '';

  for (let name in errorList) {
    const msg = errorList[name];
    if (msg) {
      errorDOM.innerText += `\n${msg}`;
    }
  }
}
