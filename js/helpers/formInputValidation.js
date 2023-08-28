export function formInputValidation(value, type) {
  switch (type) {
    case 'title':
      return value.length ? '' : 'Title is required.';
    default:
  }
}
