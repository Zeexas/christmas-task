import jingleBell from './assets/audio/audio.mp3';
import { chosenSet, getCardsData } from './cards';
import data from './data';
import { dragStart, dragEnd } from './drag';

export function getTreeData(): void {
  if (localStorage.getItem('snow') === 'true') {
    snowTime = setInterval(createSnowFlake, 50);
    snowElement.classList.toggle('music-snow-toggle');
    isSnow = JSON.parse(localStorage.getItem('snow') || '');
  }
}

const musicSnowElement = <HTMLElement>document.querySelector('.music-snow');
const musicElement = <HTMLElement>document.querySelector('.music');
const snowElement = <HTMLElement>document.querySelector('.snow');
let isPlay: boolean = false;
let isSnow: boolean = false;
let snowTime: any;

export const music = new Audio(jingleBell);

// console.log(music);

export function playMusic(): void {
  console.log('Mucin On');
  if (!isPlay) {
    music.volume = 0.3;
    music.loop = true;
    music.play();
    isPlay = true;
    // toggleActive();
  } else {
    music.pause();
    isPlay = false;
    // toggleActive();
  }
}

musicSnowElement.addEventListener('click', toggleActive);

function toggleActive(e: any) {
  // musicElement.classList.toggle('music-snow-toggle');
  e.target.classList.toggle('music-snow-toggle');
}

musicElement.addEventListener('click', playMusic);

snowElement.addEventListener('click', () => {
  if (!isSnow) {
    snowTime = setInterval(createSnowFlake, 50);
    isSnow = true;
    localStorage.setItem('snow', isSnow.toString());
  } else {
    clearInterval(snowTime);
    isSnow = false;
    localStorage.setItem('snow', isSnow.toString());
  }
});

// console.log('Music go');

const pickTreeStock = <HTMLElement>document.querySelector('.pick-tree_stock');
const pickBgStock = <HTMLElement>document.querySelector('.pick-bg_stock');
export const pickChosenStock = <HTMLElement>(
  document.querySelector('.pick-chosen_stock')
);
const pickDressedStock = <HTMLElement>(
  document.querySelector('.pick-dressed_stock')
);
const pickTreeCount = 6; // given number of tree types
const pickBgCount = 10; // given number of BG for tree

export function drawTreePage(): void {
  setTimeout(() => {
    drawPickTree();
  }, 100);
  drawPickBg();
  setTree(localStorage.getItem('theTree') || '');
  setBg(localStorage.getItem('bg') || '');
  drawChosenToys();
  drawDressedTree();
}

function drawPickTree(): void {
  pickTreeStock.innerHTML = '';
  for (let i: number = 0; i < pickTreeCount; i++) {
    const treeImg = `<div class="pick-tree_item">
      <img class="pick-tree_item-img" data-tree="${
        i + 1
      }" src="./src/assets/tree/${i + 1}.png" alt="tree-${i + 1}">
    </div>`;

    pickTreeStock.insertAdjacentHTML('beforeend', treeImg);
  }
}
// drawPickTree();
pickTreeStock.addEventListener('click', (e: any) => {
  localStorage.setItem('theTree', e.target.dataset.tree.toString());
  setTree(e.target.getAttribute('data-tree').toString());
  // console.log(e.target.dataset.tree.toString());
});

function drawPickBg(): void {
  pickBgStock.innerHTML = '';
  for (let i: number = 0; i < pickBgCount; i++) {
    const bgImg = `<div class="pick-bg_item">
    <img class="pick-bg_item-img" data-bg="${i + 1}" src="./src/assets/bg/${
      i + 1
    }.jpg" alt="bg-${i + 1}">
    </div>`;

    pickBgStock.insertAdjacentHTML('beforeend', bgImg);
  }
}
// drawPickBg();
pickBgStock.addEventListener('click', (e: any) => {
  localStorage.setItem('bg', e.target.dataset.bg.toString());
  setBg(e.target.getAttribute('data-bg').toString());
  // console.log(e.target.dataset.bg.toString());
});

function drawChosenToys(): void {
  const chosenSetCount = 20; // number of slots in the selected Toys box
  pickChosenStock.innerHTML = '';
  // console.log(chosenSet.length + ' - chosenSet.length');
  // console.log(chosenSet);
  if (chosenSet.length > 0) {
    for (let i: number = 0; i < chosenSetCount; i++) {
      // if Chosen toys less than 20 slots, then no img just BG
      if (i >= chosenSet.length) {
        const chosenToy = `<div class="pick-chosen_item"></div>`;
        pickChosenStock.insertAdjacentHTML('beforeend', chosenToy);
      } else {
        const chosenToy = `<div class="pick-chosen_item">
          <img
            class="pick-chosen_item-img"
            src="./src/assets/toys/${chosenSet[i].num}.png"
            draggable="true"
            alt="chosen-toy-${chosenSet[i].num}"
          />
          <div class="pick-chosen_item-count">${chosenSet[i].count}</div>
        </div>`;
        pickChosenStock.insertAdjacentHTML('beforeend', chosenToy);
      }
    }
    let chosenDragSet = document.querySelectorAll('.pick-chosen_item-img');
    chosenDragSet.forEach((x) => x.addEventListener('dragstart', dragStart));
    chosenDragSet.forEach((x) => x.addEventListener('dragend', dragEnd));

    // console.log(chosenDragSet);
  } else {
    // if there's NO chosen toys - pick first 20 from Data
    for (let i: number = 0; i < chosenSetCount; i++) {
      const chosenToy = `<div class="pick-chosen_item">
        <img
          class="pick-chosen_item-img"
          src="./src/assets/toys/${i + 1}.png"
          draggable="true"
          alt="chosen-toy-${i + 1}"
        />
        <div class="pick-chosen_item-count">${data[i + 1].count}</div>
      </div>`;

      pickChosenStock.insertAdjacentHTML('beforeend', chosenToy);
    }
  }
}
// setTimeout(() => {
//   drawChosenToys(); // still don know how to use Async
// }, 800);

// console.log(chosenSet);

function drawDressedTree(): void {
  pickDressedStock.innerHTML = '';
  for (let i: number = 0; i < pickTreeCount; i++) {
    const dressedTree = `<div class="pick-dressed_item">
      <img
        class="pick-dressed_item-img"
        src="./src/assets/tree/${i + 1}.png"
        alt="tree-1"
      />
    </div>`;

    pickDressedStock.insertAdjacentHTML('beforeend', dressedTree);
  }
}
// drawDressedTree();

// set Tree to the Center
const treeCenterImg = <HTMLElement>document.querySelector('.tree-center-image');
const treeCenter = <HTMLElement>document.querySelector('.tree-center');

export function setTree(tree: string) {
  tree = localStorage.getItem('theTree') || '1';
  treeCenterImg.innerHTML = `<img class="dress-tree" src="./src/assets/tree/${tree}.png" alt="tree-${tree}" />`;
}

export function setBg(bg: string) {
  bg = localStorage.getItem('bg') || '1';
  treeCenterImg.style.background = `url(./src/assets/bg/${bg}.jpg) no-repeat center center`;
}

function createSnowFlake() {
  const snow_flake = document.createElement('i');
  snow_flake.classList.add('snowflake');
  snow_flake.style.left = Math.random() * treeCenter.clientWidth + 'px';
  snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
  snow_flake.style.opacity = Math.random().toString();
  snow_flake.style.width = snow_flake.style.height =
    Math.random() * 12 + 10 + 'px';

  treeCenter.appendChild(snow_flake);

  setTimeout(() => {
    snow_flake.remove();
  }, 5000);
}

// setInterval(createSnowFlake, 50);
