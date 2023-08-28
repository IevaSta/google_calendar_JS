import { formatTimeToHHMM } from './formatTimeToHHMM.js';

export function formTimeValidation(date, start, end) {
  let errorList = [];

  const currentTime = new Date();
  currentTime.setSeconds(0);
  currentTime.setMilliseconds(0);

  const choosenStartDate = new Date(date + ' ' + start);
  const choosenEndDate = new Date(date + ' ' + end);

  errorList = [
    ...errorList,
    {
      name: 'start',
      msg:
        choosenStartDate.getTime() < currentTime.getTime()
          ? 'The event cannot start earlier than the present moment.'
          : ''
    }
  ];

  errorList = [
    ...errorList,
    {
      name: 'end',
      msg:
        choosenStartDate.getTime() >= choosenEndDate.getTime()
          ? 'The event cannot end earlier than the present moment.'
          : ''
    }
  ];

  return errorList;
}
