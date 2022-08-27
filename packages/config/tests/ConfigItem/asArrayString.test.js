const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testSync("ConfigItem: asArrayString. Success", (test) => {
  const item = new ConfigItem("a,b,c").asArrayString();
  test.strictEqual(item, ["a", "b", "c"]);
});

metatests.testSync("ConfigItem: asArrayString. With spaces", (test) => {
  const item = new ConfigItem(" a , b , c").asArrayString();
  test.strictEqual(item, ["a", "b", "c"]);
});

metatests.testSync("ConfigItem: asArrayString. Only one", (test) => {
  const item = new ConfigItem("a").asArrayString();
  test.strictEqual(item, ["a"]);
});
