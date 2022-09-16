'use_strict'

const { required, parseInteger, parseBoolean, split, trim, trimRight, startIt, parseEnum } = require('./chain')

class ConfigItem {
  #context = '';
  #isRequired = false;
  #isArray = false;
  #envNameTemplate;
  #envName;
  #description;
  #example;
  #default;
  #override;
  #error;
  #chain = [];
  #hasCash = false;
  #cash;
  #splitter = ',';
  #type;
  
  constructor() {}

  description(text) {
    this.#description = text;
    return this;
  }

  example(text) {
    this.#example = text;
    return this;
  }

  default(value) {
    this.#reset();
    this.#default = value;
    return this;
  }

  fromEnv(envName) {
    this.#reset();
    this.#envNameTemplate = envName;
    this.#envName = this.#calcEnvName(this.#envNameTemplate, this.#context);
    return this;
  }

  override(value) {
    this.#reset();
    this.#override = value;
    return this;
  }

  get() {
    if (this.#hasCash) return this.#cash;

    let result = [this.#value()];
    try {
      for (const element of this.#chain) {
        result = result.map(element).flat();
      }
    } catch (e) {
      // Если произошла ошибка при выполнении цепочки
      // то сохраняем ошибку и значение приравниваем к undefined
      this.#error = e.message;
      result = undefined;
    }

    if (result !== undefined) result = this.#isArray ? result : result[0];
    this.#cash = result;
    this.#hasCash = true;
    return this.#cash;
  }

  required() {
    this.#reset();
    this.#isRequired = true;
    return this;
  }

  splitter(splitter) {
    this.#reset();
    this.#splitter = splitter;
    return this;
  }

  setContext(context) {
    this.#reset();
    this.#context = context.toUpperCase();
    this.#envName = this.#calcEnvName(this.#envNameTemplate, this.#context);
  }

  hasError() {
    return this.#error !== undefined;
  }

  hasEnv() {
    return this.#envName !== undefined;
  }

  export() {
    return {
      required: this.#isRequired,
      env: this.#envName,
      error: this.#error,
      description: this.#description,
      example: this.#example,
      default: this.#default,
      isArray: this.#isArray,
      splitter: this.#splitter,
      type: this.#type,
    }
  }

  asString() {
    this.#type = 'string';
    this.#setChain(
      [split(this.#splitter), this.#isArray],
      [required, this.#isRequired],
    );
    return this.get();
  }

  asInteger() {
    this.#type = 'integer';
    this.#setChain(
      [split(this.#splitter), this.#isArray],
      [required, this.#isRequired],
      parseInteger,
    );
    return this.get();
  }

  asBoolean() {
    this.#type = 'boolean';
    this.#setChain(
      [split(this.#splitter), this.#isArray],
      [required, this.#isRequired],
      parseBoolean,
    );
    return this.get();
  }

  asUrl() {
    this.#type = 'url';
    this.#setChain(
      [split(this.#splitter), this.#isArray],
      [required, this.#isRequired],
      trim('\\s'),
      trimRight('/'),
      startIt(['http://', 'https://'])
    );
    return this.get();
  }

  asEnum(list) {
    this.#type = `enum:${list.join(',')}`;
    this.#setChain(
      [split(this.#splitter), this.#isArray],
      [required, this.#isRequired],
      parseEnum(list)
    );
    return this.get();
  }

  asArrayString() {
    this.#isArray = true;
    return this.asString();
  }

  asArrayInteger() {
    this.#isArray = true;
    return this.asInteger();
  }

  asArrayBoolean() {
    this.#isArray = true;
    return this.asBoolean();
  }

  asArrayUrl() {
    this.#isArray = true;
    return this.asUrl();
  }

  asArrayEnum(list) {
    this.#isArray = true;
    return this.asEnum(list);
  }

  #value() {
    return this.#override ?? process.env[this.#envName] ?? this.#default;
  }

  #reset() {
    this.#hasCash = false;
  }

  #calcEnvName(template, context) {
    if (template === undefined) return undefined;
    const clear = (value) => value.replace(/\_+/g, '_').replace(/\_+$/g, '').replace(/$\_+/g, '');
    const has = template.indexOf('{context}') !== -1;
    if (!has && context.length > 0) return `${context}_${template}`;
    if (has && context.length === 0) return clear(template.replace('{context}', ''));
    if (has && context.length > 0) return clear(template.replace('{context}', `_${context}_`));
    return template;
  }

  /**
   * Установка цепочки для обработки переменных
   * Передается массив вида
   * (value: any): => any | any[] - Функция, которая принимает значение и возвращает другое значение или массив
   * или tuple в котором первым параметром передается та же функция, а вторым параметром флаг, добавить его или нет в цепочку обработки переменных 
   * [(value: any): => any | any[], boolean]
   */
  #setChain(...chain) {
    this.#reset();
    this.#chain = [];
    for (const item of chain) {
      let element = item;
      if (Array.isArray(item) && !item[1]) continue;
      if (Array.isArray(item) && item[1]) element = item[0];
      this.#chain.push(element);
    }
  }
}

module.exports = {
  ConfigItem
}