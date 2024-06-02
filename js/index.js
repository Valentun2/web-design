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
  itemsText.forEach(el => el.children[0].classList.remove('is-active'));
  itemsText.forEach(el => el.children[1].classList.remove('is-active'));

  itemsText[e.target.id - 1].classList.remove('item-hidden');
  itemsText[e.target.id - 1].children[0].classList.add('is-active');
  itemsText[e.target.id - 1].children[1].classList.add('is-active');

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
  const id = e.target.id || e.target.parentElement.id;
  if (e.target.nodeName === 'use') {
    svgMinus[id - 1].classList.toggle('is-hidden');
    plusSvg[id - 1].classList.toggle('is-hidden');
    return;
  }
  svgMinus[id - 1].classList.toggle('is-hidden');
  plusSvg[id - 1].classList.toggle('is-hidden');
  if (answerText[id - 1].style.maxHeight) {
    answerText.forEach(el => (el.style.maxHeight = null));
  } else {
    answerText.forEach(el => (el.style.maxHeight = null));
    answerText[id - 1].style.maxHeight = answerText[id - 1].scrollHeight + 'px';
  }
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

// ============================  MOUSE   =========================================

const links = document.querySelectorAll('.js-cursor-hover');
const span = document.querySelectorAll('.js-hover-mouse');

console.log(span);
links.forEach(link => link.addEventListener('mousemove', handleMouseMove));

let mouseX;
let mouseY;
let containerMouseX = 0;
let containerMouseY = 0;
let containerMouse;

let prev;
let animationFrameId;

let isMoving = false;
function handleMouseMove(e) {
  if (prev !== e.target) {
    isMoving = false;
    cancelAnimationFrame(animationFrameId);
  }
  prev = e.target;
  const container = e.target.getBoundingClientRect();
  mouseX = e.clientX - container.left;
  mouseY = e.clientY - container.top;
  containerMouse = e.target.children[3];
  if (!isMoving) {
    containerMouseX = mouseX - containerMouse.offsetWidth / 2;
    containerMouseY = mouseY - containerMouse.offsetHeight / 2;
    containerMouse.style.left = containerMouseX + 'px';
    containerMouse.style.top = containerMouseY + 'px';
    moveMouse();
  }
}

function moveMouse() {
  isMoving = true;

  const distanceX = mouseX - containerMouseX;
  const distanceY = mouseY - containerMouseY;
  const spanWidth = containerMouse.offsetWidth;
  const spanHeight = containerMouse.offsetHeight;
  containerMouseX += (distanceX - spanWidth / 2) * 0.08;
  containerMouseY += (distanceY - spanHeight / 2) * 0.08;

  containerMouse.style.left = containerMouseX + 'px';
  containerMouse.style.top = containerMouseY + 'px';

  if (Math.abs(distanceX) > 1 || Math.abs(distanceY) > 1) {
    animationFrameId = requestAnimationFrame(moveMouse);
  } else {
    isMoving = false;
  }
}

//  ЛІЧИЛЬНИК

const numbers = document.querySelectorAll('.js-number');
function counters() {
  let oldValueMouth = numbers[0].innerText;
  let valueMouth = 1;
  numbers[0].innerHTML = valueMouth;
  const counterMouth = setInterval(() => {
    if (valueMouth >= oldValueMouth) {
      clearInterval(counterMouth);
      return;
    }
    valueMouth += 1;
    numbers[0].innerHTML = valueMouth;
  }, 300);

  let oldValue = numbers[1].innerText;
  let newValue = oldValue.slice(0, oldValue.length - 1);
  let valueProgects = 0;
  const counter = setInterval(() => {
    if (valueProgects >= newValue) {
      clearInterval(counter);
      return;
    }
    valueProgects += 1;
    numbers[1].innerHTML = `${valueProgects}<span>+</span>`;
  }, 50);

  let oldValueExperts = numbers[2].innerText;
  let valueExperts = 0;
  const counterExperts = setInterval(() => {
    if (valueExperts >= oldValueExperts) {
      clearInterval(counterExperts);
      return;
    }
    valueExperts += 1;
    numbers[2].innerHTML = valueExperts;
  }, 100);
}
// OBSERVER

const target = document.querySelector('.js-figures-section');

const options = {
  rootMargin: '300px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(hanglerload, options);
observer.observe(target);
function hanglerload(entries) {
  entries.forEach(({ isIntersecting }) => {
    if (isIntersecting) {
      counters();
      observer.unobserve(target);
    }
  });
}

// ===================
