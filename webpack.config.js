'use strict';

let path = require('path');
// Объект настроек
module.exports = {
  // режим 'development' или 'prodaction'
  mode: 'development',
  // путь к файлу в котором находятся все зависимости
  entry: './src/js/script.js',
  // файл выхода в виде объекта
  output: {
    // название файла
    filename: 'bundle.js',
    // куда складываем __dirname (это корень папки)
    path: __dirname + '/src/js'
  },
  // отслеживание в автоматическом режиме
  watch: true,
  // исходник кода без форматирования
  devtool: "source-map",
  // настройка модулей при необходимости
  module: {},
};
