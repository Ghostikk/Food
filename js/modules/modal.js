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