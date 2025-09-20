const fs = require("fs");

console.log("Start");
const data = fs.readFile("file.txt", (err, data) =>
  console.log(data.toString())
);
console.log("End");
