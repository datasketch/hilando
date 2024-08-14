'use strict';

// ELEMENTS
const navMobile = document.querySelector('.nav');
const buttonMenu = document.querySelector('.menu-button');
const iconMenu = document.querySelector('.menu-icon');
const overlay = document.querySelector('.overlay');
const observer = document.querySelector('.observer');
const btnUp = document.querySelector('.btn-up');
const header = document.querySelector('.header');
const subMenuList = document.querySelectorAll('.sub-menu-list');
const subMenu2 = document.querySelectorAll('.sub-menu-2');
const subMenuIcon = document.querySelectorAll('.sub-menu-icon');
const subMenuButton = document.querySelectorAll('.sub-menu-button');
const subMenuItems = document.querySelectorAll('.sub-menu-items');
const buttonTerritories = document.querySelector('#button-territories');
const navTerritories = document.querySelector('#nav-territories');
const navTerritoriesOverlay = document.querySelector(
    '#nav-territories-overlay',
);

subMenuButton.forEach((btn) => btn.classList.remove('active'));
subMenuButton[0].classList.add('active');
subMenuItems[0].classList.remove('hidden');

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
    } else {
      btnUp.classList.remove('btn-up--active');
      header.classList.remove('header--active');
    }
  };
  const bannerObserver = new IntersectionObserver(cb, opts);
  bannerObserver.observe(observer);
}

// EVENTS HANDLERS
buttonMenu.addEventListener('click', menuToggle);

window.addEventListener('scroll', (e) => {
  if (
    (e.isTrusted && navMobile.classList.contains('nav--active')) ||
    navTerritories.classList.contains('nav-territories-active')
  ) {
    menuToggle();
    navTerritories.classList.remove('nav-territories-active');
    navTerritories.classList.remove('right-0');
    navTerritories.classList.add('-right-full');
    navTerritoriesOverlay.classList.add('invisible');
  }
});

window.addEventListener('keydown', (e) => {
  if (
    (e.key === 'Escape' && navMobile.classList.contains('nav--active')) ||
    navTerritories.classList.contains('nav-territories-active')
  ) {
    menuToggle();
    navTerritories.classList.remove('nav-territories-active');
    navTerritories.classList.remove('right-0');
    navTerritories.classList.add('-right-full');
    navTerritoriesOverlay.classList.add('invisible');
  }
});

btnUp.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

subMenuList.forEach((menuList, idx) => {
  menuList.addEventListener('click', function() {
    subMenu2[idx].classList.toggle('sub-menu-2--active');
    subMenuIcon[idx].classList.toggle('sub-menu-icon--active');
  });
});

subMenuButton.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = +btn.dataset.id;

    subMenuButton.forEach((btn) => btn.classList.remove('active'));
    subMenuItems.forEach((item) => item.classList.add('hidden'));

    subMenuButton[id].classList.add('active');
    subMenuItems[id].classList.remove('hidden');
  }),
);

buttonTerritories.addEventListener('click', () => {
  menuToggle();
  navTerritories.classList.add('nav-territories-active');
  navTerritories.classList.remove('-right-full');
  navTerritories.classList.add('right-0');
  navTerritoriesOverlay.classList.remove('invisible');
});

navTerritoriesOverlay.addEventListener('click', () => {
  navTerritories.classList.remove('nav-territories-active');
  navTerritories.classList.remove('right-0');
  navTerritories.classList.add('-right-full');
  navTerritoriesOverlay.classList.add('invisible');
});
