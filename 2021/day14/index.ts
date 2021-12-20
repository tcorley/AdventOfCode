// Credit goes to https://github.com/kpk-pl/adventofcode-21/blob/master/day-14/second.js since I
// wasn't fully able to implement the pair count algorithm myself.
function parseInput(data: string): {
  template: string;
  rules: Record<string, string>;
} {
  const [template, ruleBlock] = data.split("\n\n");

  const rules = ruleBlock.split("\n").reduce((acc, line) => {
    const [key, value] = line.split(" -> ");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    template,
    rules,
  };
}

function getTotals(
  template: string,
  rules: Record<string, string>,
  steps: number
): Record<string, number> {
  let pairCounts = {} as Record<string, number>;

  // add initial pair counts from the template
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.slice(i, i + 2);
    pairCounts[pair] = pairCounts[pair] ? pairCounts[pair] + 1 : 1;
  }

  // for each step, generate new pair counts, leveraging the current `pairCounts`, then set the
  // `pairCounts` to the new values. This avoids the problem of manipulating `pairCounts` during
  // iteration.
  for (let i = 0; i < steps; i++) {
    const newPairCounts: { [key: string]: number } = {};
    Object.keys(pairCounts).forEach((pair) => {
      // This applies if we do not have a pair mapping available
      if (!rules[pair]) {
        newPairCounts[pair] = pairCounts[pair];
      } else {
        const [left, right] = pair.split("");
        const leftPair = left + rules[pair];
        const rightPair = rules[pair] + right;
        // This count takes into account the current iteration as well as the previous iterations
        newPairCounts[leftPair] =
          (newPairCounts[leftPair] || 0) + pairCounts[pair];
        newPairCounts[rightPair] =
          (newPairCounts[rightPair] || 0) + pairCounts[pair];
      }
    });
    pairCounts = newPairCounts;
  }

  return pairCounts;
}

function generateCountTotals(
  pairCounts: Record<string, number>,
  template: string
): Record<string, number> {
  // store the first value of the template since it's not included in the pair totals
  const counts = { [template[0]]: 1 };

  Object.keys(pairCounts).forEach((pair) => {
    const [_left, right] = pair;
    if (counts[right]) {
      counts[right] += pairCounts[pair];
    } else {
      counts[right] = pairCounts[pair];
    }
  });

  return counts;
}

function getHighLowDifference(countTotals: Record<string, number>): number {
  const numbers = Object.values(countTotals).sort((a, b) => a - b);

  return numbers[numbers.length - 1] - numbers[0];
}

export const partOne = (data: string) => {
  const { template, rules } = parseInput(data);

  return getHighLowDifference(
    generateCountTotals(getTotals(template, rules, 10), template)
  );
};

export const partTwo = (data: string) => {
  const { template, rules } = parseInput(data);

  return getHighLowDifference(
    generateCountTotals(getTotals(template, rules, 40), template)
  );
};
