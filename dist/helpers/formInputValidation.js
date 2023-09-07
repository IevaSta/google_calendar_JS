export function required(value) {
    return value.length ? undefined : 'Title is required.';
}
