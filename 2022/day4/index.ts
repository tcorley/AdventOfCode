import { convertToStringArray } from '../../utils/index.ts';

// Determine if a pair of string represented ranges are fully contained within each other
// e.g. '1-4' and '2-3' are fully contained within each other
const isRangeFullyConatined = (rangeOne: string, rangeTwo: string) => {
  const [startOne, endOne] = rangeOne.split('-').map(Number);
  const [startTwo, endTwo] = rangeTwo.split('-').map(Number);

  return startOne <= startTwo && endOne >= endTwo;
};

export const partOne = (data: string) => {
  const formattedData = convertToStringArray(data);

  // return the count of fully contained ranges
  return formattedData.reduce((acc, curr) => {
    const [rangeOne, rangeTwo] = curr.split(',');
    if (isRangeFullyConatined(rangeOne, rangeTwo)) {
      return acc + 1;
    } else if (isRangeFullyConatined(rangeTwo, rangeOne)) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};

const rangesOverlap = (rangeOne: string, rangeTwo: string) => {
  const [startOne, endOne] = rangeOne.split('-').map(Number);
  const [startTwo, endTwo] = rangeTwo.split('-').map(Number);

  return startOne <= endTwo && endOne >= startTwo;
};

export const partTwo = (data: string) => {
  const formattedData = convertToStringArray(data);

  // return the count of overlapping ranges
  return formattedData.reduce((acc, curr) => {
    const [rangeOne, rangeTwo] = curr.split(',');
    if (rangesOverlap(rangeOne, rangeTwo)) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};
