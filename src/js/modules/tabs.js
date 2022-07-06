function tabs(tabsSelector, tabsContentSelector, tabsParentSelector,  activeClass) {
   //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabsContentSelector),
          tabHeader = document.querySelector(tabsParentSelector);
          

    // перебераем элементы и убираем класс активности
    function hideTabContent() {
        tabContent.forEach((item) => {
            // item.classList.remove("tabheader__item_active");
            item.classList.add("hide");
            item.classList.remove("show", "fade");
      });
      // перебераем элементы и ставим дисплей нан
        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }
    // выбранному элементу tabContent добавляем дисплей блок
    // каждому табу (кнопке) даем класс активности
    function showTabContent(i = 0) {
      // tabContent[i].style.display = "block";
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }

    // вешаем обработчик события по клику на родителя tabHeader
    // проверяем наличие класса .tabheader__item у элементов
    // если номер перебираемого улемента равен выбранно кнопке, тогда вызываем функции
    tabHeader.addEventListener("click", (e) => {
        const target = e.target;
        // с помощью слйс срезаем первый символ (точку перед селектором для работы с классом)
        if (target && target.classList.contains(tabsSelector.slice(1))) {
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

export default tabs;