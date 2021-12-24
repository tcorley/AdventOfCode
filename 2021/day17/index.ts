type TargetArea = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

function parseInput(data: string): TargetArea {
  const rawData = data.split(": ").slice(1);
  const targetArea = {} as TargetArea;
  const nums: number[] = [];
  rawData[0].split(", ").forEach((axis) => {
    const numbers = axis
      .split("=")[1]
      .split("..")
      .map((n) => parseInt(n));
    nums.push(...numbers);
  });

  targetArea.xMin = nums[0];
  targetArea.xMax = nums[1];
  targetArea.yMin = nums[2];
  targetArea.yMax = nums[3];

  return targetArea;
}

function isCoordInTargetArea(
  targetArea: TargetArea,
  x: number,
  y: number
): boolean {
  return (
    x >= targetArea.xMin &&
    x <= targetArea.xMax &&
    y >= targetArea.yMin &&
    y <= targetArea.yMax
  );
}

function hasProbePassedTargetArea(
  targetArea: TargetArea,
  x: number,
  y: number
): boolean {
  return x > targetArea.xMax || y < targetArea.yMin;
}

function performStep(probePosition: string, probeVelocity: string): string[] {
  const [x, y] = probePosition.split(",").map((n) => parseInt(n));
  const [xVelocity, yVelocity] = probeVelocity
    .split(",")
    .map((n) => parseInt(n));

  const newXPos = x + xVelocity;
  const newYPos = y + yVelocity;
  let newXVelocity = xVelocity;
  let newYVelocity = yVelocity;

  if (xVelocity > 0) {
    newXVelocity--;
  } else if (xVelocity < 0) {
    newXVelocity++;
  }
  newYVelocity--;

  return [`${newXPos},${newYPos}`, `${newXVelocity},${newYVelocity}`];
}

// deno-lint-ignore no-unused-vars
function printMap(
  targetArea: TargetArea,
  subPos: string,
  probePositions?: string[]
) {
  const width = targetArea.xMax;
  // TODO: make sure to adjust to the max y value of any step
  // const height = Math.abs(targetArea.yMin) + 1;
  const maxHeight =
    probePositions?.reduce((acc, curr) => {
      const [_x, y] = curr.split(",").map((n) => parseInt(n));
      return Math.max(acc, y);
    }, 0) ?? 0;

  console.log(targetArea);
  console.log(`top left represents 0,${maxHeight}`);
  for (let y = maxHeight; y > targetArea.yMin; y--) {
    let line = "";
    for (let x = 0; x < width; x++) {
      if (`${x},${y}` === subPos) {
        line += "S";
      } else if (probePositions?.includes(`${x},${y}`)) {
        line += "#";
      } else if (isCoordInTargetArea(targetArea, x, y)) {
        line += "T";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
}

function simulateProbe(targetArea: TargetArea, initialVelocity: string) {
  let steps = 0;
  // printMap(targetArea, "0,0");
  const probePositions: string[] = [];
  probePositions.push("0,0");
  let probeVelocity = initialVelocity;
  let probePosition = "0,0";
  let passedTargetArea = false;
  let probeInTargetArea = false;
  while (!passedTargetArea) {
    steps++;
    const [newPosition, newVelocity] = performStep(
      probePosition,
      probeVelocity
    );
    probePosition = newPosition;
    probeVelocity = newVelocity;
    probePositions.push(probePosition);
    const [x, y] = probePosition.split(",").map((n) => parseInt(n));
    if (isCoordInTargetArea(targetArea, x, y)) {
      passedTargetArea = true;
      probeInTargetArea = true;
      // check if the probe has passed the target area
    } else if (hasProbePassedTargetArea(targetArea, x, y)) {
      passedTargetArea = true;
      // check if the probe has passed the target area
    }
  }
  // if (probeInTargetArea) {
  //   console.log(
  //     `Probe made it to the target area in ${steps} steps with initial velocity ${initialVelocity}`
  //   );
  //   printMap(targetArea, "0,0", probePositions);
  // } else {
  //   console.log(
  //     `Probe did not make it to the target area after ${steps} steps with initial velocity ${initialVelocity}`
  //   );
  // }

  //get the max y value from the steps
  const maxHeight = probePositions.reduce((acc, curr) => {
    const [_x, y] = curr.split(",").map((n) => parseInt(n));
    return Math.max(acc, y);
  }, 0);

  return {
    probeInTargetArea,
    maxHeight,
  };
}

export const partOne = (data: string) => {
  const targetArea = parseInput(data);
  const successFullProbes = [];
  const successFullProbesHeight = [];

  for (let y = -Math.abs(targetArea.yMin); y < Math.abs(targetArea.yMin); y++) {
    for (let x = 1; x < Math.abs(targetArea.xMax + 1); x++) {
      const probeVelocity = `${x},${y}`;

      const { probeInTargetArea, maxHeight } = simulateProbe(
        targetArea,
        probeVelocity
      );
      if (probeInTargetArea) {
        successFullProbes.push(`${x},${y}`);
        successFullProbesHeight.push(maxHeight);
      }
    }
  }

  // return the max height
  return Math.max(...successFullProbesHeight);
};

export const partTwo = (data: string) => {
  const targetArea = parseInput(data);
  const successFullProbes = [];

  for (let y = -Math.abs(targetArea.yMin); y < Math.abs(targetArea.yMin); y++) {
    for (let x = 1; x < Math.abs(targetArea.xMax) + 1; x++) {
      const probeVelocity = `${x},${y}`;

      const { probeInTargetArea } = simulateProbe(targetArea, probeVelocity);
      if (probeInTargetArea) {
        successFullProbes.push(`${x},${y}`);
      }
    }
  }

  return successFullProbes.length;
};
