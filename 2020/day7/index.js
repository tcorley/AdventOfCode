/**
 * https://adventofcode.com/2020/day/7
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  // use this for simple input
  // input: fs.createReadStream("./small.txt"),
  // and part2 specifically
  // input: fs.createReadStream("./part2.txt"),
  console: false,
});

// should represent bag type, { amount: number, bagType}[]
let bags = {};

readInterface.on("line", function (line) {
  const [first, internalBags] = line.split(" contain ");
  const bag = first.split(" ").slice(0, 2).join(" ");

  if (internalBags === "no other bags.") {
    bags[bag] = [];
  } else {
    const bagContents = internalBags.split(", ").reduce((allBags, bag) => {
      const bagParts = bag.split(" ");
      if (bagParts.length !== 4) {
        throw new Error(`input is not 4 tokens: ${bag}`);
      }
      allBags.push({
        amount: Number.parseInt(bagParts[0]),
        bagType: bagParts.slice(1, 3).join(" "),
      });

      return allBags;
    }, []);

    bags[bag] = bagContents;
  }
});

// part 1
// const bagContainsBag = (bag, internalBag) => {
//   const bagMeta = bags[bag];

//   if (bagMeta.some((bag) => bag.bagType === internalBag)) {
//     return true;
//   } else {
//     return bagMeta.some((bag) => bagContainsBag(bag.bagType, internalBag));
//   }
// };

// readInterface.on("close", function () {
//   let count = 0;

//   Object.keys(bags).forEach((bag) => {
//     if (bagContainsBag(bag, "shiny gold")) {
//       count++;
//     }
//   });
//   console.log(`${count} bags contain at least one shiny gold bag`);
// });

// part 2
const countInternalBags = (bag) => {
  const internalBags = bags[bag];

  if (internalBags.length === 0) {
    return 0;
  } else {
    let bagCount = 0;
    for (const bag of internalBags) {
      const perBagCount = countInternalBags(bag.bagType);
      // count the number of bags, plus the amount of those bags times number
      // of bags internally. if no internal bags then just the amount from the bag
      bagCount +=
        perBagCount > 0 ? bag.amount + bag.amount * perBagCount : bag.amount;
    }
    return bagCount;
  }
};

readInterface.on("close", function () {
  const testBag = "shiny gold";
  console.log(
    `${testBag} bags contain ${countInternalBags(testBag)} other bags`
  );
});
