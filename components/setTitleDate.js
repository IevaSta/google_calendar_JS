export function setTitleDate() {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const title = document.querySelector('#title');
    const date = new Date();

    function renderTitle(renderDate) {
        const year = renderDate.getFullYear();
        const month = renderDate.getMonth();
        title.innerHTML = `${year} ${months[month]}`;
    }
    renderTitle(date);

    const forwardBtn = document.querySelector('.forward');
    const backwardBtn = document.querySelector('.backward');

    function nextMonth() {
        date.setMonth(date.getMonth() + 1);
        renderTitle(date);
    }

    function backMonth() {
        date.setMonth(date.getMonth() - 1);
        renderTitle(date);
    }

    forwardBtn.addEventListener('click', nextMonth);
    backwardBtn.addEventListener('click', backMonth);
}

