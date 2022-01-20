'use strict';

// ELEMENTS
const navMobile = document.querySelector('.nav');
const buttonMenu = document.querySelector('.menu-button');
const iconMenu = document.querySelector('.menu-icon');
const overlay = document.querySelector('.overlay');
const observer = document.querySelector('.observer');
const btnUp = document.querySelector('.btn-up');
const header = document.querySelector('.header');
const subMenu = document.querySelector('.sub-menu');

// FUNCTIONS
const menuToggle = () => {
  // SHOW MENU BAR
  navMobile.classList.toggle('nav--active');
  // SHOW ICON TRANSITION
  iconMenu.classList.toggle('menu-icon--active');
  // SHOW OVERLAY
  overlay.classList.toggle('overlay--active');
};

if (observer) {
  const opts = {
    root: null,
    threshold: 0,
  };
  const cb = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      btnUp.classList.add('btn-up--active');
      header.classList.add('header--active');
      subMenu.style.top = '76px';
    } else {
      btnUp.classList.remove('btn-up--active');
      header.classList.remove('header--active');
      subMenu.style.top = '115px';
    }
  };
  const bannerObserver = new IntersectionObserver(cb, opts);
  bannerObserver.observe(observer);
}

// EVENTS HANDLERS
buttonMenu.addEventListener('click', menuToggle);

window.addEventListener('scroll', (e) => {
  if (e.isTrusted && navMobile.classList.contains('nav--active')) menuToggle();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMobile.classList.contains('nav--active')) menuToggle();
});

btnUp.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});
