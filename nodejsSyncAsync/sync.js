const fs = require("fs");

console.log("Start");
const data = fs.readFileSync("file.txt");
console.log(data.toString());
console.log("End");
// blocking code
// sync code
// single threaded
// one task at a time
// line by line execution
// jvm
