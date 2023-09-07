export function assertHTMLElement(
  element: Element | null
): asserts element is HTMLElement {
  if (element instanceof HTMLElement) {
    return;
  }

  throw new Error('Not HTMLElement!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}
export function querySelectorOrDie(selector: string): HTMLElement {
  const el = document.querySelector(selector);
  assertHTMLElement(el);
  return el;
}
export function isHTMLElement(element: Element | null): element is HTMLElement {
  return element instanceof HTMLElement;
}

export function isDefined<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined;
}
