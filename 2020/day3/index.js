/**
 * https://adventofcode.com/2020/day/3
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  console: false,
});

const treeMap = [];
const tree = "#";

readInterface.on("line", function (line) {
  treeMap.push(line);
});

const traverse = (moveRight, moveDown) => {
  let xCoordinate = 0;
  let totalSpaces = 0;
  let openSpaces = 0;
  let encounteredTrees = 0;
  let moveDownIterator = moveDown;

  for (const line of treeMap) {
    // We make sure here that it's appropriate to parse this line if we've
    // traversed down the correct amount of steps
    if (moveDownIterator === moveDown) {
      if (line[xCoordinate] === tree) {
        encounteredTrees++;
      } else {
        openSpaces++;
      }
      // because the pattern repeats to the right, make sure to wrap around the x coordinate
      xCoordinate = (xCoordinate + moveRight) % line.length;
    }

    moveDownIterator = moveDownIterator - 1;
    if (moveDownIterator === 0) {
      moveDownIterator = moveDown;
    }

    totalSpaces++;
  }
  return { totalSpaces, encounteredTrees, openSpaces };
};

// Part one
// readInterface.on("close", function () {
//   const [threeRun] = [[3, 1]].map(([moveRight, moveDown]) =>
//     traverse(moveRight, moveDown)
//   );
//   console.log(
//     `Out of ${threeRun.totalSpaces} spaces, encountered ${threeRun.encounteredTrees} trees and ${threeRun.openSpaces} open spaces`
//   );
// });

// Part two
readInterface.on("close", function () {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const runs = slopes.map(([moveRight, moveDown]) =>
    traverse(moveRight, moveDown)
  );
  console.log(
    `Slopes: ${slopes.length}`,
    `Multiplied Run Value: ${JSON.stringify(
      runs.reduce((accum, run) => accum * run.encounteredTrees, 1)
    )}`
  );
});
