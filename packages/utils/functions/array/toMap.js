/** Создает объект, у которого ключом является значение из fieldToKey а значением элемент массива */
function toMap(array, fieldToKey) {
  const result = {};

  for (const i of array) {
    let key = '';
    if (typeof fieldToKey === 'string') {
      key = i[fieldToKey] + '';
    } else if (typeof fieldToKey === 'function') {
      key = fieldToKey(i);
    }

    result[key] = i;
  }

  return result;
}

module.exports = {
  toMap
}
