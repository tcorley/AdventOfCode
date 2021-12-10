/**
 * https://adventofcode.com/2020/day/11
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  console: false,
});

let grid = [];
const EMPTY_SEAT = "L";
const OCCUPIED_SEAT = "#";
const FLOOR = ".";

const printGrid = (separator) => {
  if (separator) console.log(Array(grid[0].length).fill("~").join(""));
  for (const row of grid) {
    console.log(row.join(""));
  }
  if (separator) console.log(Array(grid[0].length).fill("~").join(""));
};

const noAdjacentSeats = (i, j) => {
  if (
    (i - 1 < 0 || j - 1 < 0 || grid[i - 1][j - 1] !== OCCUPIED_SEAT) &&
    (i - 1 < 0 || grid[i - 1][j] !== OCCUPIED_SEAT) &&
    (i - 1 < 0 ||
      j + 1 >= grid[j].length ||
      grid[i - 1][j + 1] !== OCCUPIED_SEAT) &&
    (j - 1 < 0 || grid[i][j - 1] !== OCCUPIED_SEAT) &&
    (j + 1 >= grid[j].length || grid[i][j + 1] !== OCCUPIED_SEAT) &&
    (i + 1 >= grid.length ||
      j - 1 < 0 ||
      grid[i + 1][j - 1] !== OCCUPIED_SEAT) &&
    (i + 1 >= grid.length || grid[i + 1][j] !== OCCUPIED_SEAT) &&
    (i + 1 >= grid.length ||
      j + 1 >= grid[j].length ||
      grid[i + 1][j + 1] !== OCCUPIED_SEAT)
  ) {
    return true;
  } else {
    return false;
  }
};

const shouldBecomeEmpty = (i, j) => {
  let count = 0;
  // left top
  if (i - 1 >= 0 && j - 1 >= 0 && grid[i - 1][j - 1] === OCCUPIED_SEAT) {
    count += 1;
  }
  // center top
  if (i - 1 >= 0 && grid[i - 1][j] === OCCUPIED_SEAT) {
    count += 1;
  }
  // right top
  if (
    i - 1 >= 0 &&
    j + 1 < grid[j].length &&
    grid[i - 1][j + 1] === OCCUPIED_SEAT
  ) {
    count += 1;
  }
  // left
  if (j - 1 >= 0 && grid[i][j - 1] === OCCUPIED_SEAT) {
    count += 1;
  }
  // right
  if (j + 1 < grid[j].length && grid[i][j + 1] === OCCUPIED_SEAT) {
    count += 1;
  }
  // left bottom
  if (
    i + 1 < grid.length &&
    j - 1 >= 0 &&
    grid[i + 1][j - 1] === OCCUPIED_SEAT
  ) {
    count += 1;
  }
  // center bottom
  if (i + 1 < grid.length && grid[i + 1][j] === OCCUPIED_SEAT) {
    count += 1;
  }
  // right bottom
  if (
    i + 1 < grid.length &&
    j + 1 < grid[j].length &&
    grid[i + 1][j + 1] === OCCUPIED_SEAT
  ) {
    count += 1;
  }
  return count >= 4;
};

const doRound = () => {
  let gridInProgress = [];
  for (let i = 0; i < grid.length; i++) {
    gridInProgress.push([]);
    for (let j = 0; j < grid[i].length; j++) {
      switch (grid[i][j]) {
        case OCCUPIED_SEAT:
          // TODO
          if (shouldBecomeEmpty(i, j)) {
            gridInProgress[i][j] = EMPTY_SEAT;
          } else {
            gridInProgress[i][j] = OCCUPIED_SEAT;
          }
          break;
        case EMPTY_SEAT:
          if (noAdjacentSeats(i, j)) {
            gridInProgress[i][j] = OCCUPIED_SEAT;
          } else {
            gridInProgress[i][j] = grid[i][j];
          }
          break;
        case FLOOR:
          // nothing needed
          gridInProgress[i][j] = grid[i][j];
          break;
        default:
          break;
      }
    }
  }
  return gridInProgress;
};

const getOccupiedSeats = (currentGrid) => {
  return currentGrid.reduce(
    (acc, row) =>
      acc +
      row.reduce((bcc, seat) => bcc + (seat === OCCUPIED_SEAT ? 1 : 0), 0),
    0
  );
};

const gridsEqual = (currentGrid) => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].join("") !== currentGrid[i].join("")) return false;
  }
  return true;
};

readInterface.on("line", function (line) {
  grid.push(line.split(""));
});

readInterface.on("close", function () {
  // printGrid(true);
  // console.log(`{0,0} has no adjacent seats? ${noAdjacentSeats(0, 0)}`);
  // console.log(`Occupied: ${getOccupiedSeats(grid)} seats`);
  // let gridInProgress = doRound();

  // grid = gridInProgress;
  // printGrid(true);
  // console.log(`Occupied: ${getOccupiedSeats(gridInProgress)} seats`);

  // gridInProgress = doRound();
  // grid = gridInProgress;
  // printGrid(true);
  // console.log(`Occupied: ${getOccupiedSeats(gridInProgress)} seats`);
  let gridInProgress = doRound();
  let roundCount = 1;

  while (!gridsEqual(gridInProgress)) {
    grid = gridInProgress;
    gridInProgress = doRound();
    roundCount++;
  }

  console.log(`Chaos for ${roundCount} rounds`);
  console.log(`Occupied Seats: ${getOccupiedSeats(gridInProgress)}`);
});
