const { ConfigItem } = require("./ConfigItem");
const { MDTable } = require("./MDTable");

class Config {
  description = '';
  context = '';
  #items = new Map();

  constructor() {}

  static from(json) {
    const _json = json ?? {};
    if (_json instanceof Config) return json;
    const config = new Config();
    const { _settings, ...params } = _json;
    config.setSettings(_settings);
    for (const [key, value] of Object.entries(params)) {
      config.param(key).default(value);
    }
    return config;
  }

  setSettings(settings) {
    if (typeof settings !== 'object') return this;
    
    const self = this;
    const keys = ['description', 'context'];
    for (const key of keys) {
      if (settings[key] === undefined) continue;
      self[key] = settings[key];
    }
    if (settings.context && settings.context.length > 0) {
      for (const [key, item] of this.#items) {
        item.setContext(settings.context);
      }
    }

    return this;
  }

  param(name) {
    if (name === '_settings') throw new Error("Поле _settings зарезервировано");
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

  merge(data) {
    const { _settings, ...params } = data ?? {};
    this.setSettings(_settings);
    for (const [key, item] of this.#items) {
      if (params[key] === undefined) continue;
      item.override(params[key]);
    }
    return this;
  }

  hasErrors() {
    for (const [key, item] of this.#items) {
      if (item.hasError()) return true;
    }
    return false;
  }

  hasEnvs() {
    return Array.from(this.#items.values()).some(i => i.hasEnv());
  }

  render() {
    const data = [];
    for (const [key, item] of this.#items) {
      if (!item.hasEnv()) continue;
      const { error, ...rest } = item.export();
      data.push(rest);
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
