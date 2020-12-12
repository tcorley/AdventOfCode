/**
 * https://adventofcode.com/2020/day/8
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  console: false,
});

let code = [];

readInterface.on("line", function (line) {
  code.push(line.split(' '));
});

const accumulate = code => {
  let accumulator = 0;
  let currentInstruction = 0;
  let visited = new Set();

  while (currentInstruction < code.length) {
    const [command, value] = code[currentInstruction];
    let nextInstruction = currentInstruction + 1;

    switch (command) {
        case 'acc':
            accumulator += Number.parseInt(value)
            break;
        case 'jmp':
            const jmpVal = Number.parseInt(value)
            if (visited.has(currentInstruction + jmpVal) || jmpVal === 0) {
                return {accumulator, loopDetected: true};
            } else {
                nextInstruction = currentInstruction + jmpVal;
            }
            break;
        default:
            break;
    }

    visited.add(currentInstruction);
    currentInstruction = nextInstruction;
  }

  console.log('no loop detected')
  return {accumulator, loopDetected: false};
}

// part 1
// readInterface.on("close", function () {
//   const {accumulator, loopDetected} = accumulate(code)
//   console.log(`${loopDetected ? 'loop was detected': 'loop was not detected'} and the accumulator was set at ${accumulator}`)
// });

// part2
readInterface.on('close', function () {
  // brute force solution - check each nop or jmp line
  // switch the instruction and run to see if a loop was detected
  for (const [index, line] of code.entries()) {
    if (['jmp', 'nop'].includes(line[0])) {
      const switchedLine = [...code.slice(0, index), [line[0] === 'nop' ? 'jmp': 'nop', line[1]], ...code.slice(index + 1)]
      const { accumulator, loopDetected } = accumulate(switchedLine)
      if (!loopDetected) {
        console.log(`Accumulator is ${accumulator}`)
        break;
      }
    }
  }
})