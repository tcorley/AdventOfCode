import { convertToStringArray } from '../../utils/index.ts';

const winnings = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512];

export const partOne = (data: string) => {
  const formattedData = convertToStringArray(data);

  return formattedData.reduce((acc, curr, index) => {
    // console.log(`Starting game ${index + 1}`);
    const [winningNums, playerNums] = curr
      .split(': ')[1]
      .split(' | ')
      .map((line) =>
        line
          .trim()
          .split(new RegExp(/\s+/))
          .map((num) => parseInt(num.trim()))
      );

    // console.log('winningNums', winningNums);
    // console.log('playerNums', playerNums);

    return (
      acc +
      winnings[winningNums.filter((num) => playerNums.includes(num)).length]
    );
  }, 0);
};

export const partTwo = (data: string) => {
  const formattedData = convertToStringArray(data);

  const scratchCardCounts = Array(formattedData.length).fill(1);

  // console.log('scratchCardCounts', scratchCardCounts);

  formattedData.forEach((game, index) => {
    // console.log(`Starting game ${index + 1}`);
    const [winningNums, playerNums] = game
      .split(': ')[1]
      .split(' | ')
      .map((n) =>
        n
          .trim()
          .split(new RegExp(/\s+/))
          .map((num) => parseInt(num.trim()))
      );

    // console.log('winningNums', winningNums);
    // console.log('playerNums', playerNums);

    const wins = winningNums.filter((num) => playerNums.includes(num)).length;
    // console.log(`Game ${index + 1} wins: ${wins}`);

    Array(wins)
      .fill(1)
      .forEach((_, i) => {
        if (index + i + 1 < scratchCardCounts.length)
          scratchCardCounts[index + i + 1] =
            scratchCardCounts[index + i + 1] + scratchCardCounts[index];
      });

    // console.log('new scratchCardCounts', scratchCardCounts);
  }, 0);

  return scratchCardCounts.reduce((acc, curr) => acc + curr, 0);
};
