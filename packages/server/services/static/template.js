const path = require("path");
const fsProm = require('fs/promises');
const fs = require('fs');
const { once } = require('events');
const { mime } = require('../../../utils');

class Template {
    #root;
    #prefix;
    #pathTemplate;
    #path;

    constructor(path, root, prefix) {
        this.#root = root;
        this.#prefix = prefix;
        this.#pathTemplate = path;
        this.#path = path;
        if (this.#isTemplate()) {
            this.#path = path.replace('.tmpl', '');
        }
    }

    getKey() {
        const relative = path.relative(this.#root, this.#path);
        return path.join(this.#prefix, relative).toLowerCase();
    }

    #isTemplate() {
        return this.#pathTemplate.indexOf('.tmpl.') !== -1;
    }

    #getFile() {
        return path.basename(this.#path);
    }

    #getExt() {
        return path.extname(this.#path);
    }

    async #readFile() {
        return fsProm.readFile(this.#path);
    }

    #build() {
        const readable = fs.createReadStream(this.#pathTemplate);
        const write = fs.createWriteStream(this.#path);
        readable.pipe(write);
        return once(write, 'finish');
    }

    async export() {
        if (this.#isTemplate()) await this.#build();
        const stat = await fsProm.lstat(this.#path);
        return {
            size: stat.size,
            file: this.#getFile(),
            buffer: await this.#readFile(),
            ext: this.#getExt(),
            mime: mime(this.#getExt()),
        };
    }
}

module.exports = {
    Template
}