/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((module) => {

function calc() {
      // калькулятор каллорий

    let result = document.querySelector ('.calculating__result span');

    
    let sex, height, weight, age, ratio;

    // валидация возраста
    function validateInfo(selector) {
        let data = document.querySelector(selector);

        data.addEventListener ('input', () => {
            const ageData = +data.value;
            if (ageData > 99 || ageData < 0) {
            data.style.backgroundColor = '#FFB6C1';
            data.value = '';
            data.placeholder = 'Ошибка ввода';
        } else {
            data.style.backgroundColor = 'white';
            data.placeholder = 'Введите возраст';
        }
        
      }); 

    }
  validateInfo('#age'); 

    // запись данных по умолчанию в localStorage для пола
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    // запись данных по умолчанию в localStorage для активности
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // функция расчета калорий 
    function calcTotal() {

        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = ' 0 ';
            return;
        }

        if (sex === 'female') {
            result.textContent = (Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio));
        } else {
            result.textContent = (Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio));
        }
    }

    calcTotal();

    
    // функция для работы с локал сторедж по запоминанию выбранных блоков
       function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    //

     function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
              

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
              const target = e.target;
              // проверяем что клик именно по классу calculating__choose-item
              // если выбрал блок с атрибутом data-ratio, то меняем значение ratio иначе получаем значение id
              
              if(target.classList.contains ('calculating__choose-item')) {
                  if (target.getAttribute('data-ratio')) {
                      ratio = +target.getAttribute('data-ratio');
                      // добавляем в локал сторадж инфу  
                      localStorage.setItem ('ratio', +target.getAttribute('data-ratio'));
                  } else {
                      sex = target.getAttribute('id');
                      localStorage.setItem ('sex', target.getAttribute('id'));
                  }
                }
                
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }
    
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    //
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        
        
            input.addEventListener('input', () => {

                //проверка, что в полях ввода нет чисел
                if (input.value.match(/\D/g)) {
                      input.style.border = '1px solid red';
                      
                } else {
                      input.style.border = 'none';
                }

                switch(input.getAttribute('id')) {
                    case "height":
                        height = +input.value;
                        break;
                    case "weight":
                        weight = +input.value;
                        break;
                    case "age":
                        age = +input.value;
                        break;
                }
                calcTotal();
            });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((module) => {

function cards() {
    // Используем классы для карточек 

  class MenuCard {

      constructor (src, alt, title, descr, price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.classes = classes; // оператор REST в виде массива
          this.parent = document.querySelector (parentSelector);
          this.transfer = 70; // курс доллара
          this.changeToRUB();
      }

      changeToRUB() {
          this.price = this.price * this.transfer;
      }

      render() {
          const element = document.createElement ("div");

          if (this.classes.length === 0) {
              this.classes = 'menu__item';
              element.classList.add(this.element);
          } else {
              this.classes.forEach (className => element.classList.add (className));
          }

          
          element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
              </div>`;

            this.parent.append(element);
      }
  }
  
  const getResource = async (url) => {
      const result = await fetch (url);
      // метод ок присутствует у fetch при Get запросах
      if (!result.ok) {
        // throw позволяет генерировать исключения, определяемые пользователем
        throw new Error (`Команда fetch по url ${url} не может быть выполнена, status: ${result.status}`);
      }
      return await result.json();
  };

  // автоматически рендерит карточки в зависимости от их количесва расположенного в db.json/menu
  // перебераем черз ФоИЧ и деструктурезируем объект
  getResource('http://localhost:3000/menu')
      .then(data => {
          data.forEach (({img, altimg, title, descr, price}) => {
              new MenuCard(img, altimg, title, descr, price, ".menu .container",
      "menu__item").render();
          });
      });
}

module.exports = cards;

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((module) => {

function forms() {
    // Формы
  const forms = document.querySelectorAll ("form");

  const mess = {
      loading: 'img/svg/spinner.svg',
      success: 'Спасибо! Мы скоро с вами свяжемся!',
      failure: 'Что-то пошло не так',
  };

  forms.forEach(form => {
      bindPostData (form);
   });

  // async - впереди асинхронный код
  // await - ожидание результата запроса, всегда в паре с async
  // иначе будет undefined
  const postData = async (url, data) => {
      const result = await fetch (url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: data
      });


      return await result.json();
  };
  

  function bindPostData (form) {
      form.addEventListener ("submit", (e) => {
          e.preventDefault();

          const statusMess = document.createElement('img');
          statusMess.src = mess.loading;
          statusMess.textContent = mess.loading;
          statusMess.style.cssText = `
              display: block;
              margin: 0 auto;   
          `;
          form.append ();

          // получение данных с формы
          const formData = new FormData (form);

          // впревращает объект в матрицу (массив массивов), далее в объект, а далее в JSON
          const json = JSON.stringify(Object.fromEntries(formData.entries()));

          // при отправке формы имеет смысл использовать функционал по общению с сервером в отдельной функции
          postData ('http://localhost:3000/requests', json)
              .then(data => {
                  console.log (data);
                  showThanksModal(mess.success);
                  statusMess.remove();
                  })
              .catch (() => {
                  showThanksModal (mess.failure);
                  })
              .finally (() => {
                  form.reset();
                  });
    });
  }

  function showThanksModal (message) {
      const prevModalDialog = document.querySelector ('.modal__dialog'),
            thanksModal  = document.createElement ('div');

      prevModalDialog.classList.add ('hide');
      openModal();  


      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>&times;</div>
              <div class="modal__title">${message}</div>
          </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout (() => {
          thanksModal.remove();
          prevModalDialog.classList.add ('show');
          prevModalDialog.classList.remove ('hide');

          closeModal();
      },4000);
    }
// получение данный через JSON
    fetch ('http://localhost:3000/menu')
      .then (data => data.json())
      .then (result => console.log(result));
}

module.exports = forms;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((module) => {

function modal() {
      // modal windows

    const modalTrigger = document.querySelectorAll("[data-modal]"),
          modal = document.querySelector(".modal"),
          modalTimerId = setTimeout (openModal, 3000000);


    function openModal () {
        modal.style.display = 'block';
          // запрет скролла страницы при вызове формы
        document.body.style.overflow = "hidden";
        // если пользователь сам открыл модалку, очищаем таймер 
        clearInterval (modalTimerId);
    }     

    modalTrigger.forEach(btn => {
        btn.addEventListener ("click", openModal);
    });
 
    function closeModal () {
        modal.style.display = 'none';
        document.body.style.overflow = "";
    }

    
    modal.addEventListener ('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal ();
        }
    });

    document.addEventListener ('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === 'block') {
            closeModal ();
      }
    });


    function showModalByScroll () {
      // сравниваем что сумма прокрученной части (скрорллом) и видимой клиенской части экрана больше
      // либо равно всей высоте страницы сайта, то достигнут конец
      // -1 пиксель для фикса ошибки, что не отображается модальное окно
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
              openModal();
              window.removeEventListener ('scroll', showModalByScroll);
          }
    }
        window.addEventListener ('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((module) => {

function slider() {
     // слайдер

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector ('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector ('.offer__slider-wrapper'),
          slidesField = document.querySelector ('.offer__slider-inner'),
          width = window.getComputedStyle (slidesWrapper).width; // получение ширины отгенерированного слайда

    // начальный индекс
    let slideIndex = 1,
        offset = 0;
   //------------- слайдер вариант №1 -------------//  

    function addToZero (slides, slideIndex) {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    }

    addToZero (slides, slideIndex);
     
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach (slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement ('ol'),
          dots = []; // создаем пустой массив чтобы пушить в него


    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement ('li');
        dot.setAttribute ('data-slide-to', i+1);
        dot.classList.add('dot');

        if (i == 0) dot.style.opacity = 1;

        indicators.append(dot);
        dots.push(dot);
    }

    function deteleNotDig (str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener ('click', () => {
        // применим регулярное выражение для исключение px в конце width
        if (offset == deteleNotDig(width) * (slides.length -1)) {
            offset = 0;
        } else {
          offset += deteleNotDig(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex == slides.length ? slideIndex = 1 : slideIndex++;

       addToZero (slides, slideIndex);

        dots.forEach (dot => dot.style.opacity = '0.5');
        dots [slideIndex - 1].style.opacity = 1;

        dots.forEach (dot => {
            dot.addEventListener ('click', (e) => {
                const slideTo = e.target. getAttribute ('data-slide-to');

                slideIndex = slideTo;
                offset = deteleNotDig(width) * (slideTo  -1);
                slidesField.style.transform = `translateX(-${offset}px)`;
                dots.forEach (dot => dot.style.opacity = '0.5');
                dots [slideIndex - 1].style.opacity = 1;

                addToZero (slides, slideIndex);
            });
        });

    });

    prev.addEventListener ('click', () => {
        if (offset == 0) {
            offset = deteleNotDig(width) * (slides.length -1);
        } else offset -= deteleNotDig(width);

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex == 1 ? slideIndex = slides.length : slideIndex--;

        slides.length < 10 ? 
        current.textContent = `0${slideIndex}` :
        current.textContent = slideIndex;

        dots.forEach (dot => dot.style.opacity = '0.5');
        dots [slideIndex - 1].style.opacity = 1;
    });
}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((module) => {

function tabs() {
   //Tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabHeader = document.querySelector(".tabheader__items"),
        tabContent = document.querySelectorAll(".tabcontent");

    // перебераем элементы и убираем класс активности
    function hideTabContent() {
        tabContent.forEach((item) => {
            // item.classList.remove("tabheader__item_active");
            item.classList.add("hide");
            item.classList.remove("show", "fade");
      });
      // перебераем элементы и ставим дисплей нан
        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }
    // выбранному элементу tabContent добавляем дисплей блок
    // каждому табу (кнопке) даем класс активности
    function showTabContent(i = 0) {
      // tabContent[i].style.display = "block";
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    // вешаем обработчик события по клику на родителя tabHeader
    // проверяем наличие класса .tabheader__item у элементов
    // если номер перебираемого улемента равен выбранно кнопке, тогда вызываем функции
    tabHeader.addEventListener("click", (e) => {
        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                    console.log(`Под номером ${i + 1} выбрана кнопка ${item}`);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((module) => {

function timer() {
    // Таймер

  const deadlineTime = "2022-7-15";
  
  function getTimeRemaining(endtime) {
    // разница в мс между текущей датой и датой окончания таймера
      const time = Date.parse(endtime) - Date.parse(new Date()),
            // делим остаток мс в переменной time на колво мс в сутках и округляем
            days = Math.floor(time/(1000*60*60*24)),
            hours = Math.floor((time/(1000*60*60))%24),
            minutes = Math.floor((time/1000/60)%60),
            second = Math.floor((time/1000)%60);

      if (time <= 0) {
          return {total: 0, days: 0,hours: 0,minutes: 0,second: 0,};
      }

      return {
          total: time,
          days: days,
          hours: hours,
          minutes: minutes,
          second: second,
      };
  }

  function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

    updateClock(); // вызов чтобы инициализировать и ускорить загрузку

    function updateClock() {
        const time = getTimeRemaining(endtime);
              days.innerHTML = getZero(time.days);
              hours.innerHTML = getZero(time.hours);
              minutes.innerHTML = getZero(time.minutes);
              seconds.innerHTML = getZero(time.second);

      time.total <= 0 ? clearInterval(timeInterval) : timeInterval;
    }
  }

    let getZero = (num) => {
        return num >= 0 && num < 10 ? `0${num}` : num;
    };

  setClock(".timer", deadlineTime);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/

window.addEventListener("DOMContentLoaded", () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");

  tabs();
  modal();
  timer();
  cards();
  calc();
  slider();
  forms();
  
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map