import { formValidation } from '../helpers/formValidation.js';
import { formatDateToYYYYMMDD } from '../helpers/formatDateToYYYYMMDD.js';
import { formatTimeToHHMM } from '../helpers/formatTimeToHHMM.js';

const errorList = {};
export let isError = false;

const eventTitleDOM = document.querySelector('.event__form-header');
const eventStartDOM = document.querySelector('.event-time__start');
const eventEndDOM = document.querySelector('.event-time__end');

export function initForm() {
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

  //input validation
  eventTitleDOM.addEventListener('change', (e) => {
    errorList.title = formValidation(e.target.value, 'title');

    renderErrorClass(e.target, errorList.title.msg);
    renderErrorMsg();
  });
  eventStartDOM.addEventListener('change', checkTIme);
  eventEndDOM.addEventListener('change', checkTIme);
}

function checkTIme() {
  errorList.start = formValidation(eventStartDOM.value, 'start');
  errorList.end = formValidation(eventEndDOM.value, 'end');

  renderErrorClass(eventStartDOM, errorList.start.msg);
  renderErrorClass(eventEndDOM, errorList.end.msg);
  renderErrorMsg();
}

function renderErrorClass(DOM, msg) {
  if (msg) {
    DOM.classList.add('error');
  } else {
    DOM.classList.remove('error');
  }
}

function renderErrorMsg() {
  const errorDOM = document.querySelector('.error-msg');
  errorDOM.innerText = '';

  for (let name in errorList) {
    const msg = errorList[name].msg;
    if (msg) {
      errorDOM.innerText += `\n${msg}`;
    }
  }

  isError = errorDOM.innerText ? true : false;
}
