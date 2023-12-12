import { convertToTokenizedArray } from '../../utils/index.ts';

export const partOne = (data: string) => {
  const formattedData = convertToTokenizedArray(data);

  let sum = 0;

  formattedData.forEach((line) => {
    let numberArray = line.map(Number);
    let numbersArray = [numberArray];
    // console.log(numbersArray);
    while (!numbersArray[numbersArray.length - 1].every((v) => v === 0)) {
      let newNumArray = [];
      for (
        let i = 0;
        i < numbersArray[numbersArray.length - 1].length - 1;
        i++
      ) {
        newNumArray.push(
          numbersArray[numbersArray.length - 1][i + 1] -
            numbersArray[numbersArray.length - 1][i]
        );
      }
      numbersArray.push(newNumArray);
    }

    // determine the next number
    for (let i = numbersArray.length - 1; i >= 0; i--) {
      if (i === numbersArray.length - 1) {
        numbersArray[i].push(0);
      } else if (i === numbersArray.length - 2) {
        numbersArray[i].push(numbersArray[i][numbersArray[i].length - 1]);
      } else {
        numbersArray[i].push(
          numbersArray[i][numbersArray[i].length - 1] +
            numbersArray[i + 1][numbersArray[i + 1].length - 1]
        );
      }
    }
    // prettyPrint(numbersArray);
    sum += numbersArray[0][numbersArray[0].length - 1];
  });

  return sum;
};

function prettyPrint(data: number[][]) {
  data.forEach((line, i) => {
    console.log(' '.repeat(i * 2), line.join('  '));
  });
}

//1 3 6 10 15 21
//10 13 16 21 30 45

export const partTwo = (data: string) => {
  const formattedData = convertToTokenizedArray(data);

  let sum = 0;

  formattedData.forEach((line) => {
    let numberArray = line.map(Number);
    let numbersArray = [numberArray];
    // console.log(numbersArray);
    while (!numbersArray[numbersArray.length - 1].every((v) => v === 0)) {
      let newNumArray = [];
      for (
        let i = 0;
        i < numbersArray[numbersArray.length - 1].length - 1;
        i++
      ) {
        newNumArray.push(
          numbersArray[numbersArray.length - 1][i + 1] -
            numbersArray[numbersArray.length - 1][i]
        );
      }
      numbersArray.push(newNumArray);
    }

    // determine the previous number
    for (let i = numbersArray.length - 1; i >= 0; i--) {
      if (i === numbersArray.length - 1) {
        numbersArray[i].unshift(0);
      } else if (i === numbersArray.length - 2) {
        numbersArray[i].unshift(numbersArray[i][0]);
      } else {
        numbersArray[i].unshift(numbersArray[i][0] - numbersArray[i + 1][0]);
      }
    }
    // prettyPrint(numbersArray);
    sum += numbersArray[0][0];
  });

  return sum;
};
