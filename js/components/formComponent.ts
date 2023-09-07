import { required } from '../helpers/formInputValidation.js';
import { formTimeValidation } from '../helpers/formTimeValidation.js';
import { formatDateToYYYYMMDD } from '../helpers/formatDateToYYYYMMDD.js';
import { formatTimeToHHMM } from '../helpers/formatTimeToHHMM.js';

const eventDate = document.querySelector('.event-date') as HTMLInputElement;
const eventTitleDOM = document.querySelector(
  '.event__form-header'
) as HTMLInputElement;
const eventStartDOM = document.querySelector(
  '.event-time__start'
) as HTMLInputElement;
const eventEndDOM = document.querySelector(
  '.event-time__end'
) as HTMLInputElement;

const errorDOM = document.querySelector('.error-msg') as HTMLInputElement;

interface FormErrors {
  title?: string;
  start?: string;
  end?: string;
}

let errorMap: FormErrors = {};

export function initForm() {
  resetForm();

  errorMap = {};
  //input validation
  eventTitleDOM?.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    const titleValue = (target?.value || '').trim();

    errorMap.title = required(titleValue);

    if (errorMap.title) {
      renderErrorClass(target, errorMap.title);
    }
    renderErrorMsg();
  });

  eventDate?.addEventListener('change', checkTime);
  eventStartDOM?.addEventListener('change', checkTime);
  eventEndDOM?.addEventListener('change', checkTime);
}

function checkTime() {
  const timeErrorList = formTimeValidation(
    eventDate.value,
    eventStartDOM.value,
    eventEndDOM.value
  );

  errorMap = {
    ...errorMap,
    ...timeErrorList
  };

  errorMap.start && renderErrorClass(eventStartDOM, errorMap.start);
  errorMap.end && renderErrorClass(eventEndDOM, errorMap.end);
  renderErrorMsg();
}

export function resetForm() {
  eventTitleDOM?.classList.remove('error');
  eventStartDOM?.classList.remove('error');
  eventEndDOM?.classList.remove('error');
  errorDOM.innerText = '';

  const formDOM = document.querySelector('.event__form') as HTMLFormElement;
  formDOM.reset();

  //event date
  const eventDateDOM = document.querySelector('.event-date');
  eventDateDOM?.setAttribute('min', formatDateToYYYYMMDD(new Date()));
  eventDateDOM?.setAttribute('value', formatDateToYYYYMMDD(new Date()));

  //event start
  eventStartDOM?.setAttribute('value', formatTimeToHHMM(new Date()));

  //event end
  const eventEndDate = new Date(new Date());
  eventEndDate.setHours(new Date().getHours() + 1);
  eventEndDOM?.setAttribute('value', formatTimeToHHMM(eventEndDate));
}

function renderErrorClass(DOM: HTMLElement, msg: string) {
  if (msg) {
    DOM.classList.add('error');
  } else {
    DOM.classList.remove('error');
  }
}

function renderErrorMsg() {
  errorDOM.innerText = '';

  for (let name in errorMap) {
    const msg = errorMap[name as keyof FormErrors];
    if (msg) {
      errorDOM.innerText += `\n${msg}`;
    }
  }
}
