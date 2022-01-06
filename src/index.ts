// import jingleBell from './assets/audio/audio.mp3';
import './style.css';
import './adaptive.css';
import { treeDrag, dragStart, dragEnd } from './drag';
import { drawCard } from './cards';
import {
  checkBell,
  checkBall,
  checkCone,
  checkSnowflake,
  checkToy,
  checkWhite,
  checkYellow,
  checkRed,
  checkBlue,
  checkGreen,
  checkBig,
  checkMedium,
  checkSmall,
  checkFavor,
  sortSelect,
} from './filter';
import { drawTreePage, getTreeData } from './tree';
import { getGarlandData } from './garland';

console.log(treeDrag);

window.addEventListener('load', getLocalStorage);
window.addEventListener('load', getGarlandData);
window.addEventListener('load', getTreeData);

// console.log(
//   '- Верстка и навигация соответствуют требованиям частично - нет адаптивности страницы Ёлка'
// );
// console.log(
//   '- Можно выбрать несколько елок и фонов с сохранением выбора, можно включить музыку и падающий снег'
// );
// console.log(
//   '- Гирлянда добавляется динамически, 4 цвета и разноцветный вариант'
// );
// console.log(
//   '- Есть избранные игрушки, в случае отсутствия Избранных добавляются первые 20 из коллекции'
// );
// console.log(
//   `* Нет адаптивности страницы Ёлка, кнопки сброса настроек и полного набора функционала с избранными игрушками`
// );

require('./assets/favicon.png');

// let localStorage: any; // check this. My god, I don understand ))

function getLocalStorage(): void {
  // get Current page
  if (!localStorage.getItem('getPage')) {
    getPage('start');
  } else {
    getPage(localStorage.getItem('getPage') || '');
  }
  // get garlandOn status
  if (localStorage.getItem('garlandOn')) {
    localStorage.getItem('garlandOn');
    const garlandCheck: any = <HTMLElement>(
      document.querySelector('.garland-checkbox')
    );
    garlandCheck.checked = JSON.parse(localStorage.getItem('garlandOn') || '');
  }
  // get The Tree
  if (!localStorage.getItem('theTree')) {
    localStorage.setItem('theTree', '1');
  }
  if (!localStorage.getItem('bg')) {
    localStorage.setItem('bg', '1');
  }

  // check Shape condition
  if (localStorage.getItem('bell')) {
    checkBell.checked = JSON.parse(localStorage.getItem('bell') || '');
  }
  if (localStorage.getItem('ball')) {
    checkBall.checked = JSON.parse(localStorage.getItem('ball') || '');
  }
  if (localStorage.getItem('cone')) {
    checkCone.checked = JSON.parse(localStorage.getItem('cone') || '');
  }
  if (localStorage.getItem('snowflake')) {
    checkSnowflake.checked = JSON.parse(
      localStorage.getItem('snowflake') || ''
    );
  }
  if (localStorage.getItem('toy')) {
    checkToy.checked = JSON.parse(localStorage.getItem('toy') || '');
  }
  // check Color condition
  if (localStorage.getItem('white')) {
    checkWhite.checked = JSON.parse(localStorage.getItem('white') || '');
  }
  if (localStorage.getItem('yellow')) {
    checkYellow.checked = JSON.parse(localStorage.getItem('yellow') || '');
  }
  if (localStorage.getItem('red')) {
    checkRed.checked = JSON.parse(localStorage.getItem('red') || '');
  }
  if (localStorage.getItem('blue')) {
    checkBlue.checked = JSON.parse(localStorage.getItem('blue') || '');
  }
  if (localStorage.getItem('green')) {
    checkGreen.checked = JSON.parse(localStorage.getItem('green') || '');
  }
  // check Size condition
  if (localStorage.getItem('big')) {
    checkBig.checked = JSON.parse(localStorage.getItem('big') || '');
  }
  if (localStorage.getItem('medium')) {
    checkMedium.checked = JSON.parse(localStorage.getItem('medium') || '');
  }
  if (localStorage.getItem('small')) {
    checkSmall.checked = JSON.parse(localStorage.getItem('small') || '');
  }
  // check Favorite condition
  if (localStorage.getItem('favor')) {
    checkFavor.checked = JSON.parse(localStorage.getItem('favor') || '');
  }
}

function importAll(r: any) {
  return r.keys().map(r);
}

export const srcBalls: object = importAll(
  require.context('./assets/ball/', false, /\.(png|jpe?g|svg|webp)$/)
);
export const srcBg: object = importAll(
  require.context('./assets/bg/', false, /\.(png|jpe?g|svg|webp)$/)
);
export const srcSvg: object = importAll(
  require.context('./assets/svg/', false, /\.(png|jpe?g|svg|webp)$/)
);
export const srcToys: object = importAll(
  require.context('./assets/toys/', false, /\.(png|jpe?g|svg|webp)$/)
);
export const srcTree: object = importAll(
  require.context('./assets/tree/', false, /\.(png|jpe?g|svg|webp)$/)
);

// getting Current Page
const startBtn = <HTMLElement>document.querySelector('.start-btn');
const startPage = <HTMLElement>document.querySelector('.start-page');
const toysPage = <HTMLElement>document.querySelector('.toys');
const treePage = <HTMLElement>document.querySelector('.tree');
const header = <HTMLElement>document.querySelector('.header');

export function getPage(current: string): any {
  switch (current) {
    case 'start':
      startPage.classList.remove('hide');
      header.classList.add('hide');
      toysPage.classList.add('hide');
      treePage.classList.add('hide');
      toysNav.classList.remove('active-nav'); // toggle underline Nav item
      treeNav.classList.remove('active-nav');
      break;
    case 'toys':
      startPage.classList.add('hide');
      header.classList.remove('hide');
      toysPage.classList.remove('hide');
      treePage.classList.add('hide');
      drawCard();
      toysNav.classList.add('active-nav');
      treeNav.classList.remove('active-nav');
      break;
    case 'tree':
      startPage.classList.add('hide');
      header.classList.remove('hide');
      toysPage.classList.add('hide');
      treePage.classList.remove('hide');
      drawTreePage();
      toysNav.classList.remove('active-nav');
      treeNav.classList.add('active-nav');
      // setTimeout(() => {}, 0);
      break;
  }
}

const startNav = <HTMLElement>document.querySelector('.start-nav');
const toysNav = <HTMLElement>document.querySelector('.toys-nav');
const treeNav = <HTMLElement>document.querySelector('.tree-nav');

startBtn.addEventListener('click', () => {
  getPage('toys');
  localStorage.setItem('getPage', 'toys');
});
startNav.addEventListener('click', () => {
  getPage('start');
  localStorage.setItem('getPage', 'start');
});
toysNav.addEventListener('click', () => {
  getPage('toys');
  localStorage.setItem('getPage', 'toys');
});
treeNav.addEventListener('click', () => {
  getPage('tree');
  localStorage.setItem('getPage', 'tree');
});
