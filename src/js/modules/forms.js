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