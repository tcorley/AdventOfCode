function parseData(data: string) {
  const [coordinates, rawInstructions] = data
    .split("\n\n")
    .map((section) => section.split("\n"));
  const instructions = rawInstructions.map((i) => i.split(" ")[2].split("="));

  return { coordinates, instructions };
}

function findMaxCoordinateValues(coordinates: string[]) {
  const maxX = coordinates
    .map((c) => Number(c.split(",")[0]))
    .reduce((a, b) => Math.max(a, b));
  const maxY = coordinates
    .map((c) => Number(c.split(",")[1]))
    .reduce((a, b) => Math.max(a, b));
  return [maxX, maxY];
}

function renderPaper(coordinates: string[]) {
  const [maxX, maxY] = findMaxCoordinateValues(coordinates);

  Array(maxY + 1)
    .fill(0)
    .forEach((_, y) => {
      let line = "";
      Array(maxX + 1)
        .fill(0)
        .forEach((_, x) => {
          if (coordinates.includes(`${x},${y}`)) {
            line += "#";
          } else {
            line += ".";
          }
        });
      console.log(line);
    });
}

function processInstruction(
  coordinates: string[],
  axis: string,
  amount: number
) {
  coordinates
    .map((c) => c.split(",").map(Number))
    .forEach((coordinate, index) => {
      if (axis === "x" && coordinate[0] > amount) {
        coordinate[0] = amount - (coordinate[0] - amount);
      } else if (axis === "y" && coordinate[1] > amount) {
        coordinate[1] = amount - (coordinate[1] - amount);
      }
      coordinates[index] = coordinate.join(",");
    });

  // remove duplicates (overlaps)
  return [...new Set(coordinates)];
}

export const partOne = (data: string) => {
  const { coordinates, instructions } = parseData(data);

  // only process the first instruction
  const changedCoordinates = processInstruction(
    coordinates,
    instructions[0][0],
    parseInt(instructions[0][1])
  );

  return changedCoordinates.length;
};

export const partTwo = (data: string) => {
  const { coordinates, instructions } = parseData(data);

  const finalCoordinates = instructions.reduce(
    (coords, instruction) =>
      processInstruction(coords, instruction[0], Number(instruction[1])),
    coordinates
  );

  renderPaper(finalCoordinates);

  return "see render";
};
