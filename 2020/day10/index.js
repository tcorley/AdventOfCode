/**
 * https://adventofcode.com/2020/day/10
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  console: false,
});

let lines = [];

readInterface.on("line", function (line) {
  lines.push(Number.parseInt(line));
});

// part one
// readInterface.on("close", function () {
//   const sorted = lines.sort((a, b) => a - b)
//   const tally = [0,0,0]

//   // handle first plus initial case
//   tally[sorted[0]-1] += 1

//   for (let i = 0; i < sorted.length; i++) {
//     if (i === sorted.length - 1) {
//       tally[2] += 1
//     } else {
//       const joltDiff = sorted[i + 1] - sorted[i]
//       tally[joltDiff - 1] += 1
//     }
//   }

//   console.log(tally)
//   console.log(`The number of 1-jolt differences multiplied by the number of 3-jolt differences is ${tally[0] * tally[2]}`)
// });

// part two
const cache = {}

const countArrangements = (adapters) => {
  if (adapters.length === 1) {
    return 1
  } else {
    const currentAdapter = adapters.shift();
    let count = 0;
    [currentAdapter + 1, currentAdapter + 2, currentAdapter + 3].forEach(potentialNext => {
      if (adapters.includes(potentialNext)) {
        const subArray = adapters.slice(adapters.indexOf(potentialNext))
        // Memoization is key!!
        const cacheKey = subArray.join(',')
        if(!cache[cacheKey]) {
          cache[cacheKey] = countArrangements(subArray);
        }
        count += cache[cacheKey]
      }
    })
    return count;
  }
}

readInterface.on("close", function () {
  let sorted = lines.sort((a,b) => a-b)
  const more = [0, ...sorted, sorted[sorted.length - 1] + 3]

  console.log(more)

  console.log(countArrangements(more))
});