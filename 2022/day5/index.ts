const getCrateStack = (index: number) => {
  // this would be the first stack
  if (index === 1) return 1;
  else return Math.floor(index / 4) + 1;
};

const parseCrateData = (crateData: string) => {
  const crateMap: Record<number, string[]> = {};

  crateData.split('\n').forEach((line) => {
    line.split('').forEach((char, index) => {
      if (char.match(/[A-Z]/i)) {
        const stack = getCrateStack(index);
        if (typeof crateMap[stack] === 'object') {
          crateMap[stack].push(char);
        } else {
          crateMap[stack] = [char];
        }
      }
    });
  });

  return crateMap;
};

const getTopOfEachStack = (crateMap: Record<number, string[]>) => {
  return Array(Object.keys(crateMap).length)
    .fill(0)
    .reduce((acc, _, index) => {
      return acc + crateMap[index + 1][0];
    }, '');
};

export const partOne = (data: string) => {
  //split data on the empty line
  const [crates, commands] = data.split('\n\n');

  const crateMap = parseCrateData(crates);

  commands.split('\n').forEach((line) => {
    //@ts-ignore - this works but ts doesn't like it
    const [_, amount, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/);
    for (let i = 0; i < Number(amount); i++) {
      const crate = crateMap[from].shift();
      if (!crate) throw new Error('No crate to move');
      crateMap[to].unshift(crate);
    }
  });

  return getTopOfEachStack(crateMap);
};

export const partTwo = (data: string) => {
  //split data on the empty line
  const [crates, commands] = data.split('\n\n');

  const crateMap = parseCrateData(crates);

  commands.split('\n').forEach((line) => {
    //@ts-ignore - this works but ts doesn't like it
    const [_, amount, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/);
    crateMap[to].unshift(...crateMap[from].splice(0, Number(amount)));
  });

  return getTopOfEachStack(crateMap);
};
