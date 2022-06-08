const { Readable } = require('stream');

function stringToStream(text) {
    const stream = new Readable();
    stream._read = () => {};
    process.nextTick(() => {
        stream.push(text);
        stream.push(null);
    })

    return stream;
}

module.exports = {
    stringToStream
}