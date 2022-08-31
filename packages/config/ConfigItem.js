class ConfigItem {
  #isRequired = false;
  #envName;
  #descriptionText;
  #exampleText;
  #defaultValue;
  #override;

  constructor() {}

  fromEnv(envName) {
    this.#envName = envName;
    return this;
  }

  description(text) {
    this.#descriptionText = text;
    return this;
  }

  example(text) {
    this.#exampleText = text;
    return this;
  }

  default(value) {
    this.#defaultValue = value;
    return this;
  }

  required() {
    this.#isRequired = true;
    return this;
  }

  override(value) {
    this.#override = value;
    return this;
  }

  get() {
    return this.#override ?? process.env[this.#envName] ?? this.#defaultValue;
  }

  asString() {
    return this.get();
  }

  asInteger() {
    return this.get();
  }
}

module.exports = {
  ConfigItem
}