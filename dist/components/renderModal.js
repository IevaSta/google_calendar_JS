import { resetForm } from './formComponent.js';
let isModalOpen = false;
const eventModal = document.querySelector('.event-modal');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContent = document.querySelectorAll('.tab-content');
export function renderModal() {
    //Vaidas ch!!!
    var _a, _b;
    // document.querySelector('#today-test').addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     console.log('test');
    // });
    (_a = document
        .querySelector('.open-event-modal')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal();
        tabButtons.forEach((t) => t.classList.remove('event-nav-btn--open'));
        tabButtons[0].classList.add('event-nav-btn--open');
        tabContent.forEach((t) => t.classList.add('hidden'));
        tabContent[0].classList.remove('hidden');
    });
    (_b = document
        .querySelector('.close-event-modal')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closeModal);
    function isClickedOutsideEventModal(target) {
        return !(eventModal === null || eventModal === void 0 ? void 0 : eventModal.contains(target)) && target !== eventModal;
    }
    document.addEventListener('click', (e) => {
        const target = e.target;
        isClickedOutsideEventModal(target) && closeModal();
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
            tab === null || tab === void 0 ? void 0 : tab.classList.remove('hidden');
        });
    });
}
export function openModal() {
    isModalOpen = true;
    resetForm();
    eventModal === null || eventModal === void 0 ? void 0 : eventModal.classList.remove('hidden');
}
export function closeModal() {
    if (isModalOpen) {
        isModalOpen = false;
        eventModal === null || eventModal === void 0 ? void 0 : eventModal.classList.add('hidden');
    }
}
