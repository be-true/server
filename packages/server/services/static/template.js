const path = require("path");
const fs = require('fs/promises');
const fsOld = require('fs');
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
        const root = this.#root.replace(/\/+$/, '');
        const file = ('/' + this.#path).replace(/\/+/, '/').replace(/\/+$/, '').replace(root, '');
        const prefix = ('/' + this.#prefix).replace(/\/+/, '/').replace(/\/+$/, '');
        return `${prefix}${file}`.toLowerCase();
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
        return fs.readFile(this.#path);
    }

    #build() {
        const readable = fsOld.createReadStream(this.#pathTemplate);
        const write = fsOld.createWriteStream(this.#path);
        readable.pipe(write);
        return new Promise((resolve, reject) => {
            readable.on('end', () => resolve());
            readable.on('error', reject);
        });
    }

    async export() {
        if (this.#isTemplate()) await this.#build();
        const stat = await fs.lstat(this.#path);
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