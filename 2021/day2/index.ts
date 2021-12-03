import { convertToTokenizedArray } from "../../utils/index.ts";

export const partOne = (data: string) => {
  const formattedData = convertToTokenizedArray(data);

  let horizontalPos = 0;
  let depth = 0;

  formattedData.forEach(([direction, units]) => {
    const parsedUnits = parseInt(units);
    if (direction === "forward") {
      horizontalPos += parsedUnits;
    } else if (direction === "down") {
      depth += parsedUnits;
    } else if (direction === "up") {
      depth -= parsedUnits;
    }
  });
  return `Horizontal position of ${horizontalPos} and depth of ${depth} results in ${
    horizontalPos * depth
  }`;
};

export const partTwo = (data: string) => {
  const formattedData = convertToTokenizedArray(data);

  let horizontalPos = 0;
  let depth = 0;
  let aim = 0;

  formattedData.forEach(([direction, units]) => {
    const parsedUnits = parseInt(units);
    if (direction === "forward") {
      horizontalPos += parsedUnits;
      depth += parsedUnits * aim;
    } else if (direction === "down") {
      aim += parsedUnits;
    } else if (direction === "up") {
      aim -= parsedUnits;
    }
  });
  return `Horizontal position of ${horizontalPos} and depth of ${depth} results in ${
    horizontalPos * depth
  }`;
};
