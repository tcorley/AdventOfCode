import { convertToTokenizedArray } from '../../utils/index.ts';

const pointValues: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
  A: 1,
  B: 2,
  C: 3,
};

enum RPS {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

const getRoundPoints = (opponent: RPS, you: RPS): number => {
  if (opponent === you) {
    return 3;
  } else if (
    (opponent === RPS.Rock && you === RPS.Scissors) ||
    (opponent === RPS.Paper && you === RPS.Rock) ||
    (opponent === RPS.Scissors && you === RPS.Paper)
  ) {
    return 0;
  } else {
    return 6;
  }
};

const convertXYZToRPS = (character: string) => {
  switch (character) {
    case 'X':
      return RPS.Rock;
    case 'Y':
      return RPS.Paper;
    case 'Z':
      return RPS.Scissors;
    default:
      return RPS.Rock;
  }
};

const convertABCToRPS = (character: string) => {
  switch (character) {
    case 'A':
      return RPS.Rock;
    case 'B':
      return RPS.Paper;
    case 'C':
      return RPS.Scissors;
    default:
      return RPS.Rock;
  }
};

export const partOne = (data: string) => {
  const formattedData = convertToTokenizedArray(data);

  const result = formattedData.map((round) => {
    const [opponent, you] = round;
    return (
      getRoundPoints(convertABCToRPS(opponent), convertXYZToRPS(you)) +
      pointValues[you]
    );
  });

  return result.reduce((acc, curr) => acc + curr, 0);
};

enum Outcome {
  Lose = 'X',
  Draw = 'Y',
  Win = 'Z',
}

const convertXYZToOutcome = (character: string) => {
  switch (character) {
    case 'X':
      return Outcome.Lose;
    case 'Y':
      return Outcome.Draw;
    case 'Z':
      return Outcome.Win;
    default:
      return Outcome.Lose;
  }
};

const getYourMove = (opponent: RPS, outcome: Outcome): RPS => {
  if (outcome === Outcome.Draw) {
    return opponent;
  } else if (
    // you select rock
    (opponent === RPS.Paper && outcome === Outcome.Lose) ||
    (opponent === RPS.Scissors && outcome === Outcome.Win)
  ) {
    return RPS.Rock;
  } else if (
    // you select paper
    (opponent === RPS.Rock && outcome === Outcome.Win) ||
    (opponent === RPS.Scissors && outcome === Outcome.Lose)
  ) {
    return RPS.Paper;
  } else {
    return RPS.Scissors;
  }
};

export const partTwo = (data: string) => {
  const formattedData = convertToTokenizedArray(data);

  const result = formattedData.map((round) => {
    const [opponent, you] = round;
    const move = getYourMove(
      convertABCToRPS(opponent),
      convertXYZToOutcome(you)
    );

    return pointValues[move] + getRoundPoints(convertABCToRPS(opponent), move);
  });

  return result.reduce((acc, curr) => acc + curr, 0);
};
