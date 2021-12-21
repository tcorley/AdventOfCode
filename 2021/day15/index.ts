import dijkstra from "dijkstra";
import chalkin from "chalkin";

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

function createGraph(grid: number[][]) {
  const graph: Record<string, Record<string, number>> = {};

  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[j].length; i++) {
      graph[`${j},${i}`] = {};
      directions.forEach((direction) => {
        const x = i + direction.x;
        const y = j + direction.y;
        if (x < 0 || y < 0 || x >= grid[j].length || y >= grid.length) return;
        graph[`${j},${i}`][`${y},${x}`] = grid[y][x];
      });
    }
  }

  return graph;
}

function extendGrid(grid: number[][]) {
  const gridYLength = grid.length;
  const gridXLength = grid[0].length;
  const newGrid = Array(gridYLength * 5)
    .fill(0)
    .map(() => Array(gridXLength * 5).fill(0));

  for (let y = 0; y < gridYLength; y++) {
    for (let x = 0; x < gridXLength; x++) {
      for (let y2 = 0; y2 < 5; y2++) {
        for (let x2 = 0; x2 < 5; x2++) {
          let newValue = grid[y][x] + y2 + x2;
          if (newValue > 9) {
            newValue = (newValue % 10) + 1;
          }
          newGrid[y + y2 * gridYLength][x + x2 * gridXLength] = newValue;
        }
      }
    }
  }

  return newGrid;
}

// deno-lint-ignore no-unused-vars
function printGrid(grid: number[][]) {
  grid.forEach((row) => {
    console.log(row.join(""));
  });
  console.log("******************");
}

// deno-lint-ignore no-unused-vars
function printPath(grid: number[][], path: string[]) {
  for (let y = 0; y < grid.length; y++) {
    let line = "";
    for (let x = 0; x < grid[y].length; x++) {
      if (path.includes(`${y},${x}`)) {
        line += chalkin.green(grid[y][x]);
      } else {
        line += chalkin.gray(grid[y][x]);
      }
    }
    console.log(line);
  }
}

export const partOne = (data: string) => {
  const grid = data.split("\n").map((line) => line.split("").map(Number));
  const graph = createGraph(grid);

  const path = dijkstra.find_path(
    graph,
    "0,0",
    `${grid[0].length - 1},${grid.length - 1}`
  );

  // printPath(grid, path);

  return path.slice(1).reduce((acc, node) => {
    const [y, x] = node.split(",").map(Number);
    return acc + grid[y][x];
  }, 0);
};

export const partTwo = (data: string) => {
  const grid = data.split("\n").map((line) => line.split("").map(Number));
  const extendedGrid = extendGrid(grid);
  const graph = createGraph(extendedGrid);

  // this is the bottleneck
  const path = dijkstra.find_path(
    graph,
    "0,0",
    `${grid[0].length * 5 - 1},${grid.length * 5 - 1}`
  );

  // for the actual data, you'll need to really reduce the
  // text size in the console to prevent wrap around
  // printPath(extendedGrid, path);

  return path.slice(1).reduce((acc, node) => {
    const [y, x] = node.split(",").map(Number);
    return acc + extendedGrid[y][x];
  }, 0);
};
