import { convertToStringArray } from '../../utils/index.ts';

function isSpecialCharacter(char?: string) {
  // console.log('the char is ', char, char ? !/[\d.]/.test(char) : false);
  // return true if the char is not 0-9 or .
  return char ? !/[\d.]/.test(char) : false;
}

function specialCharacterIsAdjacent(
  yIndex: number,
  startX: number,
  length: number,
  data: string[][]
) {
  // console.log(yIndex, startX, length);
  // check all adjacent cells for special characters
  // return true if any are found
  // for (let x = startX; x < startX + length; x++) {
  //   // check every adjacent cell for special characters
  //   const check =
  //     isSpecialCharacter(data[yIndex]?.[x + 1]) ||
  //     isSpecialCharacter(data[yIndex]?.[x - 1]) ||
  //     isSpecialCharacter(data[yIndex + 1]?.[x]) ||
  //     isSpecialCharacter(data[yIndex - 1]?.[x]) ||
  //     isSpecialCharacter(data[yIndex + 1]?.[x + 1]) ||
  //     isSpecialCharacter(data[yIndex + 1]?.[x - 1]) ||
  //     isSpecialCharacter(data[yIndex - 1]?.[x + 1]) ||
  //     isSpecialCharacter(data[yIndex - 1]?.[x - 1]);

  //   if (check) {
  //     return true;
  //   }
  // }

  // first check the above row
  if (yIndex > 0) {
    const check = data[yIndex - 1]
      .slice(
        Math.max(startX - 1, 0),
        Math.min(startX + length + 1, data[yIndex - 1].length)
      )
      .some((char) => isSpecialCharacter(char));
    if (check) {
      return true;
    }
  }
  // then check the current row
  if (startX > 0) {
    if (isSpecialCharacter(data[yIndex][startX - 1])) {
      return true;
    }
  }
  if (startX + length < data[yIndex].length) {
    if (isSpecialCharacter(data[yIndex][startX + length])) {
      return true;
    }
  }
  // then check the row below
  if (yIndex + 1 < data.length) {
    const check = data[yIndex + 1]
      .slice(
        Math.max(startX - 1, 0),
        Math.min(startX + length + 1, data[yIndex + 1].length)
      )
      .some((char) => isSpecialCharacter(char));
    if (check) {
      return true;
    }
  }
  return false;
}

export const partOne = (data: string) => {
  const formattedData = convertToStringArray(data);
  const tonkenizedData = formattedData.map((line) => line.split(''));

  const nums = [] as number[];
  const adjacents = [] as number[];
  const nonAdjacent = [] as any;
  formattedData.forEach((line, index) => {
    const end = line.split('').reduce((acc, curr, idx) => {
      if (!isNaN(parseInt(curr))) {
        return acc + curr;
      } else {
        if (acc) {
          nums.push(parseInt(acc));
          if (
            specialCharacterIsAdjacent(
              index,
              idx - acc.length,
              acc.length,
              tonkenizedData
            )
          ) {
            adjacents.push(parseInt(acc));
          } else {
            nonAdjacent.push({
              number: parseInt(acc),
              x: idx - acc.length,
              y: index,
              length: acc.length,
            });
          }
          return '';
        }
      }
      return acc;
    }, '');

    if (end) {
      nums.push(parseInt(end));
      if (
        specialCharacterIsAdjacent(
          index,
          line.length - end.length,
          end.length,
          tonkenizedData
        )
      ) {
        adjacents.push(parseInt(end));
      } else {
        nonAdjacent.push({
          number: parseInt(end),
          x: line.length - end.length,
          y: index,
          length: end.length,
        });
      }
    }
  });

  // console.log('total nums', nums.length, nums);
  // console.log('total adjacents', adjacents.length, adjacents);
  // console.log('non-adjacent', nonAdjacent);
  return adjacents.reduce((acc, curr) => acc + curr, 0);
  // 536667 is too low
};

export const partTwo = (data: string) => {
  return data.split('').reduce((acc, curr) => {
    if (curr === '*') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};
