'use_strict'

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { fileExist } = require("@be-true/utils");
const { SQLiteConfig } = require("./config");

class SQLiteService {
    #config = '';

    static service() {
        return {
            name: 'sqlite',
            config: new SQLiteConfig()
        }
    }

    constructor(di, config) {
        this.#config = config ?? new SQLiteConfig();
    }

    async start() {
        const exist = await fileExist(this.#config.filename);
        if (!exist) throw new Error(`Нет файла по указанному пути '${this.#config.filename}'`);
        const db = await open({
            filename: this.#config.filename,
            driver: sqlite3.Database
        })
        return db;
    }
}

module.exports = {
    SQLiteService
};