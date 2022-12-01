import { convertToNumberArray } from '../../utils/index.ts';

const getCalorieTotals = (totals: number[]) => {
  return totals
    .reduce(
      (acc, curr) => {
        if (curr === 0) {
          acc.push([]);
        } else {
          acc[acc.length - 1].push(curr);
        }
        return acc;
      },
      [[] as number[]]
    )
    .map((chunk) => chunk.reduce((acc, curr) => acc + curr, 0));
};

export const partOne = (data: string) => {
  const formattedData = convertToNumberArray(data);

  return Math.max(...getCalorieTotals(formattedData));
};

export const partTwo = (data: string) => {
  const formattedData = convertToNumberArray(data);

  const calorieTotals = getCalorieTotals(formattedData);

  // return the sum of the top 3 calorie totals
  return calorieTotals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0);
};
