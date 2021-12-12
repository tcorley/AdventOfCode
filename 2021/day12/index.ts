const terminatingNodes = ["start", "end"];

type Node = {
  nodeId: string;
  edges: string[];
  isSmall: boolean;
};
type Graph = Record<string, Node>;

function createGraph(data: string): Graph {
  const parsed = data.split("\n").map((x) => x.split("-"));
  const graph: Graph = {};

  parsed.forEach((edge) => {
    const [nodeA, nodeB] = edge;
    if (!graph[nodeA]) {
      graph[nodeA] = {
        nodeId: nodeA,
        edges: [],
        isSmall:
          !terminatingNodes.includes(nodeA) && nodeA === nodeA.toLowerCase(),
      };
    }
    graph[nodeA].edges.push(nodeB);
    if (!graph[nodeB]) {
      graph[nodeB] = {
        nodeId: nodeB,
        edges: [],
        isSmall:
          !terminatingNodes.includes(nodeB) && nodeB === nodeB.toLowerCase(),
      };
    }
    graph[nodeB].edges.push(nodeA);
  });
  return graph;
}

function findAllPaths(
  graph: Graph,
  node: Node,
  currentPath: string[],
  isPartTwo = false
): number {
  if (node.nodeId === "end") {
    return 1;
  }
  if (node.nodeId === "start" && currentPath.length > 1) {
    return 0;
  }
  if (
    node.isSmall &&
    ((!isPartTwo && currentPath.includes(node.nodeId)) ||
      (isPartTwo &&
        currentPath.includes(node.nodeId) &&
        currentPath
          .filter((a) => graph[a].isSmall)
          .some((n) => currentPath.filter((m) => m === n).length === 2)))
  ) {
    return 0;
  }

  return node.edges.reduce(
    (pathCount, edge) =>
      pathCount +
      findAllPaths(
        graph,
        graph[edge],
        [...currentPath, node.nodeId],
        isPartTwo
      ),
    0
  );
}

export const partOne = (data: string) => {
  const graph = createGraph(data);
  return findAllPaths(graph, graph["start"], []);
};

export const partTwo = (data: string) => {
  const graph = createGraph(data);
  return findAllPaths(graph, graph["start"], [], true);
};
