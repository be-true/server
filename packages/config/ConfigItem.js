'use_strict'

const { required, parseInteger, parseBoolean, split, trim, trimRight, startIt, parseEnum } = require('./chain')

class ConfigItem {
  #isRequired = false;
  #isArray = false;
  #envName;
  #descriptionText;
  #exampleText;
  #defaultValue;
  #override;
  #error;
  #chain = [];
  #hasCash = false;
  #cash;
  #splitter = ',';
  #enum;

  constructor() {}

  description(text) {
    this.#descriptionText = text;
    return this;
  }

  example(text) {
    this.#exampleText = text;
    return this;
  }

  default(value) {
    this.#hasCash = false;
    this.#defaultValue = value;
    return this;
  }

  fromEnv(envName) {
    this.#hasCash = false;
    this.#envName = envName;
    return this;
  }

  override(value) {
    this.#hasCash = false;
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
    this.#hasCash = false;
    this.#isRequired = true;
    return this;
  }

  splitter(splitter) {
    this.#hasCash = false;
    this.#splitter = splitter;
    return this;
  }

  hasError() {
    return this.#error !== undefined;
  }

  asString() {
    this.#setChain(
      [split(this.#splitter), this.#isArray],
      [required, this.#isRequired],
    );
    return this.get();
  }

  asInteger() {
    this.#setChain(
      [split(this.#splitter), this.#isArray],
      [required, this.#isRequired],
      parseInteger,
    );
    return this.get();
  }

  asBoolean() {
    this.#setChain(
      [split(this.#splitter), this.#isArray],
      [required, this.#isRequired],
      parseBoolean,
    );
    return this.get();
  }

  asUrl() {
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
    return this.#override ?? process.env[this.#envName] ?? this.#defaultValue;
  }

  /**
   * Установка цепочки для обработки переменных
   * Передается массив вида
   * (value: any): => any | any[] - Функция, которая принимает значение и возвращает другое значение или массив
   * или tuple в котором первым параметром передается та же функция, а вторым параметром флаг, добавить его или в цепочку обработки переменных 
   * [(value: any): => any | any[], boolean]
   */
  #setChain(...chain) {
    this.#hasCash = false;
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