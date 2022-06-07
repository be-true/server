async function streamToJson(stream) {
    let buffers = [];
    for await (let chunk of stream) buffers.push(chunk);
    const body = Buffer.concat(buffers).toString();
    return JSON.parse(body);
}

module.exports = {
    streamToJson
}