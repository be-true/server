const metatests = require("metatests");
const { Response } = require("../../server");
const { streamToJson } = require("../../server/utils");

metatests.testSync("Response: toJSON()", (test) => {
    const response = new Response({ key: "value" });
    test.strictEqual(response.toJSON(), {
        code: 200,
        status: "Success",
        result: { key: "value" }
    });
});

metatests.testAsync("Response: toStream()", async (test) => {
    const response = new Response({ to: "stream" });
    test.strictEqual(await streamToJson(response.toStream()), {
        code: 200,
        status: "Success",
        result: { to: "stream" },
    });
});

metatests.testSync("Response: setCode()", (test) => {
    const response = new Response({});
    test.strictEqual(response.setCode(300).toJSON()["code"], 300);
});

metatests.testSync("Response: setStatus()", (test) => {
    const response = new Response({});
    test.strictEqual(response.setStatus("Error").toJSON()["status"], "Error");
});

metatests.testSync("Response: setResult()", (test) => {
    const response = new Response({});
    test.strictEqual(response.setResult({ any: "result" }).toJSON()["result"], { any: "result" });
});

metatests.testAsync("Response: with Buffer", async (test) => {
    const json = { hello: "world" };
    const response = new Response(Buffer.from(JSON.stringify(json)));
    test.strictEqual(await streamToJson(response.toStream()), json);
});

metatests.testSync("Response: set headers", (test) => {
    const headers = { 
        "Content-Length": 123, 
        'Content-Type': 'application/json'
    };
    const response = new Response()
        .setHeaders(headers)
        .setHeader('X-Request-ID', 'asd');
    test.strictEqual(response.getHeaders(), { 
        ...headers, 
        'X-Request-ID': 'asd'
    });
});

metatests.testSync("Response: set headers empty values", (test) => {
    const headers = { 
        "Content-Length": 123, 
        'Content-Type': undefined,
        'Content-Disposition': null,
        'X-Request-Id': '',
    };
    const response = new Response().setHeaders(headers)
    test.strictEqual(response.getHeaders(), { 
        "Content-Length": 123
    });
});
