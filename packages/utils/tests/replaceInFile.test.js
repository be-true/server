const metatests = require("metatests");
const { replaceInFile } = require("../functions/replaceInFile");
const fsp = require('fs').promises;

const fileResultStart = __dirname + '/_fixtures/replaceInFile/result.start.txt';
const fileResultEnd = __dirname + '/_fixtures/replaceInFile/result.end.txt';
const reset = async () => {
    await fsp.writeFile(fileResultEnd, await fsp.readFile(fileResultStart));
}
const get = async () => {
    return fsp.readFile(fileResultEnd, 'utf8');
}

metatests.testAsync("replaceInFile()", async (test) => {
    await reset()
    await replaceInFile(fileResultEnd, '[envs]: start', '[envs]: end', `\n${'tested replace text'}\n`)

    test.strictEqual(
        await get(), 
        `Заголовок\n` +
        `[envs]: start\n` + 
        `tested replace text\n` +
        `[envs]: end\n` +
        `Футер`
    )
    await reset();
});