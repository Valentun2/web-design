const heroButtons = document.querySelectorAll('.js-hero-button');

const windowInnerWidth = window.innerWidth;

function windowWidth() {
  heroButtons.forEach(btn => btn.removeAttribute('hidden', 'false'));
  if (windowInnerWidth <= 1024) {
    heroButtons[1].setAttribute('hidden', 'true');
    return;
  }
  heroButtons[0].setAttribute('hidden', 'true');
}

windowWidth();

const listStagesItems = document.querySelector('.js-text-container');

const stagesList = document.querySelector('.js-stages__list');

stagesList.addEventListener('click', handleClick);

function handleClick(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const items = [...e.target.parentElement.children];
  const itemsText = [...listStagesItems.children];
  items.forEach(el => el.classList.remove('is-active'));
  itemsText.forEach(el => el.classList.add('item-hidden'));
  itemsText[e.target.id - 1].classList.remove('item-hidden');
  e.target.classList.add('is-active');
}

const svgContainer = document.querySelectorAll('.js-container-svg');
const plusSvg = document.querySelectorAll('.js-svg__button');
const answerText = document.querySelectorAll('.js-question__text');
const svgMinus = document.querySelectorAll('.js-svg__button-minus');

svgContainer.forEach(el => {
  el.addEventListener('click', addTextAnswer);
});

function addTextAnswer(e) {
  console.log(answerText);
  const id = e.target.id || e.target.parentElement.id;
  answerText[id - 1].classList.toggle('hidden');

  if (e.target.nodeName === 'use') {
    svgMinus[id - 1].classList.toggle('is-hidden');
    plusSvg[id - 1].classList.toggle('is-hidden');
    return;
  }
  svgMinus[id - 1].classList.toggle('is-hidden');
  plusSvg[id - 1].classList.toggle('is-hidden');
}

const casesContainer = document.querySelector('.js-cases__list');
const buttonLoadMore = document.querySelector('.js-cases__button');

buttonLoadMore.addEventListener('click', handleButtonLoadMore);

function changeInnerWidth() {
  if (windowInnerWidth < 768) {
    casesContainer.classList.add('hidden-cases');
  }
}

changeInnerWidth();

function handleButtonLoadMore() {
  casesContainer.classList.remove('hidden-cases');
  buttonLoadMore.setAttribute('hidden', 'true');
  buttonLoadMore.removeEventListener('click', handleButtonLoadMore);
}

const links = document.querySelectorAll('.js-cursor-hover');
const span = document.querySelectorAll('.js-hover-mouse');

console.log(span);
links.forEach(link => link.addEventListener('mousemove', handleMouseMove));

let x;
let y;
function handleMouseMove(e) {
  const container = e.target.getBoundingClientRect();
  console.log(container);
  const x = e.clientX - container.left;
  const y = e.clientY - container.top;

  const spanWidth = e.target.children[3].offsetWidth;
  const spanHeight = e.target.children[3].offsetHeight;

  let newX = x - spanWidth / 2;
  let newY = y - spanHeight / 2;

  e.target.children[3].style.left = newX + 'px';
  e.target.children[3].style.top = newY + 'px';

  console.log(`Mouse: (${x}, ${y})`);
}
