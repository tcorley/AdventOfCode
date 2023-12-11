export const partOne = (data: string) => {
  const [pattern, mapData] = data.split('\n\n');
  const map = {} as Record<string, string[]>;
  mapData.split('\n').map((x) => {
    const [node, neighbors] = x.split(' = ');
    // neighbors is set up as (BBB, CCC) use regex to get rid of the parens
    const neighborList = neighbors.match(/\((.*)\)/)![1].split(', ');
    map[node] = neighborList;
  });

  // console.log(pattern, map);

  let found = false;
  let steps = 0;
  let currentNode = 'AAA';
  while (!found) {
    currentNode =
      map[currentNode][pattern.charAt(steps % pattern.length) === 'L' ? 0 : 1];
    steps++;
    // console.log(`Step ${steps}: ${currentNode}`);
    if (currentNode === 'ZZZ') {
      found = true;
    }
  }

  return steps;
};

export const partTwo = (data: string) => {
  const [pattern, mapData] = data.split('\n\n');
  const map = {} as Record<string, string[]>;
  mapData.split('\n').map((x) => {
    const [node, neighbors] = x.split(' = ');
    // neighbors is set up as (BBB, CCC) use regex to get rid of the parens
    const neighborList = neighbors.match(/\((.*)\)/)![1].split(', ');
    map[node] = neighborList;
  });

  // console.log(pattern, map);

  type TraverseNode = {
    startingNode: string;
    currentNode: string;
    found: boolean;
  };

  const startingNodes = Object.keys(map).filter((x) => x.endsWith('A'));
  // .map((x) => ({
  //   startingNode: x,
  //   currentNode: x,
  //   found: false,
  // })) as TraverseNode[];

  // let found = false;

  // console.log(startingNodes);
  const steppers: number[] = [];
  startingNodes.forEach((node, index) => {
    // console.log(`Starting node ${index}: ${node}`);
    let found = false;
    let steps = 0;
    while (!found) {
      node = map[node][pattern.charAt(steps % pattern.length) === 'L' ? 0 : 1];
      // console.log(`Step ${steps}: ${node}`);
      steps++;
      if (node.endsWith('Z')) {
        found = true;
      }
    }
    steppers.push(steps);
  });

  // console.log(steppers);

  function gcd(a: number, b: number): number {
    return b ? gcd(b, a % b) : a;
  }

  // return least common multiple of steppers
  return steppers.reduce((acc, cur) => {
    return (acc * cur) / gcd(acc, cur);
  });
};
