/**
 * https://adventofcode.com/2020/day/9
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  console: false,
});

const lines = [];
let preambleSize = 25; //change from 5 to 25 based on working with small or full data

readInterface.on("line", function (line) {
  lines.push(Number.parseInt(line))
});

const findInvalidNumber = () => {
  for (let i = preambleSize; i < lines.length; i++) {
    const preamble = lines.slice(i - preambleSize, i)
    if(!preamble.some(item => preamble.includes(lines[i]-item))) {
      return lines[i]
    }
  }
  throw new Error('no invalid numbers found')
}

const findContiguousMinMaxDifference = (target) => {
  for (const [index, item] of lines.entries()) {
    let buffer = [item]
    for (const endOfSet of lines.slice(index + 1)) {
      buffer.push(endOfSet)
      const accumulation = buffer.reduce((acc, i) => acc + i, 0)
      if (accumulation === target) {
        return Math.max(...buffer) + Math.min(...buffer)
      } else if (accumulation > target) {
        break;
      }
    }
    buffer = []
  }
}

readInterface.on("close", function () {
  const invalidNumber = findInvalidNumber();
  // part one
  console.log(`First item to break the pattern is ${invalidNumber}`)

  // part two
  console.log(`The min max of the contiguous set is ${findContiguousMinMaxDifference(invalidNumber)}`)
  
});
