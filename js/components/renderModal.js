import { resetForm } from './formComponent';

let isModalOpen = false;

const eventModal = document.querySelector('.event-modal');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContent = document.querySelectorAll('.tab-content');

export function renderModal(activeDay) {
  //Vaidas ch!!!

  // document.querySelector('#today-test').addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     console.log('test');
  // });

  document.querySelector('.open-event-modal').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(activeDay);

    tabButtons.forEach((t) => t.classList.remove('event-nav-btn--open'));
    tabButtons[0].classList.add('event-nav-btn--open');
    tabContent.forEach((t) => t.classList.add('hidden'));
    tabContent[0].classList.remove('hidden');
  });

  document
    .querySelector('.close-event-modal')
    .addEventListener('click', closeModal);

  function isClickedOutsideEventModal(target) {
    return !eventModal.contains(target) && target !== eventModal;
  }

  document.addEventListener('click', (e) => {
    isClickedOutsideEventModal(e.target) && closeModal();
  });

  //switching between event tabs
  tabButtons.forEach((button) => {
    const tabTarget = button.getAttribute('data-target');
    const tab = document.querySelector(`[data-tab=${tabTarget}]`);

    button.addEventListener('click', (e) => {
      e.preventDefault();

      tabButtons.forEach((t) => t.classList.remove('event-nav-btn--open'));
      button.classList.add('event-nav-btn--open');
      tabContent.forEach((t) => t.classList.add('hidden'));
      tab.classList.remove('hidden');
    });
  });
}

export function openModal(activeDay) {
  isModalOpen = true;
  resetForm(activeDay);
  eventModal.classList.remove('hidden');
}

export function closeModal() {
  if (isModalOpen) {
    isModalOpen = false;
    eventModal.classList.add('hidden');
  }
}
