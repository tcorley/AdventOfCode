import { convertToStringArray } from '../../utils/index.ts';

export const partOne = (data: string) => {
  const formattedData = convertToStringArray(data);

  return formattedData.reduce((total, line) => {
    const numbers = line.split('').filter((v) => !isNaN(parseInt(v)));
    const lineNum = Number(numbers[0] + numbers[numbers.length - 1]);

    return total + lineNum;
  }, 0);
};

const numberSpellings = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

export const partTwo = (data: string) => {
  const formattedData = convertToStringArray(data);

  const numArray: number[] = [];

  formattedData.forEach((line) => {
    const nums = [] as string[];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (!isNaN(parseInt(char))) {
        nums.push(char);
      }
      Object.entries(numberSpellings).forEach(([k, v]) => {
        if (line.substring(i).startsWith(k)) {
          nums.push(v);
        }
      });
    }

    numArray.push(Number(nums[0] + nums[nums.length - 1]));
  });

  return numArray.reduce((total, num) => total + num, 0);
};
