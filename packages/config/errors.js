class ErrorBase extends Error {}
class ConfigItemError extends ErrorBase {
    constructor(message, params) {
        super(message);
        this.params = params;
    }
}
class RequiredError extends ConfigItemError {};
class FormatError extends ConfigItemError {};
class EnumNotFoundError extends FormatError {};
class ConfigInitError extends ErrorBase {
    constructor(params) {
        super("Configuration init error");
        this.params = params;
    }
}

module.exports = {
    RequiredError,
    FormatError,
    EnumNotFoundError,
    ConfigInitError
}