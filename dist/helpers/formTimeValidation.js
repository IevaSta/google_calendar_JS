export function formTimeValidation(date, start, end) {
    const currentTime = new Date();
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);
    const choosenStartDate = new Date(date + ' ' + start);
    const choosenEndDate = new Date(date + ' ' + end);
    return {
        start: choosenStartDate.getTime() < currentTime.getTime()
            ? 'The event cannot start earlier than the present moment.'
            : undefined,
        end: choosenStartDate.getTime() >= choosenEndDate.getTime()
            ? 'The event cannot end earlier than the starting moment.'
            : undefined
    };
}
