'use strict'

// ELEMENTS
const filters = document.querySelector('.filters')
const accordions = document.querySelectorAll('.accordion');
const panels = document.querySelectorAll('.panel');
const images = document.querySelectorAll('.accordion--images');

// DATA
const dataEl = document.querySelector('#data-eventos');




// EVENTS HANDLERS

// PARENT ELEMENT
filters.addEventListener('click', function (e) {
    try {
        const child = e.target.closest(".accordion");
        const id = child.getAttribute('data-tab');
        if (panels[id].style.maxHeight) {
            panels[id].style.maxHeight = null;
            panels[id].style.padding = "0px 24px 0px 24px";
            panels[id].style.overflowY = "hidden";
            images[id].style.transform = "rotate(0deg)";
        } else {
            panels[id].style.maxHeight = 193 + "px";
            panels[id].style.padding = "16px 24px 8px 24px";
            panels[id].style.overflowY = "scroll";
            images[id].style.transform = "rotate(90deg)";
        }
    } catch {
        return;
    }
})