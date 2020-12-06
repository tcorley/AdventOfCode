/**
 * https://adventofcode.com/2020/day/<n>
 */
const readline = require("readline");
const fs = require("fs");
const { join } = require("path");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  // use this for just one input
  // input: fs.createReadStream("./small.txt"),
  console: false,
});

let maxId = -1;
let filledSeats = [];
let openSeats = [];

const traverse = (characters, min, max) => {
  if (characters.length === 1) {
    return ["B", "R"].includes(characters) ? max : min;
  } else {
    if (["B", "R"].includes(characters[0])) {
      return traverse(
        characters.substring(1),
        max - Math.floor((max - min) / 2),
        max
      );
    } else {
      return traverse(
        characters.substring(1),
        min,
        min + Math.floor((max - min) / 2)
      );
    }
  }
};

readInterface.on("line", function (line) {
  const column = traverse(line.slice(line.length - 3), 0, 7);
  const row = traverse(line.slice(0, line.length - 3), 0, 127);

  const seatId = row * 8 + column;
  filledSeats.push({ row, column, seatId });
  maxId = Math.max(maxId, seatId);
});

readInterface.on("close", function () {
  console.log(`The highest seat id is ${maxId}`);

  // for part 2, get the ids from the saved seats
  let idArray = [];

  filledSeats.forEach((seat) => idArray.push(seat.seatId));

  // sort them numerically
  const sortedIds = idArray.sort((a, b) => a - b);

  // then iterate over, checking if the next value in the
  // loop contains next id value. If it doesn't, that's
  // the missing seat ID!
  for (const [index, id] of sortedIds.entries()) {
    if (id + 1 !== sortedIds[index + 1] && index !== idArray.length - 1) {
      console.log(`missing ID is ${id + 1}`);
      break;
    }
  }
});
