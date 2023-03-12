/** Создает объект, у которого ключом является значение из fieldToKey а значением элементы массива с этим ключом */
function toMapGroup(array, fieldToKey) {
  const result = {};

  for (const i of array) {
    let key = '';
    if (typeof fieldToKey === 'string') {
      key = i[fieldToKey] + '';
    } else if (typeof fieldToKey === 'function') {
      key = fieldToKey(i);
    }

    if (result[key] !== undefined) {
      result[key].push(i);
    } else {
      result[key] = [i];
    }
  }

  return result;
}

module.exports = {
  toMapGroup
}