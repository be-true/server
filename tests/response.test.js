const metatests = require("metatests");
const { Response } = require("../lib");
const { streamToJson } = require("../lib/utils");

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
