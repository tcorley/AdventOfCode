/**
 * Parse input from file string into a list of chosen numbers
 * and a list of boards
 */
function parseInput(data: string): {
  chosenNumbers: number[];
  boards: number[][][];
} {
  const parsed = data.split("\n\n");
  const chosenNumbers =
    parsed.length > 1
      ? parsed
          .shift()!
          .split(",")
          .map((x) => parseInt(x))
      : [];
  const boards = parsed.map((board: string) =>
    board.split("\n").map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((i) => parseInt(i))
    )
  );

  return { chosenNumbers, boards };
}

/**
 * Given a list of boards, a list of chosen numbers, and a map of
 * marked locations, modify the map with the locations where the
 * chosen number is located. Omit marking any of the winning boards.
 */
function markBoards(
  boards: number[][][],
  chosenNumber: number,
  markedBoards: Record<string, boolean>,
  winners: number[] = []
): void {
  for (let board = 0; board < boards.length; board++) {
    for (let row = 0; row < boards[board].length; row++) {
      for (let column = 0; column < boards[board][row].length; column++) {
        if (
          !winners.includes(board) &&
          boards[board][row][column] === chosenNumber
        ) {
          markedBoards[[board, row, column].join(",")] = true;
        }
      }
    }
  }
}

/**
 * Check if any boards have won. It retuns the list of the winning board
 * indexes. Winners is used to omit boards that have already won.
 */
function checkForBingo(
  boards: number[][][],
  markedBoards: Record<string, boolean>,
  winners: number[] = []
): number[] {
  const newWinners: number[] = [];
  for (let board = 0; board < boards.length; board++) {
    if (
      !winners.includes(board) &&
      (boards[board].some((row, rowIndex) =>
        row.every((_, i) => markedBoards[[board, rowIndex, i].join(",")])
      ) ||
        boards[board].some((row, rowIndex) =>
          row.every((_, i) => markedBoards[[board, i, rowIndex].join(",")])
        ))
    ) {
      newWinners.push(board);
    }
  }

  return newWinners;
}

/**
 * Return the score of a board. This is calculated by adding up the
 * values of unmarked numbers.
 */
function calculateScore(
  board: number[][],
  markBoards: Record<string, boolean>,
  boardNumber: number
): number {
  return board.reduce((score, row) => {
    return (
      score +
      row.reduce((score, i) => {
        if (
          !markBoards[
            [boardNumber, board.indexOf(row), row.indexOf(i)].join(",")
          ]
        ) {
          return score + i;
        }

        return score;
      }, 0)
    );
  }, 0);
}

export const partOne = (data: string) => {
  const markedBoards = {};
  const { chosenNumbers, boards } = parseInput(data);

  for (const number of chosenNumbers) {
    markBoards(boards, number, markedBoards);
    const winner = checkForBingo(boards, markedBoards);
    if (winner.length > 0) {
      return (
        calculateScore(boards[winner[0]], markedBoards, winner[0]) * number
      );
    }
  }
};

export const partTwo = (data: string) => {
  const markedBoards = {};
  const { chosenNumbers, boards } = parseInput(data);

  let winners: number[] = [];
  let trailingNumber = 0;
  let trailingMarkedBoards = {};

  for (const number of chosenNumbers) {
    markBoards(boards, number, markedBoards, winners);

    const winnerList = checkForBingo(boards, markedBoards, winners);
    if (winnerList.length > 0) {
      winners = winners.concat(winnerList);
      trailingNumber = number;
      trailingMarkedBoards = JSON.parse(JSON.stringify(markedBoards));
    }
  }

  const winningBoardIndex = winners.pop() as number;
  return (
    calculateScore(
      boards[winningBoardIndex],
      trailingMarkedBoards,
      winningBoardIndex
    ) * trailingNumber
  );
};
