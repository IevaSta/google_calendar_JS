export function formInputValidation(value, type) {
  switch (type) {
    case 'title':
      const titleValue = value.trim();
      return titleValue.length ? '' : 'Title is required.';
    default:
  }
}
