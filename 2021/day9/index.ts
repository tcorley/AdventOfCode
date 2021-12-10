function checkIfLowPoint(grid: number[][], x: number, y: number): boolean {
  return (
    grid[x][y] < (grid[x + 1]?.[y] ?? 10) &&
    grid[x][y] < (grid[x - 1]?.[y] ?? 10) &&
    grid[x][y] < (grid[x]?.[y + 1] ?? 10) &&
    grid[x][y] < (grid[x]?.[y - 1] ?? 10)
  );
}

export const partOne = (data: string) => {
  const parsed = data.split("\n").map((line) => line.split("").map(Number));
  const lowPoints: number[] = [];
  parsed.forEach((row, x) => {
    row.forEach((_, y) => {
      if (checkIfLowPoint(parsed, x, y)) {
        lowPoints.push(parsed[x][y] + 1);
      }
    });
  });

  return lowPoints.reduce((a, b) => a + b);
};

export const partTwo = (data: string) => {};
