function checkIfLowPoint(grid: number[][], x: number, y: number): boolean {
  return (
    grid[y][x] < (grid[y + 1]?.[x] ?? 10) &&
    grid[y][x] < (grid[y - 1]?.[x] ?? 10) &&
    grid[y][x] < (grid[y]?.[x + 1] ?? 10) &&
    grid[y][x] < (grid[y]?.[x - 1] ?? 10)
  );
}

function getLowestPoints(grid: number[][]): any {
  const lowestPoints: number[] = [];
  const lowestPointPos: string[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (checkIfLowPoint(grid, x, y)) {
        lowestPoints.push(grid[y][x]);
        lowestPointPos.push(`${x},${y}`);
      }
    }
  }
  return [lowestPoints, lowestPointPos];
}

export const partOne = (data: string) => {
  const parsed = data.split("\n").map((line) => line.split("").map(Number));

  const [lowestPoints] = getLowestPoints(parsed);

  return (lowestPoints as number[]).reduce((a, b) => a + b + 1, 0);
};

function dfs(
  grid: number[][],
  visited: Record<string, boolean>,
  x: number,
  y: number
): number {
  if (grid[y]?.[x] === undefined || visited[`${x},${y}`] || grid[y][x] === 9) {
    // console.log(
    //   `${x}, ${y} doesn't exist, has already been visited, or reached a 9`
    // );
    return 0;
  }

  visited[`${x},${y}`] = true;

  return (
    1 +
    dfs(grid, visited, x + 1, y) +
    dfs(grid, visited, x - 1, y) +
    dfs(grid, visited, x, y + 1) +
    dfs(grid, visited, x, y - 1)
  );
}

export const partTwo = (data: string) => {
  const parsed = data.split("\n").map((line) => line.split("").map(Number));

  const [, lowestPointPos] = getLowestPoints(parsed);

  const visited: Record<string, boolean> = {};

  const basins: number[] = lowestPointPos.map((pos: any) => {
    const [x, y] = pos.split(",").map(Number);
    return dfs(parsed, visited, x, y);
  });

  return basins
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3)
    .reduce((a, b) => a * b);
};
