const { promises } = require("fs");
const path = require("path");

const read = async () => {
  const result = promises.readFile(
    path.join(__dirname, "package.json"),
    "utf-8",
  );
  return result;
};

read();

console.log("hi first");

read().then((f) => console.log(f));
