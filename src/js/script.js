"use strict";

import tabs  from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import slider from './modules/slider';
import forms from './modules/forms';
import {openModal} from './modules/modal';

window.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout (() => openModal('.modal', modalTimerId), 3000000);
        
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2022-09-30');
  cards();
  calc();
  forms('form', modalTimerId);
  slider({
      container: '.offer__slider',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      slide: '.offer__slide',
      totalCounter: '#total',
      currenCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      field: '.offer__slider-inner',
  });
});

