import { convertToStringArray } from "../../utils/index.ts";

export const partOne = (data: string) => {
  const formattedData = convertToStringArray(data);

  const numLength = formattedData[0].length;
  const tallyArray = Array(numLength).fill(0);
  formattedData.forEach((row) => {
    const rowArray = row.split("");
    rowArray.forEach((item, index) => (tallyArray[index] += parseInt(item)));
  });

  const gammaRate: string[] = [];
  const epsilonRate: string[] = [];

  tallyArray.forEach((item) => {
    if (formattedData.length / 2 < item) {
      gammaRate.push("1");
      epsilonRate.push("0");
    } else {
      gammaRate.push("0");
      epsilonRate.push("1");
    }
  });

  return parseInt(gammaRate.join(""), 2) * parseInt(epsilonRate.join(""), 2);
};

export const partTwo = (data: string) => {
  const formattedData = convertToStringArray(data);

  let oxygenData: string[] = JSON.parse(JSON.stringify(formattedData));
  let bitIndex = 0;
  while (1) {
    const mostCommon =
      oxygenData.reduce((acc, curr) => (acc += parseInt(curr[bitIndex])), 0) >=
      oxygenData.length / 2
        ? "1"
        : "0";
    oxygenData = oxygenData.filter((row) => row[bitIndex] === mostCommon);
    bitIndex++;
    if (oxygenData.length === 1) {
      break;
    }
  }

  let c02RatingData: string[] = JSON.parse(JSON.stringify(formattedData));
  bitIndex = 0;
  while (1) {
    const leastCommon =
      c02RatingData.reduce(
        (acc, curr) => (acc += parseInt(curr[bitIndex])),
        0
      ) >=
      c02RatingData.length / 2
        ? "0"
        : "1";
    c02RatingData = c02RatingData.filter(
      (row) => row[bitIndex] === leastCommon
    );
    bitIndex++;
    if (c02RatingData.length === 1) {
      break;
    }
  }

  return parseInt(c02RatingData[0], 2) * parseInt(oxygenData[0], 2);
};
