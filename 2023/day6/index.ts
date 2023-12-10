export const partOne = (data: string) => {
  const lines = data
    .split('\n')
    .map((x) => x.split(':')[1].trim().split(/\s+/));
  const races = lines[0].map((x, i) => [parseInt(x), parseInt(lines[1][i])]);
  // console.log(races);

  let total = 1;
  races.forEach(([time, distance]) => {
    let winCount = 0;
    for (let i = 0; i <= time; i++) {
      const dist = i * (time - i);
      // console.log(i, distance, dist, time);
      if (dist > distance) {
        winCount++;
      }
    }
    // console.log(winCount);
    total *= winCount;
    // console.log(total);
  });
  return total;
};

export const partTwo = (data: string) => {
  const lines = data
    .split('\n')
    .map((x) => x.split(':')[1].trim().split(/\s+/).join(''));
  const [time, distance] = lines.map((x) => parseInt(x));

  // console.log(time, distance);

  let winCount = 0;
  for (let i = 0; i <= time; i++) {
    const dist = i * (time - i);
    // console.log(i, distance, dist, time);
    if (dist > distance) {
      winCount++;
    }
  }
  // console.log(winCount);
  return winCount;
};
