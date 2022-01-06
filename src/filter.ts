// Sort and Filters here
import data from './data';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { drawCard, getCardsData } from './cards';

export let filtersSet: any = {
  // shape: ['шар', 'шишка'],
  // color: ['красный'],
};

function setFilterSet() {
  localStorage.setItem('filterSet', JSON.stringify(filtersSet));
}

window.addEventListener('beforeunload', setFilterSet);

function getFilterSet() {
  filtersSet = JSON.parse(localStorage.getItem('filterSet') || '');
  // check Sort condition
  if (localStorage.getItem('sort')) {
    sortSelect.value = localStorage.getItem('sort') || '';
  }
  // console.log(filtersSet);
}

window.addEventListener('DOMContentLoaded', getFilterSet);

//  Search functionality
const search = <HTMLInputElement>document.querySelector('.search');
const searchCross = <HTMLInputElement>document.querySelector('.search-cross');
export let searchData = '';

search.addEventListener('input', searchInstant);

function searchInstant(e: any) {
  searchData = e.target.value;
  drawCard();
  searchData.length !== 0
    ? searchCross.classList.remove('hide')
    : searchCross.classList.add('hide');
}

searchCross.addEventListener('click', clearSearchField);

function clearSearchField() {
  searchData = '';
  search.value = '';
  search.focus();
  searchCross.classList.add('hide');
  drawCard();
}

/*   Count and year Slider   */
const sliderCount: any = document.getElementById('count-slider');
const sliderYear: any = document.getElementById('year-slider');
const countValue = [
  <HTMLElement>document.querySelector('.count-value_min'),
  <HTMLElement>document.querySelector('.count-value_max'),
];
const yearValue = [
  <HTMLElement>document.querySelector('.year-value_start'),
  <HTMLElement>document.querySelector('.year-value_end'),
];
export let filterRangeSet: any = {
  count: ['1', '12'],
  year: ['1940', '2020'],
};

noUiSlider.create(sliderCount, {
  start: [
    localStorage.getItem('countMin') || '1',
    localStorage.getItem('countMax') || '12',
  ],
  connect: true,
  step: 1,
  range: {
    min: 1,
    max: 12,
  },
  format: {
    from: (value: string) => {
      return parseInt(value);
    },
    to: (value: any) => {
      return parseInt(value);
    },
  },
});

//// Check incorrect value of the SLider

sliderCount.noUiSlider.on('update', (values: object, handle: number) => {
  countValue[handle].innerHTML = values[handle as keyof typeof values];
  // console.log(values[handle as keyof typeof values]);
  localStorage.setItem('countMin', sliderCount.noUiSlider.get()[0]);
  localStorage.setItem('countMax', sliderCount.noUiSlider.get()[1]);

  filterRangeSet.count = [
    sliderCount.noUiSlider.get()[0],
    sliderCount.noUiSlider.get()[1],
  ];
});

noUiSlider.create(sliderYear, {
  start: [
    localStorage.getItem('yearStart') || '1940',
    localStorage.getItem('yearEnd') || '2020',
  ],
  connect: true,
  step: 10,
  range: {
    min: 1940,
    max: 2020,
  },
  format: {
    from: (value: string) => {
      return parseInt(value);
    },
    to: (value: any) => {
      return parseInt(value);
    },
  },
});

sliderYear.noUiSlider.on('update', (values: object, handle: number) => {
  yearValue[handle].innerHTML = values[handle as keyof typeof values];

  localStorage.setItem('yearStart', sliderYear.noUiSlider.get()[0]);
  localStorage.setItem('yearEnd', sliderYear.noUiSlider.get()[1]);
  filterRangeSet.year = [
    sliderYear.noUiSlider.get()[0],
    sliderYear.noUiSlider.get()[1],
  ];
});

// Toys Filters
let countSet: any = [];
let yearSet: any = [];
let shapeSet: any = [];
let colorSet: any = [];
let sizeSet: any = [];
let favoriteSet: any = [];

/*  Slider filter  */
// sliderCount.noUiSlider.on('update', () => {
//   localStorage.setItem('countMin', sliderCount.noUiSlider.get()[0]);
//   localStorage.setItem('countMax', sliderCount.noUiSlider.get()[1]);
//   console.log(localStorage.getItem('countMin') + ' - Storage');
//   filterRangeSet.count = [
//     sliderCount.noUiSlider.get()[0],
//     sliderCount.noUiSlider.get()[1],
//   ];
//   setTimeout(() => {}, 300);
//   // console.log(sliderCount);
// });

function checkMe() {
  console.log('Hey there');
}

// sliderYear.noUiSlider.on('update', () => {
//   localStorage.setItem('yearStart', sliderYear.noUiSlider.get()[0]);
//   localStorage.setItem('yearEnd', sliderYear.noUiSlider.get()[1]);
//   filterRangeSet.year = [
//     sliderYear.noUiSlider.get()[0],
//     sliderYear.noUiSlider.get()[1],
//   ];
//   // console.log('Year');
//   // console.log(filterRangeSet.year);
// });

/*  Shape filter  */
export const checkBell: any = document.querySelector('.check-bell');
export const checkBall: any = document.querySelector('.check-ball');
export const checkCone: any = document.querySelector('.check-cone');
export const checkSnowflake: any = document.querySelector('.check-snowflake');
export const checkToy: any = document.querySelector('.check-toy');

checkBell.addEventListener('input', () => {
  localStorage.setItem('bell', checkBell.checked);
  if (checkBell.checked) {
    shapeSet.push('колокольчик');
    filtersSet.shape = shapeSet;
  } else {
    shapeSet.splice(shapeSet.indexOf('колокольчик'), 1);
    filtersSet.shape = shapeSet;
  }
  drawCard();
});
checkBall.addEventListener('input', () => {
  localStorage.setItem('ball', checkBall.checked);
  if (checkBall.checked) {
    shapeSet.push('шар');
    filtersSet.shape = shapeSet;
  } else {
    shapeSet.splice(shapeSet.indexOf('шар'), 1);
    filtersSet.shape = shapeSet;
  }
  drawCard();
});
checkCone.addEventListener('input', () => {
  localStorage.setItem('cone', checkCone.checked);
  if (checkCone.checked) {
    shapeSet.push('шишка');
    filtersSet.shape = shapeSet;
  } else {
    shapeSet.splice(shapeSet.indexOf('шишка'), 1);
    filtersSet.shape = shapeSet;
  }
  drawCard();
});
checkSnowflake.addEventListener('input', () => {
  localStorage.setItem('snowflake', checkSnowflake.checked);
  if (checkSnowflake.checked) {
    shapeSet.push('снежинка');
    filtersSet.shape = shapeSet;
  } else {
    shapeSet.splice(shapeSet.indexOf('снежинка'), 1);
    filtersSet.shape = shapeSet;
  }
  drawCard();
});
checkToy.addEventListener('input', () => {
  localStorage.setItem('toy', checkToy.checked);
  if (checkToy.checked) {
    shapeSet.push('фигурка');
    filtersSet.shape = shapeSet;
  } else {
    shapeSet.splice(shapeSet.indexOf('фигурка'), 1);
    filtersSet.shape = shapeSet;
  }
  drawCard();
});

/*  Color filter  */
export const checkWhite: any = document.querySelector('.check-white');
export const checkYellow: any = document.querySelector('.check-yellow');
export const checkRed: any = document.querySelector('.check-red');
export const checkBlue: any = document.querySelector('.check-blue');
export const checkGreen: any = document.querySelector('.check-green');

checkWhite.addEventListener('input', () => {
  localStorage.setItem('white', checkWhite.checked);
  if (checkWhite.checked) {
    colorSet.push('белый');
    filtersSet.color = colorSet;
  } else {
    colorSet.splice(colorSet.indexOf('белый'), 1);
    filtersSet.color = colorSet;
  }
  drawCard();
});
checkYellow.addEventListener('input', () => {
  localStorage.setItem('yellow', checkYellow.checked);
  if (checkYellow.checked) {
    colorSet.push('желтый');
    filtersSet.color = colorSet;
  } else {
    colorSet.splice(colorSet.indexOf('желтый'), 1);
    filtersSet.color = colorSet;
  }
  drawCard();
});
checkRed.addEventListener('input', () => {
  localStorage.setItem('red', checkRed.checked);
  if (checkRed.checked) {
    colorSet.push('красный');
    filtersSet.color = colorSet;
  } else {
    colorSet.splice(colorSet.indexOf('красный'), 1);
    filtersSet.color = colorSet;
  }
  drawCard();
});
checkBlue.addEventListener('input', () => {
  localStorage.setItem('blue', checkBlue.checked);
  if (checkBlue.checked) {
    colorSet.push('синий');
    filtersSet.color = colorSet;
  } else {
    colorSet.splice(colorSet.indexOf('синий'), 1);
    filtersSet.color = colorSet;
  }
  drawCard();
});
checkGreen.addEventListener('input', () => {
  localStorage.setItem('green', checkGreen.checked);
  if (checkGreen.checked) {
    colorSet.push('зелёный');
    filtersSet.color = colorSet;
  } else {
    colorSet.splice(colorSet.indexOf('зелёный'), 1);
    filtersSet.color = colorSet;
  }
  drawCard();
});

/*  Size filter  */
export const checkBig: any = document.querySelector('.check-big');
export const checkMedium: any = document.querySelector('.check-medium');
export const checkSmall: any = document.querySelector('.check-small');

checkBig.addEventListener('input', () => {
  localStorage.setItem('big', checkBig.checked);
  if (checkBig.checked) {
    sizeSet.push('большой');
    filtersSet.size = sizeSet;
  } else {
    sizeSet.splice(sizeSet.indexOf('большой'), 1);
    filtersSet.size = sizeSet;
  }
  drawCard();
});
checkMedium.addEventListener('input', () => {
  localStorage.setItem('medium', checkMedium.checked);
  if (checkMedium.checked) {
    sizeSet.push('средний');
    filtersSet.size = sizeSet;
  } else {
    sizeSet.splice(sizeSet.indexOf('средний'), 1);
    filtersSet.size = sizeSet;
  }
  drawCard();
});
checkSmall.addEventListener('input', () => {
  localStorage.setItem('small', checkSmall.checked);
  if (checkSmall.checked) {
    sizeSet.push('малый');
    filtersSet.size = sizeSet;
  } else {
    sizeSet.splice(sizeSet.indexOf('малый'), 1);
    filtersSet.size = sizeSet;
  }
  drawCard();
});

/*  Favor filter  */
export const checkFavor: any = document.querySelector('.check-favor');

checkFavor.addEventListener('input', () => {
  localStorage.setItem('favor', checkFavor.checked);
  if (checkFavor.checked) {
    favoriteSet = [true];
    filtersSet.favorite = favoriteSet;
  } else {
    favoriteSet = [];
    filtersSet.favorite = favoriteSet;
  }
  drawCard();
});

// Sort functionality
export const sortSelect: any = document.querySelector('.sort-select');

sortSelect.addEventListener('input', () => {
  localStorage.setItem('sort', sortSelect.value);
  drawCard();
});

// console.log(sortSelect.value);

// Clear filters Button
const noFilter = document.querySelector('.no-filter');
const noSettings = document.querySelector('.no-settings');

noFilter?.addEventListener('click', clearFilters);
noSettings?.addEventListener('click', clearSettings);

function clearSettings() {
  sortSelect.selectedIndex = 0;
  clearFilters();
  localStorage.clear();
  // getCardsData();
  // drawCard();
}

function clearFilters() {
  // clear Shape condition and storage
  checkBell.checked = false;
  checkBall.checked = false;
  checkCone.checked = false;
  checkSnowflake.checked = false;
  checkToy.checked = false;
  localStorage.setItem('bell', 'false');
  localStorage.setItem('ball', 'false');
  localStorage.setItem('cone', 'false');
  localStorage.setItem('snowflake', 'false');
  localStorage.setItem('toy', 'false');
  // clear Color condition and storage
  checkWhite.checked = false;
  checkYellow.checked = false;
  checkRed.checked = false;
  checkBlue.checked = false;
  checkGreen.checked = false;
  localStorage.setItem('white', 'false');
  localStorage.setItem('yellow', 'false');
  localStorage.setItem('red', 'false');
  localStorage.setItem('blue', 'false');
  localStorage.setItem('green', 'false');
  // clear Size condition and storage
  checkBig.checked = false;
  checkMedium.checked = false;
  checkSmall.checked = false;
  localStorage.setItem('big', 'false');
  localStorage.setItem('medium', 'false');
  localStorage.setItem('small', 'false');
  // clear Favorite condition and storage
  checkFavor.checked = false;
  localStorage.setItem('favor', 'false');
  // clear Count slider condition and storage
  sliderCount.noUiSlider.set([1, 12]);
  localStorage.setItem('countMin', '1');
  localStorage.setItem('countMax', '12');
  // clear Year slider condition and storage
  sliderYear.noUiSlider.set([1940, 2020]);
  localStorage.setItem('yearStart', '1940');
  localStorage.setItem('yearEnd', '2020');

  filtersSet = {};
  shapeSet = [];
  colorSet = [];
  sizeSet = [];
  favoriteSet = [];

  drawCard();
  // console.log('No filter');
}
