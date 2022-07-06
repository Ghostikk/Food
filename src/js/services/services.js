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

async function getResource (url) {
      const result = await fetch (url);
      // метод ок присутствует у fetch при Get запросах
      if (!result.ok) {
        // throw позволяет генерировать исключения, определяемые пользователем
        throw new Error (`Команда fetch по url ${url} не может быть выполнена, status: ${result.status}`);
      }
      return await result.json();
}

export {getResource};
export {postData};