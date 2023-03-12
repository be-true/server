'use_strict'

const { Config } = require('@be-true/config');

class SQLiteConfig extends Config {
    constructor() {
        super();
        this.filename = this.param('filename')
            .fromEnv('SQLITE_FILENAME')
            .description('Путь к SQLite файлу')
            .asString();
    }
}

module.exports = {
    SQLiteConfig
};