'use_strict'
const stream = require('stream');

class Transform extends stream.Transform {
    _transform(chunk, encoding, callback) {
        callback(null, chunk)
    }
}

module.exports = {
    Transform
}