export function renderTitle(title, activeDayData) {
    const formattedDateYear = activeDayData.toLocaleString('en-US', {
        year: 'numeric'
    });
    const formattedDateMonth = activeDayData.toLocaleString('en-US', {
        month: 'long'
    });
    title.innerHTML = `${formattedDateMonth} ${formattedDateYear}`;
}
