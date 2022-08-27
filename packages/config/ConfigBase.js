const { ConfigItem } = require("./ConfigItem");

class ConfigBase {
  context;
  _items = {};

  fromEnv(envName) {
    const value = this.getEnvValue(envName);
    const item =  new ConfigItem(value, envName, this.context)
    this._items[envName] = item;
    return item;
  }

  getItemByEnvName(envName) {
    return this._items[envName];
  }

  getItems() {
    return Object.values(this._items);
  }

  getEnvValue(envName) {
    return process.env[envName];
  }
}

module.exports = {
  ConfigBase
}
