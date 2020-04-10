const CLASS_ACTIVE = 'active';
const SELECTOR_CLASS_ACTIVE = `.${CLASS_ACTIVE}`;
const SELECTOR_ALL_DIVS = 'body > div';

let tweenSpeed = 500;
let slideCount = null;
let slideArray = null;
let divIndex = 0;
let divOpacity = 0;
let root = document.documentElement;
let timer = null;

function handleSubmit(e) {
  e.preventDefault();
  stopTimer();
  tweenSpeed = document.querySelector('#speed').value;
  setSpeed();
  setOpacity();
  createTimer();
}

function setOpacity() {
  root.style.setProperty('--div-opacity', document.querySelector('#opacity').value) || 0;
}

function setSpeed() {
  root.style.setProperty('--speed', `${tweenSpeed / 1000}s` || '0.5s');
}

function createTimer() {
  timer = window.setInterval(nextSlide, tweenSpeed);
}

function stopTimer() {
  window.clearInterval(timer);
}

function setup() {
  slideArray = document.querySelectorAll(SELECTOR_ALL_DIVS);
  slideCount = slideArray.length;
  setOpacity();

  document.addEventListener('submit', handleSubmit);
}

function showNextSlide(index) {
  slideArray[index].classList.add(CLASS_ACTIVE);
}

function hideCurrentSlide() {
  let activeDiv = document.querySelector(SELECTOR_CLASS_ACTIVE);
  if (activeDiv) activeDiv.classList.remove(CLASS_ACTIVE);
}

function nextSlide() {
  root.style.setProperty('--current-slide', divIndex);
  hideCurrentSlide();
  showNextSlide(divIndex);
  divIndex++;
  if (divIndex == slideCount) divIndex = 0;
}

setup();

