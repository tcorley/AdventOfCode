/**
 * https://adventofcode.com/2020/day/6
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  console: false,
});

// part one

// // keep track of the counts of correct answers
// let groupCounts = [];
// // and also a 'current' group that is processing
// let currentGroupSet = new Set();

// readInterface.on("line", function (line) {
//   if (line.length) {
//     // add the characters each to the set
//     line.split("").forEach((char) => currentGroupSet.add(char));
//   } else {
//     // we've hit a blank line - time to process
//     // push the size of the set
//     groupCounts.push(currentGroupSet.size);
//     // then clear the current set
//     currentGroupSet = new Set();
//   }
// });

// readInterface.on("close", function () {
//   // this accounts for when the data doesn't not end with a blank line - process the set
//   if (currentGroupSet.size) {
//     groupCounts.push(currentGroupSet.size);
//     currentGroupSet = new Set();
//   }

//   console.log(
//     `Processed ${
//       groupCounts.length
//     } groups and the sum of counts is ${groupCounts.reduce(
//       (acc, count) => acc + count,
//       0
//     )} `
//   );
// });

// part 2

// keep track of the counts again from last time
let groupCounts = [];
// but this time, we want to store each of the people's answers as individual sets
let currentGroup = [];

// to find shared answers between people, we can interset each of the sets to find
// shared answers
const intersectSets = (group) =>
  group
    .slice(1)
    .reduce(
      (accSet, set) => new Set([...accSet].filter((x) => set.has(x))),
      group[0]
    );

readInterface.on("line", function (line) {
  if (line.length) {
    // push the entire set into the current array
    currentGroup.push(new Set(line.split("")));
  } else {
    // find the intersection of each set. if only one set, return that
    const intersectedSet =
      currentGroup.length === 1 ? currentGroup[0] : intersectSets(currentGroup);
    groupCounts.push(intersectedSet.size);
    currentGroup = [];
  }
});

readInterface.on("close", function () {
  // again, account for the last of the data processed
  if (currentGroup.length) {
    const intersectedSet =
      currentGroup.length === 1 ? currentGroup[0] : intersectSets(currentGroup);
    groupCounts.push(intersectedSet.size);
    currentGroup = [];
  }

  console.log(
    `Processed ${
      groupCounts.length
    } groups and the sum of counts is ${groupCounts.reduce(
      (acc, count) => acc + count,
      0
    )} `
  );
});
