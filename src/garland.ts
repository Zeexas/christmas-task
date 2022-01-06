// garland functionality module

// Set garland to Storage
const colorBtnBox = <HTMLElement>document.querySelector('.garland-btn-box');
const garlandOnTree = <HTMLElement>document.querySelector('.garland-on-tree');

export const garlandToggle: any = document.querySelector('.garland-checkbox');

garlandToggle.addEventListener('input', () => {
  if (garlandToggle.checked === true) {
    garlandOnTree.classList.remove('hide');
    setGarlandOnTree(localStorage.getItem('garlandColor') || 'multicolor');
  } else {
    garlandOnTree.classList.add('hide');
  }
  localStorage.setItem('garlandOn', garlandToggle.checked);
});

colorBtnBox.addEventListener('click', (e: any) => {
  const gColor = e.target.closest('.garland-btn').getAttribute('data-color');
  setGarlandOnTree(gColor);
  garlandToggle.checked = true;
  garlandOnTree.classList.remove('hide');
  // console.log(gColor);
  localStorage.setItem('garlandColor', gColor);
  localStorage.setItem('garlandOn', garlandToggle.checked);
});

export function setGarlandOnTree(color: string) {
  const garlandMarkup: string = `<svg class="garland light-1">
    <circle cx="350" cy="170" r="3" class="${color} type-red" />
    <circle cx="365" cy="178" r="3" class="${color} type-blue" />
    <circle cx="380" cy="180" r="3" class="${color} type-yellow" />
    <circle cx="395" cy="177" r="3" class="${color} type-green" />
    <circle cx="410" cy="170" r="3" class="${color} type-red" />
  </svg>
  <svg class="garland light-2">
    <circle cx="330" cy="230" r="3" class="${color} type-yellow" />
    <circle cx="347" cy="239" r="3" class="${color} type-green" />
    <circle cx="364" cy="244" r="3" class="${color} type-red" />
    <circle cx="380" cy="245" r="3" class="${color} type-blue" />
    <circle cx="397" cy="244" r="3" class="${color} type-yellow" />
    <circle cx="414" cy="239" r="3" class="${color} type-green" />
    <circle cx="430" cy="230" r="3" class="${color} type-red" />
  </svg>
  <svg class="garland light-3">
    <circle cx="314" cy="290" r="3" class="${color} type-green" />
    <circle cx="330" cy="300" r="3" class="${color} type-red" />
    <circle cx="347" cy="306" r="3" class="${color} type-blue" />
    <circle cx="364" cy="310" r="3" class="${color} type-yellow" />
    <circle cx="380" cy="312" r="3" class="${color} type-green" />
    <circle cx="397" cy="310" r="3" class="${color} type-red" />
    <circle cx="414" cy="306" r="3" class="${color} type-blue" />
    <circle cx="430" cy="300" r="3" class="${color} type-yellow" />
    <circle cx="446" cy="290" r="3" class="${color} type-green" />
  </svg>
  <svg class="garland light-4">
    <circle cx="300" cy="350" r="3" class="${color} type-red" />
    <circle cx="314" cy="362" r="3" class="${color} type-blue" />
    <circle cx="330" cy="370" r="3" class="${color} type-yellow" />
    <circle cx="347" cy="376" r="3" class="${color} type-green" />
    <circle cx="364" cy="380" r="3" class="${color} type-red" />
    <circle cx="380" cy="382" r="3" class="${color} type-blue" />
    <circle cx="397" cy="380" r="3" class="${color} type-yellow" />
    <circle cx="414" cy="376" r="3" class="${color} type-green" />
    <circle cx="430" cy="370" r="3" class="${color} type-red" />
    <circle cx="446" cy="362" r="3" class="${color} type-blue" />
    <circle cx="460" cy="350" r="3" class="${color} type-yellow" />
  </svg>
  <svg class="garland light-5">
    <circle cx="285" cy="420" r="3" class="${color} type-blue" />
    <circle cx="300" cy="430" r="3" class="${color} type-yellow" />
    <circle cx="314" cy="438" r="3" class="${color} type-green" />
    <circle cx="330" cy="447" r="3" class="${color} type-red" />
    <circle cx="347" cy="452" r="3" class="${color} type-blue" />
    <circle cx="364" cy="454" r="3" class="${color} type-yellow" />
    <circle cx="380" cy="455" r="3" class="${color} type-green" />
    <circle cx="397" cy="454" r="3" class="${color} type-red" />
    <circle cx="414" cy="452" r="3" class="${color} type-blue" />
    <circle cx="430" cy="447" r="3" class="${color} type-yellow" />
    <circle cx="446" cy="438" r="3" class="${color} type-green" />
    <circle cx="460" cy="430" r="3" class="${color} type-red" />
    <circle cx="475" cy="420" r="3" class="${color} type-blue" />
  </svg>
  <svg class="garland light-6">
    <circle cx="270" cy="495" r="3" class="${color} type-yellow" />
    <circle cx="285" cy="504" r="3" class="${color} type-green" />
    <circle cx="300" cy="510" r="3" class="${color} type-red" />
    <circle cx="314" cy="515" r="3" class="${color} type-blue" />
    <circle cx="330" cy="519" r="3" class="${color} type-yellow" />
    <circle cx="347" cy="522" r="3" class="${color} type-green" />
    <circle cx="364" cy="524" r="3" class="${color} type-red" />
    <circle cx="380" cy="525" r="3" class="${color} type-blue" />
    <circle cx="397" cy="524" r="3" class="${color} type-yellow" />
    <circle cx="414" cy="522" r="3" class="${color} type-green" />
    <circle cx="430" cy="519" r="3" class="${color} type-red" />
    <circle cx="446" cy="515" r="3" class="${color} type-blue" />
    <circle cx="460" cy="510" r="3" class="${color} type-yellow" />
    <circle cx="475" cy="504" r="3" class="${color} type-green" />
    <circle cx="490" cy="495" r="3" class="${color} type-red" />
  </svg>
  <svg class="garland light-7">
    <circle cx="250" cy="565" r="3" class="${color} type-red" />
    <circle cx="270" cy="574" r="3" class="${color} type-blue" />
    <circle cx="285" cy="580" r="3" class="${color} type-yellow" />
    <circle cx="300" cy="586" r="3" class="${color} type-green" />
    <circle cx="314" cy="590" r="3" class="${color} type-red" />
    <circle cx="330" cy="595" r="3" class="${color} type-blue" />
    <circle cx="347" cy="598" r="3" class="${color} type-yellow" />
    <circle cx="364" cy="599" r="3" class="${color} type-green" />
    <circle cx="380" cy="600" r="3" class="${color} type-red" />
    <circle cx="397" cy="599" r="3" class="${color} type-blue" />
    <circle cx="414" cy="598" r="3" class="${color} type-yellow" />
    <circle cx="430" cy="595" r="3" class="${color} type-green" />
    <circle cx="446" cy="590" r="3" class="${color} type-red" />
    <circle cx="460" cy="586" r="3" class="${color} type-blue" />
    <circle cx="475" cy="580" r="3" class="${color} type-yellow" />
    <circle cx="490" cy="574" r="3" class="${color} type-green" />
    <circle cx="510" cy="565" r="3" class="${color} type-red" />
  </svg>`;
  garlandOnTree.innerHTML = garlandMarkup;
}

export function getGarlandData(): void {
  if (localStorage.getItem('garlandOn') === 'true') {
    garlandOnTree.classList.remove('hide');
    if (localStorage.getItem('garlandColor')) {
      setGarlandOnTree(localStorage.getItem('garlandColor') || '');
    } else {
      setGarlandOnTree('red');
    }
  } else {
    garlandOnTree.classList.add('hide');
  }
}

// window.addEventListener('load', getGarlandData);
