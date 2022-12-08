export const partOne = (data: string) => {
  for (let i = 0; i < data.length - 3; i++) {
    // if all 4 characters are different, return the index of the last character
    if (
      data
        .substring(i, i + 4)
        .split('')
        .every((v, i, a) => a.indexOf(v) === i)
    ) {
      return i + 3 + 1;
    }
  }
};

export const partTwo = (data: string) => {
  for (let i = 0; i < data.length - 3; i++) {
    // if all 14 characters are different, return the index of the last character
    if (
      data
        .substring(i, i + 14)
        .split('')
        .every((v, i, a) => a.indexOf(v) === i)
    ) {
      return i + 13 + 1;
    }
  }
};
