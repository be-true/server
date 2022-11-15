// 
const metatests = require("metatests");
const { humanSize } = require("../functions/humanSize");

metatests.testAsync("humanSize() - байты", async (test) => {
    test.strictEqual(humanSize(100), '100 Б');
});

metatests.testAsync("humanSize() - килобайты", async (test) => {
    test.strictEqual(humanSize(1024), '1 КБ');
});

metatests.testAsync("humanSize() - килобайты дробные", async (test) => {
    test.strictEqual(humanSize(1024 + 512), '1.5 КБ');
});

metatests.testAsync("humanSize() - мегабайт", async (test) => {
    test.strictEqual(humanSize(1024 * 1024), '1 МБ');
});

metatests.testAsync("humanSize() - мегабайт дробный", async (test) => {
    test.strictEqual(humanSize(1024 * 1024 + 1024 * 1024 * 0.1), '1.1 МБ');
});

metatests.testAsync("humanSize() - гигабайт", async (test) => {
    test.strictEqual(humanSize(1024 * 1024 * 1024), '1 ГБ');
});