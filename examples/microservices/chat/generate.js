const { replaceInFile } = require("@be-true/utils");
const { app } = require("./app");

(async () => {
    const text = await app.exportEnvs();
    await replaceInFile(
        __dirname + '/docs/envs.md',
        '[envs]: start',
        '[envs]: end',
        `\n\n${text}\n\n`
    );
})()