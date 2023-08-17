import { doTitleDate } from './components/doTitleDate.js';
import { renderModal } from './components/renderModal.js';

const titleListDom = document.querySelectorAll('.render-title');

titleListDom.forEach((title) => doTitleDate(title));

renderModal();
