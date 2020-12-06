/**
 * https://adventofcode.com/2020/day/<n>
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  console: false,
});

let lines = [];

readInterface.on("line", function (line) {
  // either do something with the line
  console.log(line);
  // or add input to a structur
  lines.push(line);
});

readInterface.on("close", function () {
  // do something after all lines have been read
  console.log(lines);
});
