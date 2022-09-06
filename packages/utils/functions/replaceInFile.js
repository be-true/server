'use_strict'

const fsp = require('fs').promises;

const replaceInFile = async (filePath, start, end, replacement) => {
    let result = await fsp.readFile(filePath, 'utf8');
    const startIndex = result.indexOf(start);
    const endIndex = result.indexOf(end);
    result = result.substring(0, startIndex + start.length) 
             + replacement 
             + result.substring(endIndex);
    await fsp.writeFile(filePath, result);
}

module.exports = {
    replaceInFile
}