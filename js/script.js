const eventModal = document.querySelector('.event-modal');
const closeModal = () => eventModal.classList.add('hidden');
const openModal = () => eventModal.classList.remove('hidden');


//Vaidas ch!!!

// document.querySelector('#today-test').addEventListener('click', (e) => {
//     e.stopPropagation(); 
//     console.log('test');
// });


document.querySelector('.open-event-modal').addEventListener('click', (e) => {
    e.stopPropagation(); 
    openModal();
});

document.querySelector('.close-event-modal').addEventListener('click', closeModal);

function isClickedOutsideEventModal(target) {
    return !eventModal.contains(target) && target !== eventModal;
}

document.addEventListener('click', (e) => {
    isClickedOutsideEventModal(e.target) && closeModal();
});


