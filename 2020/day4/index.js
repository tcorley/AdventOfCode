/**
 * https://adventofcode.com/2020/day/4
 */
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./data.txt"),
  console: false,
});

const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const optionalFields = ["cid"];
const passports = [];
let currentPassport = {};
let validPassports = 0;
let invalidPassports = 0;
let totalPassports = 0;

// part one
// const isValidPassport = (passport) => {
//   const passportKeys = Object.keys(passport).filter(
//     (key) => !optionalFields.includes(key)
//   );

//   return passportKeys.sort().join(",") === fields.sort().join(",");
// };

// const processPassport = () => {
//   // process currentPassport
//   passports.push(currentPassport);
//   // check if valid
//   if (isValidPassport(currentPassport)) {
//     validPassports++;
//   } else {
//     invalidPassports++;
//   }
//   totalPassports++;
//   // set the currentPassport to nothing
//   currentPassport = {};
// };

// readInterface.on("line", function (line) {
//   if (line.length) {
//     // parse line
//     for (const field of line.split(" ")) {
//       const [key, value] = field.split(":");
//       currentPassport[key] = value;
//     }
//   } else {
//     processPassport();
//   }
// });

// readInterface.on("close", function () {
//   // need to check if there's a possibility that the file input didn't have an empty line
//   if (Object.keys(currentPassport).length) {
//     processPassport();
//   }
//   //   console.log("Passports", passports);
//   console.log(
//     `Out of ${totalPassports} there were ${validPassports} valid and ${invalidPassports} invalid ones.`
//   );
// });

// part two

const isNumber = (val) => !!Number.parseInt(val);
const isHeight = (val) => !!val.match(/^[0-9]+(cm|in)$/);
const isAppropriateHeight = (val) => {
  const unit = val.substring(val.length - 2);
  const measurement = parseInt(val.substring(0, val.length - 2));
  if (unit === "cm") {
    return isNumberInRange(measurement, 150, 193);
  } else if (unit === "in") {
    return isNumberInRange(measurement, 59, 76);
  }
};

const isNumberInRange = (val, lower, upper) => val >= lower && val <= upper;

const validations = {
  byr: (val) =>
    isNumber(val) && val.length === 4 && isNumberInRange(val, 1920, 2002),
  iyr: (val) =>
    isNumber(val) && val.length === 4 && isNumberInRange(val, 2010, 2020),
  eyr: (val) =>
    isNumber(val) && val.length === 4 && isNumberInRange(val, 2020, 2030),
  hgt: (val) => isHeight(val) && isAppropriateHeight(val),
  hcl: (val) => !!val.match(/^#([a-fA-F0-9]){6}$/),
  ecl: (val) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val),
  pid: (val) => !!val.match(/^([0-9]){9}$/),
  cid: (val) => true,
};

const isValidPassport = (passport) => {
  const passportKeys = Object.keys(passport).filter(
    (key) => !optionalFields.includes(key)
  );

  if (passportKeys.sort().join(",") !== fields.sort().join(",")) return false;

  return Object.entries(passport).every(([field, val]) =>
    validations[field](val)
  );
};

const processPassport = () => {
  // process currentPassport
  passports.push(currentPassport);
  // check if valid
  if (isValidPassport(currentPassport)) {
    validPassports++;
  } else {
    invalidPassports++;
  }
  totalPassports++;
  // set the currentPassport to nothing
  currentPassport = {};
};

readInterface.on("line", function (line) {
  if (line.length) {
    // parse line
    for (const field of line.split(" ")) {
      const [key, value] = field.split(":");
      currentPassport[key] = value;
    }
  } else {
    processPassport();
  }
});

readInterface.on("close", function () {
  // need to check if there's a possibility that the file input didn't have an empty line
  if (Object.keys(currentPassport).length) {
    processPassport();
  }
  //   console.log("Passports", passports);
  console.log(
    `Out of ${totalPassports} there were ${validPassports} valid and ${invalidPassports} invalid ones.`
  );
});
