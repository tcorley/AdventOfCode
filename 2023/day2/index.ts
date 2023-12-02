import { convertToStringArray } from '../../utils/index.ts';

export const possibleGames = {
  red: 12,
  green: 13,
  blue: 14,
};

function runSimulation(reveals: string): typeof possibleGames {
  const maxes = {
    red: 0,
    green: 0,
    blue: 0,
  };
  reveals.split('; ').forEach((reveal) => {
    reveal.split(', ').forEach((colorStr) => {
      const [number, color] = colorStr.split(' ') as [
        string,
        keyof typeof maxes
      ];

      maxes[color] = Math.max(maxes[color], parseInt(number));
    });
  });

  return maxes;
}

export const partOne = (data: string) => {
  const formattedData = convertToStringArray(data);

  const total = formattedData.reduce((acc, line) => {
    const [gameString, reveals] = line.split(': ');
    const gameId = parseInt(gameString.split(' ')[1]);
    const maxes = runSimulation(reveals);

    // console.log(maxes);

    //check if the game is possible
    if (
      Object.entries(maxes).every(([color, max]) => {
        return max <= possibleGames[color as keyof typeof possibleGames];
      })
    ) {
      return acc + gameId;
    } else return acc;
  }, 0);

  return total;
};

export const partTwo = (data: string) => {
  const formattedData = convertToStringArray(data);

  const total = formattedData.reduce((acc, line) => {
    const [, reveals] = line.split(': ');
    const maxes = runSimulation(reveals);

    // console.log(maxes);

    return (
      acc + Object.values(maxes).reduce((subtotal, curr) => subtotal * curr, 1)
    );
  }, 0);

  return total;
};
