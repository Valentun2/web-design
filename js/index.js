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

const svgContainer = document.querySelectorAll('.faq__item');
const plusSvg = document.querySelectorAll('.js-svg__button');
const answerText = document.querySelectorAll('.js-question__text');
const svgMinus = document.querySelectorAll('.js-svg__button-minus');

svgContainer.forEach(el => {
  el.addEventListener('click', addTextAnswer);
});

function addTextAnswer(e) {
  const id = e.target.id;
  console.log(e.target);
  svgMinus[id - 1].classList.toggle('is-hidden');
  plusSvg[id - 1].classList.toggle('is-hidden');

  if (answerText[id - 1].style.maxHeight) {
    answerText[id - 1].classList.toggle('is-visible');
    answerText[id - 1].style.maxHeight = null;
  } else {
    answerText[id - 1].classList.toggle('is-visible');

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
// const span = document.querySelectorAll('.js-hover-mouse');

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
  rootMargin: '200px',
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

const technologiesDeckItems = document.querySelectorAll(
  '.js-technologies__desc-item'
);
let prevS = technologiesDeckItems[0];
prevS.style.bottom = '0px';

const cards = document.querySelectorAll('.js-technologies__item-card');
cards.forEach(card => {
  card.addEventListener('click', cardClick);
});

function cardClick(e) {
  cards.forEach(card => {
    card.classList.remove('is-active');
  });
  // prevS.classList.add('prev');
  technologiesDeckItems.forEach(item => {
    item.classList.remove('is-visible');
    item.classList.remove('next');
    // item.classList.remove('prev');
    console.dir(item.scrollHeight);
    if (item.dataset.id === e.target.dataset.id) {
      item.style.bottom = prevS.scrollHeight - item.scrollHeight + 'px';
      e.target.classList.add('is-active');
      item.classList.add('is-visible');
      item.classList.add('next');
      setTimeout(() => {
        prevS.style.bottom = item.scrollHeight - prevS.scrollHeight + 'px';
        item.style.bottom = '0px';

        prevS = item;
      }, 0);
    }
    // prevS.style.bottom = '0px';
    // prevS.classList.add('prev');
  });
  // prevTechnologi.classList.add('prev');

  // prevTechnologi = locPrev;
}

// ================

// ==============  TEAM  ====================

const modalContent = document.querySelector('.team-modal');

const main = document.querySelector('main');
const closeModal = document.querySelector('.js-close-button');
const modalContainer = document.querySelector('.backdrop');
const teamCards = document.querySelectorAll('.js-team__item');
const listCardsModal = document.querySelector('.js-modal');
modalContainer.addEventListener('click', e => {
  if (e.target.nodeName === 'DIV') {
    modalContent.classList.remove('is-visible');

    e.target.classList.add('is-hidden');
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
  }
});
teamCards.forEach(card => card.addEventListener('click', handleClickTeamCard));

function handleClickTeamCard(e) {
  [...listCardsModal.children].forEach(item => {
    item.classList.remove('is-visible');
  });
  modalContainer.classList.remove('is-hidden');
  listCardsModal.children[e.target.dataset.id - 1].classList.add('is-visible');
  modalContent.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = '17px';
}

closeModal.addEventListener('click', () => {
  modalContent.classList.remove('is-visible');

  document.body.style.overflow = '';
  document.body.style.marginRight = '0px';

  modalContainer.classList.add('is-hidden');
});

// =================   ================

const section = document.querySelector('.js-technologies-section');
const cursor = document.querySelector('.js-technologies-cursor');
section.addEventListener('mousemove', handleMouseTechnologies);

// let mouseTechnologiesX;
// let mouseTechnologiesY;
// let containerTechnologiesMouseX = 0;
// let containerTechnologiesMouseY = 0;

let prevTime = 0;
const threshold = 5;
let prevMouseX = 0;
let prevMouseY = 0;
const thresholdY = cursor.offsetHeight / 2;

function handleMouseTechnologies(e) {
  // console.dir(cursor.offsetWidth / 1.1);
  const container = section.getBoundingClientRect();
  const mouseX = e.clientX - container.left;
  const mouseY = e.clientY - container.top;
  if (mouseX - prevMouseX > cursor.offsetWidth / 1.2) {
    if (mouseX - prevMouseX > cursor.offsetHeight / 1.15) {
      createElement(cursor.style.left, cursor.style.top);
      cursor.style.left = prevMouseX + cursor.offsetWidth + 'px';
    } else {
      cursor.style.left = prevMouseX + cursor.offsetWidth / 2 + 'px';
    }
    prevMouseX = mouseX;
  } else if (mouseX - prevMouseX < 0) {
    if (mouseX - prevMouseX < -8) {
      createElement(cursor.style.left, cursor.style.top);
      cursor.style.left = prevMouseX - cursor.offsetWidth + 'px';
    } else {
      cursor.style.left = prevMouseX - cursor.offsetWidth / 2 + 'px';
    }
    prevMouseX = mouseX - cursor.offsetWidth / 2;
  }
  if (mouseY - prevMouseY > cursor.offsetHeight / 1.2) {
    if (mouseY - prevMouseY > cursor.offsetHeight / 1.15) {
      createElement(cursor.style.left, cursor.style.top);

      cursor.style.top = prevMouseY + cursor.offsetHeight + 'px';
    } else {
      cursor.style.top = prevMouseY + cursor.offsetHeight / 2 + 'px';
    }
    prevMouseY = mouseY;
    // createElement(mouseY, mouseY);
  } else if (mouseY - prevMouseY < 0) {
    if (mouseY - prevMouseY < -8) {
      createElement(cursor.style.left, cursor.style.top);

      cursor.style.top = prevMouseY - cursor.offsetHeight + 'px';
    } else {
      cursor.style.top = prevMouseY - cursor.offsetHeight / 2 + 'px';
    }

    // cursor.style.top = mouseY - cursor.offsetHeight / 2 + 'px';
    prevMouseY = mouseY - cursor.offsetHeight / 2;
  }
}

function createElement(x, y) {
  const trail = document.createElement('div');
  trail.classList.add('technologies-cursor');
  trail.style.left = x;
  trail.style.top = y;
  trail.style.opacity = '1';

  trail.style.transition = 'opacity 0.5s linear';

  section.insertAdjacentElement('beforeend', trail);

  setTimeout(() => {
    trail.style.opacity = '0';
  }, 200);

  setTimeout(() => {
    trail.remove();
  }, 300);
}
