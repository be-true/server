const { EnumNotFoundError, FormatError, RequiredError } = require("./errors");

class ConfigItem {
  _isRequired = false;
  _descriptionText;
  _exampleText;
  _defaultValue;
  _type;

  constructor(value, envName, context) {
    this.value = value;
    this.envName = envName;
    this.context = context;
  }

  description(text) {
    this._descriptionText = text;
    return this;
  }

  example(text) {
    this._exampleText = text;
    return this;
  }

  default(value) {
    this._defaultValue = value;
    return this;
  }

  required() {
    this._isRequired = true;
    return this;
  }

  asString() {
    this._setType("string");
    this._assertIsRequired();
    let value = this._getValueOrDefault();
    return value;
  }

  asInteger() {
    this._setType("integer");
    this._assertIsRequired();
    let value = this._getValueOrDefault();
    if (value === undefined) return undefined;
    const result = parseInt(value);
    if (Number.isNaN(result)) this._assertFormat();
    return result;
  }

  asBoolean() {
    this._setType("boolean: true, false, 0, 1");
    this._assertIsRequired();
    let value = this._getValueOrDefault();
    if (value === undefined) return undefined;
    if (typeof value === "boolean") return value;
    value = value.toLowerCase();
    if (["0", "false"].includes(value)) return false;
    if (["1", "true"].includes(value)) return true;
    this._assertFormat();
  }

  asUrl() {
    const value = this.asString();
    this._setType("url");
    if (value === undefined) return undefined;
    if (value.indexOf("http://") !== 0 && value.indexOf("https://") !== 0) {
      this._assertFormat();
    }
    return value.replace(/\/+$/, "");
  }

  asEnum(listValues) {
    this._setType("enum: " + listValues.join(", "));
    this._assertIsRequired();
    let value = this._getValueOrDefault();
    if (value === undefined) return undefined;
    value = value.toLowerCase();
    const enums = listValues.map((i) => i.toLowerCase());
    if (!enums.includes(value)) this._assertEnum();
    return value;
  }

  asArrayString() {
    this._setType("string[]");
    this._assertIsRequired();
    let value = this._getValueOrDefault();
    if (value === undefined) return undefined;
    return value.split(",").map((i) => i.trim());
  }

  export() {
    return {
      value: this.value,
      variable: this.envName,
      context: this.context,
      required: this._isRequired,
      description: this._descriptionText,
      type: this._type,
      example: this._exampleText,
      default: this._defaultValue,
    };
  }

  _assertIsRequired() {
    if (
      this._isRequired &&
      this.value === undefined &&
      this._defaultValue === undefined
    ) {
      const params = this._createErrorParams();
      throw new RequiredError(
        `Required environment variable '${this.envName}'`,
        params
      );
    }
  }

  _assertFormat() {
    const params = this._createErrorParams();
    throw new FormatError(
      `Not valid format for environment variable '${this.envName}'`,
      params
    );
  }

  _assertEnum() {
    const params = this._createErrorParams();
    throw new EnumNotFoundError(
      `Not found item '${this.value}' for environment variable '${this.envName}'`,
      params
    );
  }

  _getValueOrDefault() {
    let value = this.value;
    if (value === undefined && this._defaultValue !== undefined) {
      value = this._defaultValue;
    }

    return value;
  }

  _createErrorParams() {
    return {
      envName: this.envName || "",
      value: this.value || "",
    };
  }

  /**
   * @param {String} type 
   */
  _setType(type) {
    this._type = type;
  }
}

module.exports = {
  ConfigItem
}