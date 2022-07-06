// слайдер
function slider({
  container, 
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currenCounter,
  wrapper,
  field}) {

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector (container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector( currenCounter),
          slidesWrapper = document.querySelector (wrapper),
          slidesField = document.querySelector (field),
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

export default slider;