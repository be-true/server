const { ConfigItem } = require("./ConfigItem");
const { MDTable } = require("./MDTable");

class Config {
  connext;
  #items = new Map();

  constructor() {}

  static from(json) {
    const _json = json ?? {};
    if (_json instanceof Config) return json;
    const config = new Config();
    for (const [key, value] of Object.entries(_json)) {
      config.param(key).default(value);
    }
    return config;
  }

  param(name) {
    const item = new ConfigItem();
    this.#items.set(name, item);
    Object.defineProperty(this, name, {
        get: function() { return item.get() },
        set: function() {},
    })
    return item;
  }

  override(name, value) {
      const item = this.#items.get(name);
      if (item) item.override(value);
      return this;
  }

  merge(config) {
    for (const [param, item] of this.#items) {
      if (config[param] === undefined) continue;
      item.override(config[param]);
    }
    return this;
  }

  hasErrors() {
    for (const [key, item] of this.#items) {
      if (item.hasError()) return true;
    }
    return false;
  }

  render() {
    const data = [];
    for (const [key, item] of this.#items) {
      data.push(item.export());
    }
    return new MDTable(data).toString();
  }

  renderErrors() {
    const data = [];
    for (const [key, item] of this.#items) {
      if (item.hasError()) data.push(item.export());
    }
    return new MDTable(data).toString();
  }

}

module.exports = {
  Config
}
