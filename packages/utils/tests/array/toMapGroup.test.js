const metatests = require("metatests");
const { toMapGroup } = require('../../functions/array/toMapGroup');

metatests.testAsync('toMapGroup(). Ключ как поле', async (test) => {
  const data = [
    { parent_id: '1', value: 'v1' },
    { parent_id: '1', value: 'v2' },
  ];
  const result = toMapGroup(data, 'parent_id');
  test.strictEqual(result, {
    '1': [
      { parent_id: '1', value: 'v1' },
      { parent_id: '1', value: 'v2' },
    ],
  });
});

metatests.testAsync('Ключ как функция', async (test) => {
  const data = [
    { parent_id: '1', value: 'v1' },
    { parent_id: '1', value: 'v2' },
  ];
  const result = toMapGroup(data, (item) => item.parent_id);
  test.strictEqual(result, {
    '1': [
      { parent_id: '1', value: 'v1' },
      { parent_id: '1', value: 'v2' },
    ],
  });
});
