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

function gearIsAdjacent(
  yIndex: number,
  startX: number,
  length: number,
  data: string[][],
  number: number,
  gearMap: Record<string, [string, number][]>
) {
  // first check the above row
  // if (yIndex > 0) {
  //   const check = data[yIndex - 1]
  //     .slice(
  //       Math.max(startX - 1, 0),
  //       Math.min(startX + length + 1, data[yIndex - 1].length)
  //     )
  //     .some((char) => isSpecialCharacter(char));
  //   if (check) {
  //     return true;
  //   }
  // }
  if (yIndex > 0) {
    for (
      let i = Math.max(startX - 1, 0);
      i < Math.min(startX + length + 1, data[yIndex - 1].length);
      i++
    ) {
      if (data[yIndex - 1][i] === '*') {
        if (!gearMap[[i, yIndex - 1].join(',')]) {
          gearMap[[i, yIndex - 1].join(',')] = [
            [[startX, yIndex].join(','), number],
          ];
        } else {
          if (
            !gearMap[[i, yIndex - 1].join(',')].some(
              (gear) => gear[0] === [startX, yIndex].join(',')
            )
          ) {
            gearMap[[i, yIndex - 1].join(',')].push([
              [startX, yIndex].join(','),
              number,
            ]);
          }
        }
        return gearMap;
      }
    }
  }
  // then check the current row
  if (startX > 0) {
    // if (isSpecialCharacter(data[yIndex][startX - 1])) {
    //   return true;
    // }
    if (data[yIndex][startX - 1] === '*') {
      if (!gearMap[[startX - 1, yIndex].join(',')]) {
        gearMap[[startX - 1, yIndex].join(',')] = [
          [[startX, yIndex].join(','), number],
        ];
      } else {
        if (
          !gearMap[[startX - 1, yIndex].join(',')].some(
            (gear) => gear[0] === [startX, yIndex].join(',')
          )
        ) {
          gearMap[[startX - 1, yIndex].join(',')].push([
            [startX, yIndex].join(','),
            number,
          ]);
        }
      }
      return gearMap;
    }
  }
  if (startX + length < data[yIndex].length) {
    // if (isSpecialCharacter(data[yIndex][startX + length])) {
    //   return true;
    // }
    if (data[yIndex][startX + length] === '*') {
      if (!gearMap[[startX + length, yIndex].join(',')]) {
        gearMap[[startX + length, yIndex].join(',')] = [
          [[startX, yIndex].join(','), number],
        ];
      } else {
        if (
          !gearMap[[startX + length, yIndex].join(',')].some(
            (gear) => gear[0] === [startX, yIndex].join(',')
          )
        ) {
          gearMap[[startX + length, yIndex].join(',')].push([
            [startX, yIndex].join(','),
            number,
          ]);
        }
      }
      return gearMap;
    }
  }
  // then check the row below
  if (yIndex + 1 < data.length) {
    // const check = data[yIndex + 1]
    //   .slice(
    //     Math.max(startX - 1, 0),
    //     Math.min(startX + length + 1, data[yIndex + 1].length)
    //   )
    //   .some((char) => isSpecialCharacter(char));
    // if (check) {
    //   return true;
    // }
    for (
      let i = Math.max(startX - 1, 0);
      i < Math.min(startX + length + 1, data[yIndex + 1].length);
      i++
    ) {
      if (data[yIndex + 1][i] === '*') {
        if (!gearMap[[i, yIndex + 1].join(',')]) {
          gearMap[[i, yIndex + 1].join(',')] = [
            [[startX, yIndex].join(','), number],
          ];
        } else {
          if (
            !gearMap[[i, yIndex + 1].join(',')].some(
              (gear) => gear[0] === [startX, yIndex].join(',')
            )
          ) {
            gearMap[[i, yIndex + 1].join(',')].push([
              [startX, yIndex].join(','),
              number,
            ]);
          }
        }
        return gearMap;
      }
    }
  }
  return gearMap;
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
  const formattedData = convertToStringArray(data);
  const tonkenizedData = formattedData.map((line) => line.split(''));

  const nums = [] as number[];
  const adjacents = [] as number[];
  const nonAdjacent = [] as any;
  let gearMap = {} as Record<string, [string, number][]>;
  formattedData.forEach((line, index) => {
    const end = line.split('').reduce((acc, curr, idx) => {
      if (!isNaN(parseInt(curr))) {
        return acc + curr;
      } else {
        if (acc) {
          nums.push(parseInt(acc));
          gearMap = gearIsAdjacent(
            index,
            idx - acc.length,
            acc.length,
            tonkenizedData,
            parseInt(acc),
            gearMap
          );
          // if (
          //   specialCharacterIsAdjacent(
          //     index,
          //     idx - acc.length,
          //     acc.length,
          //     tonkenizedData
          //   )
          // ) {
          //   adjacents.push(parseInt(acc));
          // } else {
          //   nonAdjacent.push({
          //     number: parseInt(acc),
          //     x: idx - acc.length,
          //     y: index,
          //     length: acc.length,
          //   });
          // }
          return '';
        }
      }
      return acc;
    }, '');

    if (end) {
      nums.push(parseInt(end));
      gearMap = gearIsAdjacent(
        index,
        line.length - end.length,
        end.length,
        tonkenizedData,
        parseInt(end),
        gearMap
      );
      // if (
      //   specialCharacterIsAdjacent(
      //     index,
      //     line.length - end.length,
      //     end.length,
      //     tonkenizedData
      //   )
      // ) {
      //   adjacents.push(parseInt(end));
      // } else {
      //   nonAdjacent.push({
      //     number: parseInt(end),
      //     x: line.length - end.length,
      //     y: index,
      //     length: end.length,
      //   });
      // }
    }
  });

  // console.log('gearMap', gearMap);

  return Object.values(gearMap).reduce((acc, curr) => {
    if (curr.length === 2) {
      return acc + curr[0][1] * curr[1][1];
    }
    return acc;
  }, 0);

  // console.log('total nums', nums.length, nums);
  // console.log('total adjacents', adjacents.length, adjacents);
  // console.log('non-adjacent', nonAdjacent);
  // return adjacents.reduce((acc, curr) => acc + curr, 0);
  // 536667 is too low
};
