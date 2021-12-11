const directionalMove = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export const partOne = (data: string) => {
  const parsed = data.split("\n").map((line) => line.split("").map(Number));
  const STEPS = 100;

  let flashCount = 0;

  Array(STEPS)
    .fill(0)
    .forEach(() => {
      const flashes: string[] = [];

      // model one step
      parsed.forEach((column, y) => {
        column.forEach((_cell, x) => {
          if (parsed[x][y] === 9) {
            flashes.push(`${x},${y}`);
            flashCount++;
            parsed[x][y] = 0;
          } else {
            parsed[x][y]++;
          }
        });
      });

      // iterate flashes and increment all adjacent cells by one,
      // and if 9 then set to -1 and add to flashes array
      while (flashes.length) {
        const flash = flashes.shift()!;
        const [x, y] = flash.split(",").map(Number);
        directionalMove.forEach(([dx, dy]) => {
          const adjacentCell = parsed[x + dx]?.[y + dy];
          if (adjacentCell !== undefined && adjacentCell !== 0) {
            parsed[x + dx][y + dy]++;
            if (adjacentCell === 9) {
              flashes.push(`${x + dx},${y + dy}`);
              flashCount++;
              parsed[x + dx][y + dy] = 0;
            }
          }
        });
      }
    });

  return flashCount;
};

export const partTwo = (data: string) => {
  const parsed = data.split("\n").map((line) => line.split("").map(Number));
  const STEPS = 1000;

  let flashCount = 0;
  let currentStep = 0;

  Array(STEPS)
    .fill(0)
    .every(() => {
      currentStep++;
      const flashes: string[] = [];

      // model one step
      parsed.forEach((column, y) => {
        column.forEach((_cell, x) => {
          if (parsed[x][y] === 9) {
            flashes.push(`${x},${y}`);
            flashCount++;
            parsed[x][y] = 0;
          } else {
            parsed[x][y]++;
          }
        });
      });

      // iterate flashes and increment all adjacent cells by one,
      // and if 9 then set to -1 and add to flashes array
      while (flashes.length) {
        const flash = flashes.shift()!;
        const [x, y] = flash.split(",").map(Number);
        directionalMove.forEach(([dx, dy]) => {
          const adjacentCell = parsed[x + dx]?.[y + dy];
          if (adjacentCell !== undefined && adjacentCell !== 0) {
            parsed[x + dx][y + dy]++;
            if (adjacentCell === 9) {
              flashes.push(`${x + dx},${y + dy}`);
              flashCount++;
              parsed[x + dx][y + dy] = 0;
            }
          }
        });
      }

      if (parsed.every((row) => row.every((cell) => cell === 0))) {
        return false;
      } else {
        return true;
      }
    });

  return currentStep;
};
