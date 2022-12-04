import { convertToStringArray } from '../../utils/index.ts';

// function that converts a character to a number
// a-z -> 1-26
// A-Z -> 27-52
const convertCharacterToNumber = (character: string) => {
  const charCode = character.charCodeAt(0);
  if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  } else if (charCode >= 65 && charCode <= 90) {
    return charCode - 64 + 26;
  } else {
    return 0;
  }
};

export const partOne = (data: string) => {
  const formattedData = convertToStringArray(data);

  const sharedLetters: string[] = [];

  formattedData.forEach((word) => {
    // split the word in half
    const [firstHalf, secondHalf] = [
      word.slice(0, word.length / 2),
      word.slice(word.length / 2),
    ];
    // push the letter that is shared between the two halves to the sharedLetters array
    sharedLetters.push(
      firstHalf.split('').find((letter) => secondHalf.includes(letter)) ?? ''
    );
  });

  // sum the numbers of the shared letters
  return sharedLetters.reduce(
    (acc, curr) => acc + convertCharacterToNumber(curr),
    0
  );
};

export const partTwo = (data: string) => {
  const formattedData = convertToStringArray(data);

  const sharedLetters: string[] = [];

  // convert the data into arrays of 3 words
  const dataChunks = formattedData.reduce(
    (acc, curr) => {
      if (acc[acc.length - 1].length === 3) {
        acc.push([]);
      }
      acc[acc.length - 1].push(curr);
      return acc;
    },
    [[] as string[]]
  );

  // for each chunk of 3 words, find the common letter in each and add to the sharedLetters array
  dataChunks.forEach((chunk) => {
    const [firstWord, secondWord, thirdWord] = chunk;
    sharedLetters.push(
      firstWord.split('').find((letter) => {
        return secondWord.includes(letter) && thirdWord.includes(letter);
      }) ?? ''
    );
  });

  // sum the numbers of the shared letters
  return sharedLetters.reduce(
    (acc, curr) => acc + convertCharacterToNumber(curr),
    0
  );
};
