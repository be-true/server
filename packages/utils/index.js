'use_strict'

module.exports = {
    replaceInFile: require('./functions/replaceInFile').replaceInFile,
    mime: require('./functions/mime').mime,
    humanSize: require('./functions/humanSize').humanSize,
    fileExist: require('./functions/fileExist').fileExist,
    fileHash: require('./functions/fileHash').fileHash,
    filesInPath: require('./functions/filesInPath').filesInPath,
}