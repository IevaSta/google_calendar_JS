import { formatTimeToHHMM } from './formatTimeToHHMM.js';

export function formValidation(value, type) {
  const currentTime = formatTimeToHHMM(new Date());

  switch (type) {
    case 'title':
      const titleValue = value.trim();
      return { type, msg: titleValue.length ? '' : 'Title is required.' };
    case 'start':
      return {
        type,
        msg:
          value >= currentTime
            ? ''
            : 'The event cannot start earlier than the present moment.'
      };
    case 'end':
      return {
        type,
        msg:
          value > currentTime
            ? ''
            : 'The event cannot end earlier than the present moment.'
      };
    default:
  }
}
