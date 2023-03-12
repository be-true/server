/** Конвертирует любое значение в массив. Если уже массив, то не трогает */
function toArray(data) {
  return Array.isArray(data) ? data : [data];
}

module.exports = {
  toArray
}