import {setTitleDate} from "../components/setTitleDate.js";

const eventModal = document.querySelector('.event-modal');
const eventForm = document.querySelector('event__form');
const officeForm = document.querySelector('out-of-office__form');

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContent = document.querySelectorAll('.tab-content');

const closeModal = () => {
    eventModal.classList.add('hidden');
}
const openModal = () => eventModal.classList.remove('hidden');


//Vaidas ch!!!

// document.querySelector('#today-test').addEventListener('click', (e) => {
//     e.stopPropagation(); 
//     console.log('test');
// });


document.querySelector('.open-event-modal').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal();

    tabButtons.forEach(t => t.classList.remove('event-nav-btn--open'));
    tabButtons[0].classList.add('event-nav-btn--open');
    tabContent.forEach(t => t.classList.add('hidden'));
    tabContent[0].classList.remove('hidden');
});

document.querySelector('.close-event-modal').addEventListener('click', closeModal);

function isClickedOutsideEventModal(target) {
    return !eventModal.contains(target) && target !== eventModal;
}

document.addEventListener('click', (e) => {
    isClickedOutsideEventModal(e.target) && closeModal();
});

//switching between event tabs
tabButtons.forEach((button) => {
    const tabTarget = button.getAttribute('data-target');
    const tab = document.querySelector(`[data-tab=${tabTarget}]`)

    button.addEventListener('click', (e) => {
        e.preventDefault();

        tabButtons.forEach(t => t.classList.remove('event-nav-btn--open'));
        button.classList.add('event-nav-btn--open');
        tabContent.forEach(t => t.classList.add('hidden'));
        tab.classList.remove('hidden');
    })
})

setTitleDate();


