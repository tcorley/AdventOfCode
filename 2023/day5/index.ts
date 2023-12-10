type MapRanger = {
  start: number;
  end: number;
  diff: number;
};

export const partOne = (data: string) => {
  const inputParts = data.split('\n\n');

  // get seeds
  const seeds = inputParts[0]
    .split(':')[1]
    .trim()
    .split(new RegExp(/\s+/))
    .map((seed) => parseInt(seed, 10));

  // console.log('inputParts', inputParts.slice(1));

  // represents the maps with the start, end, and differential
  const maps: MapRanger[][] = [];
  inputParts.slice(1).forEach((input) => {
    const temp: MapRanger[] = [];
    input
      .split('\n')
      .slice(1)
      .forEach((line) => {
        const [destination, source, rangeLen] = line
          .split(new RegExp(/\s+/))
          .map((num) => parseInt(num, 10));
        // console.log(destination, source, rangeLen);
        temp.push({
          start: source,
          end: source + rangeLen,
          diff: destination - source,
        });
      });
    maps.push(temp);
  });

  // console.log(maps);
  // console.log('starting seeds: ', seeds);

  // pass the seeds through the maps
  maps.forEach((map, j) => {
    seeds.forEach((seed, i) => {
      map.forEach((range) => {
        if (seed >= range.start && seed < range.end) {
          // console.log(
          //   'Range found: ',
          //   range,
          //   'seed: ',
          //   seed,
          //   seeds[i] + range.diff
          // );
          seeds[i] = seeds[i] + range.diff;
        }
      });
    });
    // console.log(`after map ${j + 1}: `, seeds);
  });

  return Math.min(...seeds);
};

export const partTwo = (data: string) => {
  const inputParts = data.split('\n\n');

  // get seeds
  const seedsPairs = inputParts[0]
    .split(':')[1]
    .trim()
    .split(new RegExp(/\s+/))
    .map((seed) => parseInt(seed, 10));

  console.log(seedsPairs);

  // const seeds = seedsPairs.reduce((acc, seed, i) => {
  //   if (i % 2 === 0) {
  //     console.log(
  //       seedsPairs[i + 1],
  //       Array(seedsPairs[i + 1])
  //         .fill(0)
  //         .map((_, j) => seed + j)
  //     );
  //     return [
  //       ...acc,
  //       ...Array(seedsPairs[i + 1])
  //         .fill(0)
  //         .map((_, j) => seed + j),
  //     ];
  //   }
  //   return acc;
  // }, [] as number[]);

  // console.log('inputParts', inputParts.slice(1));

  // represents the maps with the start, end, and differential
  const maps: MapRanger[][] = [];
  inputParts.slice(1).forEach((input) => {
    const temp: MapRanger[] = [];
    input
      .split('\n')
      .slice(1)
      .forEach((line) => {
        const [destination, source, rangeLen] = line
          .split(new RegExp(/\s+/))
          .map((num) => parseInt(num, 10));
        // console.log(destination, source, rangeLen);
        temp.push({
          start: source,
          end: source + rangeLen,
          diff: destination - source,
        });
      });
    maps.push(temp);
  });

  // console.log(maps);
  // console.log('starting seeds: ', seeds.length);
  let min = Infinity;
  seedsPairs.forEach((initial, i) => {
    console.log('initial', initial);
    if (i % 2 === 0) {
      for (let j = initial; j < seedsPairs[i + 1]; j++) {
        let seed = initial + j;

        // const debug = seed === 82;

        // pass the seeds through the maps
        maps.forEach((map, j) => {
          let found = false;
          map.forEach((range) => {
            if (seed >= range.start && seed < range.end && !found) {
              // if (debug) {
              //   console.log(
              //     'Range found: ',
              //     range,
              //     j,
              //     'seed: ',
              //     seed,
              //     seed + range.diff
              //   );
              // }
              seed = seed + range.diff;
              found = true;
            }
          });
        });

        // console.log('started with ', initial + j, 'ended with ', seed);

        min = Math.min(min, seed);
      }
    }
  });
  // ✨  Done in 249.89s. 😭
  return min;
};
