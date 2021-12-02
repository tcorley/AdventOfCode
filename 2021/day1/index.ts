import { convertToNumberArray } from "../../utils/index.ts";

export const partOne = (data: string) => {
  const formattedData = convertToNumberArray(data);

  return formattedData.reduce(
    (acc, current, index) =>
      acc + (index !== 0 && current > formattedData[index - 1] ? 1 : 0),
    0
  );
};

export const partTwo = (data: string) => {
  const formattedData = convertToNumberArray(data);

  let increases = 0;
  let prev = 0;
  Array(formattedData.length - 3 + 1)
    .fill(0)
    .forEach((_, i) => {
      const sum = [0, 1, 2]
        .map((j) => formattedData[i + j])
        .reduce((acc, curr) => acc + curr, 0);
      if (prev !== 0) {
        if (sum > prev) {
          increases++;
        }
      }
      prev = sum;
    });

  return increases;
};
