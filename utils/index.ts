export const convertToNumberArray = (data: string): number[] => {
  return data.split("\n").map(Number);
};
