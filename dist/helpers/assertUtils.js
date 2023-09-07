export function assertHTMLElement(element) {
    if (element instanceof HTMLElement) {
        return;
    }
    throw new Error('Not HTMLElement!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}
export function querySelectorOrDie(selector) {
    const el = document.querySelector(selector);
    assertHTMLElement(el);
    return el;
}
export function isHTMLElement(element) {
    return element instanceof HTMLElement;
}
export function isDefined(x) {
    return x !== null && x !== undefined;
}
