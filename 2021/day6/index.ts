export const partOne = (data: string) => {
  let fishPool = data.split(",").map(Number);
  const DAYS = 80; // 18 for sample

  // console.log(`Initial state: ${fishPool.join(",")}`);
  Array(DAYS)
    .fill(0)
    .forEach(() => {
      const newFish: number[] = [];
      fishPool = fishPool.map((fish) => {
        if (fish === 0) {
          newFish.push(8);
          return 6;
        } else {
          return fish - 1;
        }
      });
      fishPool.push(...newFish);
      // console.log(
      //   `After ${("" + (i + 1)).padStart(2, "0")} days: ${fishPool.join(",")}`
      // );
    });

  return fishPool.length;
};

// deno-lint-ignore no-unused-vars
function renderFishState(fishMap: number[]) {
  return fishMap.map((fish, i) => `${i}:${fish}`).join(" | ");
}

export const partTwo = (data: string) => {
  const parsed = data.split(",").map(Number);
  // instead of keeping up with the individual fish, use a tally array
  // for each day and the number of fish
  const fishMap = Array(9).fill(0);
  parsed.forEach((fish) => {
    fishMap[fish]++;
  });

  const DAYS = 256; // 18 for sample

  Array(DAYS)
    .fill(0)
    .forEach(() => {
      const zeroes = fishMap.shift();
      fishMap.push(0);
      if (zeroes > 0) {
        fishMap[6] += zeroes;
        fishMap[8] += zeroes;
      }
    });

  return fishMap.reduce((a, b) => a + b, 0);
};
