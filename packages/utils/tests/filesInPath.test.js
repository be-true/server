// 
const metatests = require("metatests");
const { filesInPath } = require("../functions/filesInPath");

const mockRoot = __dirname + "/_fixtures/filesInPath/";
const mock001 = mockRoot + "001";
const clearPath = (prefix) => (path) => path.replace([prefix], '');

metatests.testAsync("filesInPath()", async (test) => {
    const result = [];
    for await (const file of filesInPath(mock001)) {
        result.push(file);
    }
    test.strictEqual(result.map(i => i.file).sort(), ['test.txt', 'image.png', 'favicon.ico'].sort());
    test.strictEqual(
        result.map(i => clearPath(mock001)(i.path)).sort(), 
        ['/any-dir/image.png', '/any-dir/any-dir-2/favicon.ico', '/test.txt'].sort()
    );
});