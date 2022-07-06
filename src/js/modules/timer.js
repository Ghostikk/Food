function timer(id, deadLine) {
    // Таймер
  
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

  setClock(id, deadLine);
}

export default timer;