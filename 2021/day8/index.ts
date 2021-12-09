export const partOne = (data: string) => {
  const parsed = data
    .split("\n")
    .map((line) => line.split(" | ")[1].split(" "));

  const uniqueLengths = [2, 3, 4, 7];
  const count = parsed.reduce(
    (acc, line) =>
      acc +
      line.reduce(
        (acc, word) => (uniqueLengths.includes(word.length) ? acc + 1 : acc),
        0
      ),
    0
  );

  return count;
};

function getDigitMap(patterns: string[][]) {
  const emptyStrings: string[] = [];
  const digitMap: Record<number, string[]> = {
    1: patterns.find((pattern) => pattern.length === 2) ?? emptyStrings,
    4: patterns.find((pattern) => pattern.length === 4) ?? emptyStrings,
    7: patterns.find((pattern) => pattern.length === 3) ?? emptyStrings,
    8: patterns.find((pattern) => pattern.length === 7) ?? emptyStrings,
  };

  const fourSegment = digitMap[4]!.filter(
    (digit) => !digitMap[1]!.includes(digit)
  );

  digitMap[3] = patterns.filter(
    (pattern) =>
      pattern.length === 5 &&
      pattern.filter((digit) => digitMap[1]!.includes(digit)).length === 2
  )[0];

  // remove digit 3 from patterns
  patterns.splice(patterns.indexOf(digitMap[3]), 1);

  digitMap[5] = patterns.filter(
    (pattern) =>
      pattern.length === 5 &&
      pattern.filter((digit) => fourSegment!.includes(digit)).length === 2
  )[0];

  patterns.splice(patterns.indexOf(digitMap[5]), 1);

  digitMap[2] = patterns.filter((pattern) => pattern.length === 5)[0];

  patterns.splice(patterns.indexOf(digitMap[2]), 1);

  digitMap[9] = patterns.filter(
    (pattern) =>
      pattern.length === 6 &&
      pattern.filter((digit) => digitMap[4]!.includes(digit)).length === 4
  )[0];

  patterns.splice(patterns.indexOf(digitMap[9]), 1);

  digitMap[0] = patterns.filter(
    (pattern) =>
      pattern.length === 6 &&
      pattern.filter((digit) => digitMap[1]!.includes(digit)).length === 2
  )[0];

  patterns.splice(patterns.indexOf(digitMap[0]), 1);

  digitMap[6] = patterns.filter((pattern) => pattern.length === 6)[0];

  patterns.splice(patterns.indexOf(digitMap[6]), 1);

  return digitMap;
}

function decodeDigits(digitMap: Record<number, string[]>, digits: string[][]) {
  let result = "";

  digits.forEach((digit) => {
    const match = Object.keys(digitMap).filter((key) => {
      // problem with using numbers as keys :/
      // deno-lint-ignore no-explicit-any
      return JSON.stringify(digitMap[key as any]) === JSON.stringify(digit);
    })[0];

    result += match;
  });
  return result;
}

export const partTwo = (data: string) => {
  const parsed = data
    .split("\n")
    .map((line) =>
      line
        .split(" | ")
        .map((item) => item.split(" ").map((word) => word.split("").sort()))
    );

  const results: string[] = [];

  parsed.forEach(([patterns, digits]) => {
    patterns.sort((a, b) => a.length - b.length);

    return results.push(decodeDigits(getDigitMap(patterns), digits));
  });

  return results.reduce((acc, item) => acc + parseInt(item), 0);
};
