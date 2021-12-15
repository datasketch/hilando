'use strict'

// ELEMENTS
const parentNavigation = document.querySelector('.single-navigation');
const childsNavigation = document.querySelectorAll('.single-navigation__item');

// EVENTS
parentNavigation.addEventListener('click', function (e) {
    e.preventDefault();

    const child = e.target.closest('.single-navigation__item');
    const link = child.getAttribute('href');

    // Resets active
    childsNavigation.forEach(child => child.style.backgroundColor = '#C5296A');

    // Add active class
    child.style.backgroundColor = '#D27028';

    // Desplazamiento a la sección
    document.querySelector(link).scrollIntoView({ behavior: 'smooth' });
})