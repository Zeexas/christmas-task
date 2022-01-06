import { stringify } from 'querystring';
import data from './data';
import { filtersSet, searchData, filterRangeSet } from './filter';

let cardsData2: any = data;

// console.log(cardFilter);

class toyCard {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;

  constructor(
    num: string,
    name: string,
    count: string,
    year: string,
    shape: string,
    color: string,
    size: string,
    favorite: boolean
  ) {
    this.num = num;
    this.name = name;
    this.count = count;
    this.year = year;
    this.shape = shape;
    this.color = color;
    this.size = size;
    this.favorite = favorite;
  }
}

const toysStock = <HTMLElement>document.querySelector('.toys-stock-cards');
const noMatchMessage = <HTMLElement>document.querySelector('.no-matches');
export let chosenSet: any = [];

export function getCardsData(): void {
  // check Chosen toys Box
  if (localStorage.getItem('chosenSet')) {
    countChosen = JSON.parse(localStorage.getItem('chosenSet') || '').length;
    countChosenIcon.innerHTML = countChosen.toString();
    chosenNumSet = JSON.parse(localStorage.getItem('chosenSet') || '');
    for (let i: number = 0; i < chosenNumSet.length; i++) {
      chosenSet.push(data[+chosenNumSet[i] - 1]);
    }
    // console.log('set selected from storage data');
    // console.log(chosenSet);
    // chosenSet = JSON.parse(localStorage.getItem('chosenSet') || '');
  }
}
window.addEventListener('load', getCardsData);

const countChosenIcon = <HTMLElement>(
  document.querySelector('.toys-chosen-count')
);
const messageChosen = <HTMLElement>(
  document.querySelector('.toys-chosen-message')
);
const searchBox = <HTMLElement>document.querySelector('.search-box');
let countChosen: number = 0;

const countMin = <HTMLElement>document.querySelector('.count-value_min');
const countMax = <HTMLElement>document.querySelector('.count-value_max');
const yearStart = <HTMLElement>document.querySelector('.year-value_start');
const yearEnd = <HTMLElement>document.querySelector('.year-value_end');

countMin.addEventListener(
  'DOMSubtreeModified',
  () => {
    // console.log(countMin + 'line-1');
    setTimeout(() => {
      drawCard();
    }, 100);
    // console.log(countMin + 'line-2');
  },
  false
);
countMax.addEventListener(
  'DOMSubtreeModified',
  () => {
    // console.log(countMin + 'line-1');
    setTimeout(() => {
      drawCard();
    }, 100);
    // console.log(countMin + 'line-2');
  },
  false
);
yearStart.addEventListener(
  'DOMSubtreeModified',
  () => {
    // console.log(countMin + 'line-1');
    setTimeout(() => {
      drawCard();
    }, 100);
    // console.log(countMin + 'line-2');
  },
  false
);
yearEnd.addEventListener(
  'DOMSubtreeModified',
  () => {
    // console.log(countMin + 'line-1');
    setTimeout(() => {
      drawCard();
    }, 100);
    // console.log(countMin + 'line-2');
  },
  false
);

//  Multiple filter for Array of Objects
const multiFilter = (arr: Object[], filters: any) => {
  const filterKeys = Object.keys(filters);
  return arr.filter((eachObj: any) => {
    return filterKeys.every((eachKey) => {
      if (!filters[eachKey].length) {
        return true; // passing an empty filter means that filter is ignored.
      }
      return filters[eachKey].includes(eachObj[eachKey]);
    });
  });
};

export const filterRange = (
  arr: object[],
  type: string,
  min: string,
  max: string
) => {
  return arr.filter((x: any) => +x[type] >= +min && +x[type] <= +max);
};

// console.log(filterRange(data, 'count', '2', '6'));
// console.log(
//   filterRange(
//     filterRange(
//       multiFilter(data, filtersSet),
//       'count',
//       filterRangeSet['count'][0],
//       filterRangeSet['count'][1]
//     ),
//     'year',
//     filterRangeSet['year'][0],
//     filterRangeSet['year'][1]
//   )
// );

const sortSet = (x: any, y: any) => {
  const sortType: string = localStorage.getItem('sort') || '';
  // console.log(sortType);
  if (sortType === 'name-ascend') {
    if (x.name < y.name) {
      return -1;
    }
    if (x.name > y.name) {
      return 1;
    }
    return 0;
  }
  if (sortType === 'name-descend') {
    if (x.name < y.name) {
      return 1;
    }
    if (x.name > y.name) {
      return -1;
    }
    return 0;
  }
  if (sortType === 'year-ascend') {
    if (+x.year < +y.year) {
      return -1;
    }
    if (+x.year > +y.year) {
      return 1;
    }
    return 0;
  }
  if (sortType === 'year-descend') {
    if (+x.year > +y.year) {
      return -1;
    }
    if (+x.year < +y.year) {
      return 1;
    }
    return 0;
  }
};

export function drawCard(): void {
  // console.log(filterRangeSet['count'][0] + '-' + filterRangeSet['count'][1]);
  toysStock.innerHTML = '';
  cardsData2 = multiFilter(
    filterRange(
      filterRange(
        data,
        'count',
        filterRangeSet['count'][0],
        filterRangeSet['count'][1]
      ),
      'year',
      filterRangeSet['year'][0],
      filterRangeSet['year'][1]
    ),
    filtersSet
  ); // set filtered data before rendering
  const cardsData: any = cardsData2.filter((s: any) =>
    s.name.toLowerCase().includes(searchData)
  );

  let cardFilter: any = cardsData.sort(sortSet);

  if (cardFilter.length === 0) {
    noMatchMessage.classList.remove('hide');
  } else {
    noMatchMessage.classList.add('hide');
  }
  for (let i: number = 0; i < cardFilter.length; i++) {
    const cardItem: string = `<div class="card ${
      chosenNumSet.includes(cardFilter[i].num) ? 'chosen' : ''
    }">
      <div class="card-name">${cardFilter[i].name}</div>
      <img class="card-img" src="./src/assets/toys/${
        cardFilter[i].num
      }.png" alt="${cardFilter[i].name}" />
      <div class="card-description">
        <div class="card-count text-line">Количество: ${
          cardFilter[i].count
        }</div>
        <div class="card-year text-line">Год покупки: ${
          cardFilter[i].year
        } год</div>
        <div class="card-shape text-line">Форма: ${cardFilter[i].shape}</div>
        <div class="card-color text-line">Цвет: ${cardFilter[i].color}</div>
        <div class="card-size text-line">Размер: ${cardFilter[i].size}</div>
        <div class="card-favor text-line">Любимая: ${
          cardFilter[i].favorite ? 'да' : 'нет'
        }</div>
      </div>
    </div>`;

    toysStock.insertAdjacentHTML('beforeend', cardItem);
  }

  const cardsPool = document.querySelectorAll<HTMLElement>('.card');
  for (let i: number = 0; i < cardsPool.length; i++) {
    cardsPool[i].addEventListener('click', (e: any) => {
      // e.currentTarget.classList.toggle('chosen');
      // console.log(e.currentTarget);
      makeChosen(i, e);
    });
  }
}

// console.log(Object.values(chosenSet));
let lockMessage: boolean = false;
let chosenNumSet: any = [];

// get Array of chosen numbers for localstorage
function getChosenNumSet(): void {
  chosenNumSet = [];
  for (let i: number = 0; i < chosenSet.length; i++) {
    chosenNumSet.push(chosenSet[i].num);
  }
}

function makeChosen(i: number, e: any) {
  if (lockMessage) return;
  if (chosenSet.includes(data[i])) {
    chosenSet.splice(chosenSet.indexOf(data[i]), 1);
    countChosen--;
    e.currentTarget.classList.toggle('chosen');
  } else {
    if (countChosen < 20) {
      chosenSet.push(data[i]);
      chosenSet.sort((a: any, b: any) => a.num - b.num);
      countChosen++;
      e.currentTarget.classList.toggle('chosen');
    } else {
      lockMessage = true;
      messageChosen.style.width = 'calc(10vw + 15rem)';
      setTimeout(() => {
        messageChosen.style.visibility = 'visible';
        messageChosen.style.opacity = '1';
        searchBox.style.visibility = 'hidden';
        searchBox.style.opacity = '0';
      }, 300);
      setTimeout(() => {
        messageChosen.style.visibility = 'hidden';
        messageChosen.style.opacity = '0';
        searchBox.style.visibility = 'visible';
        searchBox.style.opacity = '1';
        setTimeout(() => {
          messageChosen.style.width = '0';
        }, 300);
        lockMessage = false;
      }, 2000);
    }
  }

  getChosenNumSet();
  countChosenIcon.innerHTML = countChosen.toString();
  localStorage.setItem('chosenSet', JSON.stringify(chosenNumSet));

  // console.log(countChosen);
  // console.log(chosenSet);
  // console.log(chosenNumSet);
}
