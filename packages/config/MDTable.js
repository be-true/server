const defaultOptions = {};

class MDTable {
    columns = [];
    columnWidth = new Map();
    options = {};

    constructor(data, options) {
        this.options = {
            ...options,
            ...defaultOptions
        };
        this.data = data;

        this.init();
    }

    init() {
        this._makeColumns();
        this._calcColumnWidth();
    }

    _makeColumns() {
        if (this.options.columns !== undefined) {
            this.columns = this.options.columns;
            return;
        }

        const columns = new Set();
        this.data.forEach(i => {
            Object.entries(i).forEach(([key, _]) => {
                columns.add(key);
            })
        })
        this.columns = [...columns];
    }

    _calcColumnWidth() {
        const result = new Map();

        // Add header to data fot calculate length
        const headerData = {};
        this.columns.forEach(i => headerData[i] = i);
        const data = [...this.data, headerData];

        data.forEach(i => {
            Object.entries(i).forEach(([key, value]) => {
                const length = String(value ?? "").trim().length
                if (!result.has(key)) {
                    result.set(key, length);
                } else {
                    if ((result.get(key) ?? 0) < length) {
                        result.set(key, length)
                    }
                }
            })
        });

        this.columnWidth = result;
    }

    _textAsWidth(text, width) {
        if (width === undefined) return text;
        let spaces = width - text.length;
        if (spaces < 0) spaces = 0;
        return text.trim() + " ".repeat(spaces);
    }

    _renderHeader() {
        let header = '| ';

        const last = this.columns.length;
        this.columns.forEach((i, index) => {
            const width = this.columnWidth.get(i);
            header += this._textAsWidth(i, width);
            header += last === (index + 1) ? " |" : " | ";
        });

        return header;
    }

    _renderHeaderSplit() {
        let header = '|';

        const last = this.columns.length;
        this.columns.forEach((i, index) => {
            const width = this.columnWidth.get(i) ?? 0;
            header += "-".repeat(width + 2) + "|";
        });

        return header;
    }

    _renderRow(item) {
        if (typeof item === 'string') return `| ${item} |`
        let row = '| ';

        const last = this.columns.length;
        this.columns.forEach((key, index) => {
            const text = String(item[key] ?? '');
            const width = this.columnWidth.get(key) ?? 0;
            row += this._textAsWidth(text, width);
            row += last === (index + 1) ? " |" : " | ";
        });

        return row;
    }

    toString() {
        return [
            this._renderHeader(),
            this._renderHeaderSplit(),
            ...this.data.map((item) => this._renderRow(item)),
        ].join("\n");
    }
}

module.exports = {
    MDTable
}