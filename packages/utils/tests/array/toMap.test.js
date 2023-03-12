const metatests = require("metatests");
const { toMap } = require('../../functions/array/toMap');

metatests.testAsync("toMap(). Ключ как поле", async (test) => {
  const data = [
    { id: '1', value: 'v1' },
    { id: '2', value: 'v2' },
  ];
  const result = toMap(data, 'id');
  test.strictEqual(result, {
    '1': { id: '1', value: 'v1' },
    '2': { id: '2', value: 'v2' },
  });
});

metatests.testAsync('Ключ как функция', async (test) => {
  const data = [
    { id: '1', value: 'v1' },
    { id: '2', value: 'v2' },
  ];
  const result = toMap(data, (item) => item.id);
  test.strictEqual(result, {
    '1': { id: '1', value: 'v1' },
    '2': { id: '2', value: 'v2' },
  });
});
