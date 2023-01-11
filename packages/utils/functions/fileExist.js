'use_strict'

const fs = require("fs");

/**
 * Проверяет наличие файла по указанному пути
 * 
 * @param {String} path - путь до файла
 * @return {Promise<Boolean>}
 */
async function fileExist(path) {
    try {
        await fs.promises.access(path);
        return true;
    } catch(e) {
        return false;
    }
}

module.exports = {
    fileExist
}