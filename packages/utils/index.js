'use_strict'

module.exports = {
    replaceInFile: require('./functions/replaceInFile').replaceInFile,
    mime: require('./functions/mime').mime,
    humanSize: require('./functions/humanSize').humanSize,
    fileExist: require('./functions/fileExist').fileExist,
    fileHash: require('./functions/fileHash').fileHash,
    filesInPath: require('./functions/filesInPath').filesInPath,
    toArray: require('./functions/array/toArray').toArray,
    toMap: require('./functions/array/toMap').toMap,
    toMapGroup: require('./functions/array/toMapGroup').toMapGroup,
}