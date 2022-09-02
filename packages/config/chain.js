const required = (value) => {
    if (value === undefined || value === null) {
        throw new Error('Параметр обязательный для заполнения')
    }
    return value;
}

const parseInteger = (value) => {
    return parseInt(value, 10);
}

const parseBoolean = (value) => {
    const _value = value.toLowerCase();
    switch(_value) {
        case '0':
        case 'false':
            return false;
        case '1':
        case 'true':
            return true;
    }

    throw new Error('Не допустимое значение для boolean')
}

const parseEnum = (items) => (value) => {
    const has = items.map(item => item === value).some(i => i);
    if (!has) throw new Error(`Должен быть один из них ${items.join(', ')}`);
    return value;
}

const split = (splitter) => (value) => value.split(splitter); 

const trimLeft = (trim) => (value) => {
    const regexp = new RegExp(`^${trim}+`);
    return value.replace(regexp, '');
}

const trimRight = (trim) => (value) => {
    const regexp = new RegExp(`${trim}+$`);
    return value.replace(regexp, '');
}

const trim = (trim) => (value) => {
    return trimRight(trim)(trimLeft(trim)(value));
}

const startIt = (items) => (value) => {
    const has = items.map(item => value.indexOf(item) === 0).some(i => i);
    if (!has) throw new Error(`Должен начинаться с ${items.join(', ')}`);
    return value;
}

module.exports = {
    required,
    parseInteger,
    parseBoolean,
    parseEnum,
    split,
    trim,
    trimLeft,
    trimRight,
    startIt
}