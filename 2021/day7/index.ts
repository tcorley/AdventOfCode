export const partOne = (data: string) => {
  const horizontalPositions = data.split(",").map(Number);
  const idealPosition = horizontalPositions.slice().sort((a, b) => a - b)[
    Math.floor(horizontalPositions.length / 2)
  ];

  return horizontalPositions.reduce(
    (acc, curr) => acc + Math.abs(curr - idealPosition),
    0
  );
};

export const partTwo = (data: string) => {
  const horizontalPositions = data
    .split(",")
    .map(Number)
    .sort((a, b) => a - b);
  const positionSet = new Set(horizontalPositions);
  const costMap: Record<number, Record<number, number>> = {};
  positionSet.forEach((position) => {
    Array(horizontalPositions[horizontalPositions.length - 1] + 1)
      .fill(0)
      .forEach((_, otherPosition) => {
        const steps = Math.abs(position - otherPosition);
        const calculatedCost = 0.5 * (steps * steps) + 0.5 * steps;
        costMap[position] = {
          ...costMap[position],
          [otherPosition]: calculatedCost,
        };
      });
  });
  const results: number[] = [];

  Array(horizontalPositions[horizontalPositions.length - 1] + 1)
    .fill(0)
    .forEach((_, position) => {
      results.push(
        horizontalPositions.reduce(
          (acc, curr) => acc + costMap[curr][position],
          0
        )
      );
    });

  results.sort((a, b) => a - b);
  return results.shift();
};
