// Never completed :/
function parseInput(data: string) {
  return data.split('\n').map((d) => JSON.parse(d));
}

export const partOne = (data: string) => {
  const snailNums = parseInput(data);
  console.log(snailNums);
};

export const partTwo = (data: string) => {};
