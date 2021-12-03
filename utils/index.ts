export const convertToNumberArray = (data: string): number[] => {
  return data.split("\n").map(Number);
};

export const convertToTokenizedArray = (data: string): string[][] => {
  return data.split("\n").map((v) => v.split(" "));
};
