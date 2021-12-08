/**
 * Parse the range input
 */
function parseInput(data: string) {
  return data
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((i) => i.split(",").map((j) => parseInt(j)))
    );
}

/**
 * Generate the range of the points, inclusive to values
 */
function generateRange(first: number, last: number) {
  const range = [];
  if (first < last) {
    for (let i = first; i <= last; i++) {
      range.push(i);
    }
  } else if (first > last) {
    for (let i = first; i >= last; i--) {
      range.push(i);
    }
  } else {
    range.push(first);
  }

  return range;
}

/**
 * Generate the hitmap similar to how it is rendered on AoC
 */
// deno-lint-ignore no-unused-vars
function renderSampleHitMap(hitMap: Record<string, number>) {
  for (let i = 0; i < 10; i++) {
    let line = "";
    for (let j = 0; j < 10; j++) {
      const key = `${j},${i}`;
      if (hitMap[key]) {
        line += hitMap[key];
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
}

export const partOne = (data: string) => {
  // filter by only horizontal and vertical lines
  const parsed = parseInput(data).filter(
    (row) => row[0][0] === row[1][0] || row[0][1] === row[1][1]
  );

  const hitMap: Record<string, number> = {};

  parsed.forEach((row) => {
    // populate horizontal lines into hitMap
    if (row[0][0] === row[1][0]) {
      generateRange(row[0][1], row[1][1]).forEach((i) => {
        const key = `${row[0][0]},${i}`;
        hitMap[key] = hitMap[key] ? hitMap[key] + 1 : 1;
      });
      // else populate vertical lines into hitMap
    } else if (row[0][1] === row[1][1]) {
      // console.log(generateRange(row[0][0], row[1][0]));
      generateRange(row[0][0], row[1][0]).forEach((i) => {
        const key = `${i},${row[0][1]}`;
        hitMap[key] = hitMap[key] ? hitMap[key] + 1 : 1;
      });
      // potentially handle a single point range
    } else {
      const key = `${row[0][0]},${row[0][1]}`;
      hitMap[key] = hitMap[key] ? hitMap[key] + 1 : 1;
    }
  });

  // renderSampleHitMap(hitMap);
  return Object.keys(hitMap).filter((key) => hitMap[key] > 1).length;
};

export const partTwo = (data: string) => {
  const parsed = parseInput(data);

  const hitMap: Record<string, number> = {};

  parsed.forEach((row) => {
    const horizontal = generateRange(row[0][0], row[1][0]);
    const vertical = generateRange(row[0][1], row[1][1]);
    // if 45 degree line, iterate over both ranges together
    if (horizontal.length === vertical.length) {
      for (let i = 0; i < horizontal.length; i++) {
        const key = `${horizontal[i]},${vertical[i]}`;
        hitMap[key] = hitMap[key] ? hitMap[key] + 1 : 1;
      }
      // else iterate over both ranges separately
    } else {
      generateRange(row[0][0], row[1][0]).forEach((i) => {
        generateRange(row[0][1], row[1][1]).forEach((j) => {
          const key = `${i},${j}`;
          hitMap[key] = hitMap[key] ? hitMap[key] + 1 : 1;
        });
      });
    }
  });

  // renderSampleHitMap(hitMap);
  return Object.keys(hitMap).filter((key) => hitMap[key] > 1).length;
};
