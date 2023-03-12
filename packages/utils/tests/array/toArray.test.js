const metatests = require("metatests");
const { toArray } = require('../../functions/array/toArray');

metatests.testAsync("toArray(). Передан не массив", async (test) => {
  const data = 'text';
  const result = toArray(data);
  test.strictEqual(result, ['text']);
});

metatests.testAsync("toArray(). Передан массив", async (test) => {
  const data = ['1', '2'];
  const result = toArray(data);
  test.strictEqual(result, ['1', '2']);
});
