const openCloseMap: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const closeOpenMap: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const pointMap: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
const partTwoPointMap: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

export const partOne = (data: string) => {
  const parsed = data.split("\n");
  const results: number[] = [];
  for (const line of parsed) {
    let illegalChar = "";
    const stack: string[] = [];
    line.split("").every((char) => {
      if (Object.keys(openCloseMap).includes(char)) {
        stack.push(char);
      } else {
        const compChar = stack.pop();
        if (!(compChar === closeOpenMap[char])) {
          illegalChar = char;
          return false;
        }
      }
      return true;
    });

    if (illegalChar) {
      results.push(pointMap[illegalChar]);
    }
  }

  return results.reduce((acc, curr) => acc + curr, 0);
};

export const partTwo = (data: string) => {
  const parsed = data.split("\n");
  const results: string[][] = [];
  for (const line of parsed) {
    let illegalChar = "";
    const stack: string[] = [];
    line.split("").every((char) => {
      if (Object.keys(openCloseMap).includes(char)) {
        stack.push(char);
      } else {
        const compChar = stack.pop();
        if (!(compChar === closeOpenMap[char])) {
          illegalChar = char;
          return false;
        }
      }
      return true;
    });

    if (!illegalChar) {
      results.push(stack.reverse().map((char) => openCloseMap[char]));
    }
  }

  return results
    .map((line) =>
      line.reduce((acc, curr) => acc * 5 + partTwoPointMap[curr], 0)
    )
    .sort((a, b) => b - a)[Math.floor(results.length / 2)];
};
