'use_strict'

const map = [
    ['ГБ', 1073741824],
    ['МБ', 1048576],
    ['КБ', 1024],
    ['Б', 0],
];
/**
 * Переводит байты в человеко понятный формат
 * 
 * @param {Number} size - размер в байтах
 */
function humanSize(size) {
    for (const [name, max] of map) {
        if (size >= max) {
            let value;
            if (max === 0) value = size;
            else if (size === max) value = 1;
            else value = Math.ceil((size / max) * 10) / 10;
            return `${value} ${name}`
        }
    }
}

module.exports = {
    humanSize
}