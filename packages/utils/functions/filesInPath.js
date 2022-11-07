const fs = require("fs/promises");
const path = require("path");

/**
 * @typedef {Object} FileInfo
 * @property {string} path - Путь до файла
 * @property {number} size - Размер файла
 */

/**
 * Возвращает перечень файлов содержащихся в указанной папке
 * 
 * @param {String} root - путь до папки или файла
 * @return {AsyncIterator<FileInfo>}
 */
async function *filesInPath(root) {
    const dirs = [root];
    do {
        const dir = dirs.shift();
        const ls = await fs.readdir(dir);
        for (const file of ls) {
            const pathFull = path.join(dir, file);
            const stat = await fs.lstat(pathFull);
            if (stat.isDirectory()) {
                dirs.push(pathFull)
            } else {
                yield {
                    file,
                    path: pathFull,
                    size: stat.size,
                };
            }
        }
    } while (dirs.length > 0)
}

module.exports = {
    filesInPath
}