import { convertToStringArray } from '../../utils/index.ts';

export const partOne = (data: string) => {
  const formattedData = convertToStringArray(data);

  let dial = 50;

  const maxDial = 100;

  let onZeroCount = 0;

  formattedData.forEach((line) => {
    const [direction, amount] = [line.substring(0, 1), line.substring(1)];
    if (direction === 'L') {
      dial = (dial - parseInt(amount) + maxDial) % maxDial;
    } else if (direction === 'R') {
      dial = (dial + parseInt(amount) + maxDial) % maxDial;
    }

    console.log(dial);

    if (dial === 0) {
      onZeroCount++;
    }
  });

  return onZeroCount;
};
